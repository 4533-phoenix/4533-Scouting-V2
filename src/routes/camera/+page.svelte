<script>
  import imagekit from "imagekit-javascript";
  import { onMount, onDestroy } from "svelte";

  import Camera from "svelte-material-icons/Camera.svelte";
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
   * @type {HTMLDivElement | null}
   */
  let teamTagsElement = null;

  /**
   * @type {HTMLDivElement | null}
   */
  let photoTypesElement = null;

  let captureFunc = () => {};
  let uploadFunc = () => {};
  let userCamFunc = () => {};

  let teams = [4533, 342];
  let captured = false;
  let uploading = false;
  let uploadingProgress = 0;

  const constraints = {
    video: {
      facingMode: "environment",
      focusMode: {ideal: "continuous"}
    },
    audio: false,
  };

  onMount(async () => {
    if (!canvasElement || !videoElement || !teamTagsElement) return;

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
      // scale so the longest side is 640px
      const scale = Math.max(
        videoElement.videoWidth / 640,
        videoElement.videoHeight / 640
      );

      // set the canvas size to the video size scaled
      canvasElement.width = videoElement.videoWidth / scale;
      canvasElement.height = videoElement.videoHeight / scale;

      // draw the video at that frame
      canvas.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
      captured = true;
    };

    function getTeams() {
      if (!teamTagsElement) return;

      // return all childrens values in an array if it is an input and has a value
      return Array.from(teamTagsElement.children)
        .filter((child) => child instanceof HTMLInputElement && child.value)
        // @ts-ignore
        .map((child) => child.value);
    }

    function getCheckboxes() {
      if (!photoTypesElement) return;

      // return array of all checked checkboxes name children of photoTypesElement
      return Array.from(photoTypesElement.children)
        .filter((child) => child instanceof HTMLDivElement)
        .map((child) => Array.from(child.children))
        .flat()
        .filter((child) => child instanceof HTMLInputElement && child.checked)
        // @ts-ignore
        .map((child) => child.name);
    }

    uploadFunc = () => {
      if (!canvasElement || !captured || uploading) return;

      uploadingProgress = 0;
      uploading = true;
      const file = canvasElement.toBlob(
        (file) => {
          if (!file) {
            uploading = false;
            alert("Error uploading image. Please try again.");
            return;
          }

          const teamNumbers = getTeams() || [];
          const photoTypes = getCheckboxes() || [];
          const dateString = new Date().toISOString().split("T")[0];
          const timeString = new Date()
            .toISOString()
            .split("T")[1]
            .split(".")[0];

          const customXHR = new XMLHttpRequest();
          customXHR.upload.addEventListener("progress", function (e) {
            if (e.loaded <= file.size) {
              uploadingProgress = Math.round((e.loaded / file.size) * 100);
            }
          });

          imagekitInstance
            .upload({
              file: file,
              fileName: `${(teamNumbers || [0]).join("-")}-${dateString}-${timeString}.png`,
              folder: "scouting",
              tags: [...teamNumbers, ...photoTypes, dateString],
              xhr: customXHR,
            })
            .then(() => {
              uploading = false;
              captured = false;

              if (!canvas || !canvasElement) return;
              canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);

              // clear all team tags except the first one
              if (!teamTagsElement) return;
              const firstChild = teamTagsElement.children[0];
              // @ts-ignore
              firstChild.value = "";
              if (firstChild) {
                teamTagsElement.innerHTML = "";
                teamTagsElement.appendChild(firstChild);
              }

              // uncheck all checkboxes
              if (!photoTypesElement) return;
              Array.from(photoTypesElement.children)
                .filter((child) => child instanceof HTMLDivElement)
                .map((child) => Array.from(child.children))
                .flat()
                .filter((child) => child instanceof HTMLInputElement)
                // @ts-ignore
                .forEach((child) => (child.checked = false));
            })
            .catch(() => {
              uploading = false;
              alert("Error uploading image. Please try again.");
            });
        },
        "image/png",
        1
      );
    };

    userCamFunc = () => {
      // open native camera app facing the environment
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.capture = "environment";
      input.style.display = "none";
      document.body.appendChild(input);
      input.click();
      
      // save the image to the canvas
      input.addEventListener("change", (e) => {
        // @ts-ignore
        if (!e.target || !e.target.files || !e.target.files[0]) return;
        // @ts-ignore
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          if (!e.target || !e.target.result) return;
          const img = new Image();
          img.onload = () => {
            if (!canvas || !canvasElement) return;
            // scale down image so long side is 640px
            const scale = Math.min(640 / img.width, 640 / img.height);
            canvasElement.width = img.width * scale;
            canvasElement.height = img.height * scale;
            canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvas.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
            captured = true;
          };
          // @ts-ignore
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
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
      videoElement.width = videoElement.videoWidth;
      videoElement.height = videoElement.videoHeight;
      videoElement.play();
    });

    /**
     * @param {HTMLInputElement} element
     */
    function teamChange(element) {
      if (!element) return;
      const value = element.value;
      if (!value) {
        element.remove();
      } else {
        if (!teamTagsElement || element.nextElementSibling) return;

        const newNode = element.cloneNode(true);
        const newElement = /** @type {HTMLInputElement} */ (newNode);
        newElement.oninput = () => teamChange(newElement);
        newElement.value = "";
        teamTagsElement.appendChild(newElement);
      }
    }

    const teamTagElement = document.createElement("input");
    teamTagElement.placeholder = "Team Number";
    teamTagElement.type = "tel";
    teamTagElement.pattern = "[0-9]*";
    teamTagElement.onchange = () => teamChange(teamTagElement);
    teamTagElement.oninput = () => teamChange(teamTagElement);
    teamTagsElement.appendChild(teamTagElement);
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
    <video
      id="video"
      width="100%"
      muted
      playsinline
      autoplay
      bind:this={videoElement}
    >
      <track kind="captions" />
    </video>
  </div>

  <br />

  <div class="grid">
    {#if uploading}
      <button disabled><Camera /></button>
      <button disabled><CameraIris /></button>
      <button disabled aria-busy="true" />
    {:else}
      <button on:click={userCamFunc}><Camera /></button>
      <button on:click={captureFunc}><CameraIris /></button>
      <button on:click={uploadFunc}><Upload /></button>
    {/if}
  </div>

  <!-- for team in team add one more that is blank that gets added and deleted -->
  <!-- loop for one more than the len of teams -->
  <!-- if teams.length > 0 then teams else [0] -->
  <div bind:this={teamTagsElement}></div>
  <div class="grid" bind:this={photoTypesElement}>
    <div>
      <input type="checkbox" name="pit" value="Pit" />
      <label for="pit">Pit</label>
    </div>

    <div>
      <input type="checkbox" name="robot" value="Robot" />
      <label for="robot">Robot</label>
    </div>

    <div>
      <input type="checkbox" name="team" value="Team" />
      <label for="team">Team</label>
    </div>

    <div>
      <input type="checkbox" name="match" value="Match" />
      <label for="match">Match</label>
    </div>
  </div>

  <br />

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
