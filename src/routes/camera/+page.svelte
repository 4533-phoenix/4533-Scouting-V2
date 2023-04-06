<script>
  import ImageKit from "imagekit-javascript";
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

  onMount(() => {
    if (!canvasElement) return;

    const imagekit = new ImageKit({
      publicKey: "public_U4CHFaY7n92f0a73kpdWBaxgl60=",
      urlEndpoint: "https://ik.imagekit.io/bski6aprc",
      authenticationEndpoint: `${window.location.href.substring(
        0,
        window.location.href.lastIndexOf("/")
      )}/api/imagekitAuth`,
    });

    const canvas = canvasElement.getContext("2d");

    const constraints = {
      video: {
        facingMode: "environment",
      },
      audio: false,
      width: 640,
      height: 480
    };

    captureFunc = () => {
      if (!canvas || !videoElement) return;
      canvas.drawImage(videoElement, 0, 0, 640, 480);
      captured = true;
    };

    uploadFunc = async () => {
      if (!canvasElement || !teamNumberElement || !captured) return;
      const data = canvasElement.toDataURL("image/png");
      const file = await (await fetch(data)).blob();

      const teamNumber = teamNumberElement.value;
      const dateString = new Date().toISOString().split("T")[0];
      const timeString = new Date().toISOString().split("T")[1].split(".")[0];

      imagekit
        .upload({
          file: file,
          fileName: `${teamNumber}-${dateString}-${timeString}.png`,
          folder: "scouting",
          tags: [teamNumber, dateString],
        })
        .then(() => {
          captured = false;

          if (!canvas || !canvasElement) return;
          canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);
        })
        .catch(() => {
          alert("Error uploading image. Please try again.");
        });
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (!videoElement) return;
        videoElement.srcObject = stream;
      })
      .catch((e) => {
        console.log(e);
      });
  });

  onDestroy(() => {
    if (!videoElement) return;
    // @ts-ignore
    videoElement.srcObject.getTracks().forEach((track) => track.stop());
  });
</script>

<div id="camera-container">
  <div class="grid">
    <canvas id="canvas" width="640" height="480" bind:this={canvasElement} />
    <video id="video" width="100%" autoplay bind:this={videoElement}>
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
    <button on:click={captureFunc}><CameraIris /></button>
    <button on:click={uploadFunc}><Upload /></button>
  </div>
</div>

<style>
  #camera-container canvas#canvas {
    width: 100%;
  }
</style>
