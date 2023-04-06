<script>
  import imagekit from "imagekit-javascript";
  import { onMount, onDestroy } from "svelte";

  import CameraIris from "svelte-material-icons/CameraIris.svelte";
  import Upload from "svelte-material-icons/Upload.svelte";

  /**
   * @type {HTMLCanvasElement | null}
   */
  let canvasElement = null;

  /**
   * @type {HTMLVideoElement | null}
   */
  let videoElement = null;

  /**
   * @type {HTMLInputElement | null}
   */
  let teamNumberElement = null;

  let captureFunc = () => {};
  let uploadFunc = () => {};

  let captured = false;
  let uploading = false;
  let uploadingProgress = 0;

  const constraints = {
    video: {
      facingMode: "environment",
    },
    audio: false
  };

  onMount(async () => {
    if (!canvasElement || !videoElement) return;

    const imagekitInstance = new imagekit({
      publicKey: "public_U4CHFaY7n92f0a73kpdWBaxgl60=",
      urlEndpoint: "https://ik.imagekit.io/bski6aprc",
      authenticationEndpoint: `${window.location.href.substring(
        0,
        window.location.href.lastIndexOf("/")
      )}/api/imagekitAuth`,
    });

    const canvas = canvasElement.getContext("2d");

    captureFunc = () => {
      if (!canvas || !videoElement || !canvasElement) return;
      const width = canvasElement.width;
      const height = canvasElement.height;

      // draw the video at that frame
      canvas.drawImage(videoElement, 0, 0, width, height);
      captured = true;
    };

    uploadFunc = () => {
      if (!canvasElement || !captured || uploading)
        return;

      uploadingProgress = 0;
      uploading = true;
      const file = canvasElement.toBlob((file) => {
        if (!file) {
          uploading = false;
          alert("Error uploading image. Please try again.");
          return;
        };

        if (!teamNumberElement) return;

        const teamNumber = teamNumberElement.value;
        const dateString = new Date().toISOString().split("T")[0];
        const timeString = new Date().toISOString().split("T")[1].split(".")[0];

        const customXHR = new XMLHttpRequest();
        customXHR.upload.addEventListener("progress", function (e) {
          if (e.loaded <= file.size) {
            uploadingProgress = Math.round((e.loaded / file.size) * 100);
          }
        });

        imagekitInstance
          .upload({
            file: file,
            fileName: `${teamNumber}-${dateString}-${timeString}.png`,
            folder: "scouting",
            tags: [teamNumber, dateString],
            xhr: customXHR,
          })
          .then(() => {
            uploading = false;
            captured = false;

            if (!canvas || !canvasElement) return;
            canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);
          })
          .catch(() => {
            uploading = false;
            alert("Error uploading image. Please try again.");
          });
      }, "image/png");
    };

    videoElement.setAttribute("playsinline", "");
    videoElement.setAttribute("muted", "");
    videoElement.setAttribute("autoplay", "");

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (!videoElement) return;
        videoElement.srcObject = stream;
      })
      .catch((err) => {
        console.error(err);
        alert("Error getting camera. Please try again.");
      });

      videoElement.addEventListener("loadedmetadata", () => {
        if (!canvasElement || !videoElement) return;
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        videoElement.width = videoElement.videoWidth;
        videoElement.height = videoElement.videoHeight;
        videoElement.play();
      });
  });

  onDestroy(() => {
    if (!videoElement || !videoElement.srcObject) return;
    // @ts-ignore
    videoElement.srcObject.getTracks().forEach((track) => track.stop());
  });
</script>

<div id="camera-container">
  <div class="grid">
    <canvas id="canvas" bind:this={canvasElement} />
    <video id="video" width="100%" muted playsinline autoplay bind:this={videoElement}>
      <track kind="captions" />
    </video>
  </div>

  <br />

  <div class="grid">
    <input
      placeholder="Team Number"
      type="tel"
      pattern="[0-9]*"
      bind:this={teamNumberElement}
    />

    {#if uploading}
      <button disabled><CameraIris /></button>
      <button disabled aria-busy="true" />
    {:else}
      <button on:click={captureFunc}><CameraIris /></button>
      <button on:click={uploadFunc}><Upload /></button>
    {/if}
  </div>

  {#if uploading}
    <progress value={uploadingProgress} max="100" />
  {/if}
</div>

<style>
  #camera-container canvas#canvas {
    width: 100%;
    height: 100%;
  }

  #camera-container video#video {
    width: 100%;
    height: 100%;
  }
</style>
