<script>
  import { browser } from "$app/environment";
  import { createField } from "felte";
  import { onMount } from "svelte";

  export let flipped = isLocalFlipped();
  export let startValue;
  export let name;

  let value = startValue ? startValue.split(",").map((/** @type {string} */ v) => parseInt(v)) : null;

  const { field, onInput } = createField(name);
  const imageUrl = "%sveltekit.assets%/images/field.png";

  /**
   * @type {HTMLCanvasElement | null}
   */
  let canvasElement = null;

  onMount(() => {
    if (!canvasElement) return;

    const canvas = canvasElement.getContext("2d");
    const image = new Image();
    image.addEventListener("load", () => {
      if (!canvasElement) return;
      // set the canvas width and height to the image width and height
      canvasElement.width = image.width;
      canvasElement.height = image.height;
      // set the canvas sie to the image size
      // make width smaller by half if it is on a large screen
      resize();

      // resize function
      function resize() {
        if (!canvasElement) return;
        // set the canvas sie to the image size
        if (window.innerWidth > 1000) {
          canvasElement.style.width = "50%";
        } else {
          canvasElement.style.width = "100%";
        }
        canvasElement.style.height = "auto";
      }

      // animate function
      function animate() {
        // request the next animation frame
        requestAnimationFrame(animate);

        // clear the canvas
        if (!canvasElement || !canvas) return;
        canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);

        // draw the image to the canvas rotate it 180 degrees if flipped
        if (!canvasElement) return;
        canvas.save();
        if (flipped) {
          canvas.translate(canvasElement.width, canvasElement.height);
          canvas.rotate(Math.PI);
        }
        canvas.drawImage(image, 0, 0);
        canvas.restore();

        // draw the circle
        if (!value) return;
        canvas.beginPath();
        canvas.arc(value[0], value[1], 5, 0, 2 * Math.PI);
        canvas.fillStyle = "red";
        canvas.fill();
      }

      // add the click event listener
      canvasElement.addEventListener("click", (event) => {
        // check for canvas element
        if (!canvasElement) return;

        const rect = canvasElement.getBoundingClientRect();
        const windowX = event.clientX - rect.left;
        const windowY = event.clientY - rect.top;

        // get the canvas coordinates
        const canvasX =
          windowX * (canvasElement.width / canvasElement.clientWidth);
        const canvasY =
          windowY * (canvasElement.height / canvasElement.clientHeight);

        // set the value to canvas coordinates
        value = [canvasX, canvasY];

        // update the input
        onInput(value);
      });

      // start the animation
      animate();

      // resize handler
      window.addEventListener("resize", resize);
    });
    image.src = imageUrl;
  });

  // save to local storage if it is flipped
  function flipField() {
    // change the flipped value
    flipped = !flipped;

    // save to local storage
    if (flipped) {
      localStorage.setItem("fieldPositionFlipped", "true");
    } else {
      localStorage.removeItem("fieldPositionFlipped");
    }

    // flip the value
    if (value && canvasElement) {
      value = [canvasElement.width - value[0], canvasElement.height - value[1]];
    }
  }

  // load from local storage if it is flipped
  function isLocalFlipped() {
    if (browser) {
      return localStorage.getItem("fieldPositionFlipped") === "true";
    } else {
      return false;
    }
  }
</script>

<div use:field>
  <canvas bind:this={canvasElement} class="fieldPositionCanvas" />
  <div
    on:click={flipField}
    on:keydown={void 0}
    class="fieldPositionFlipButton"
  >
    Flip
  </div>
</div>

<style>
  .fieldPositionCanvas {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .fieldPositionFlipButton {
    position: relative;
    width: 5em;
    height: 1em;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    margin-bottom: 15px;
    user-select: none;
  }

  .fieldPositionFlipButton:hover {
    cursor: pointer;
  }
</style>
