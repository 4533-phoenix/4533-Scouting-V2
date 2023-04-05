<script>
  // @ts-nocheck
  import { createField } from "felte";
  import { onMount } from "svelte";

  export let flipped = false;
  export let startValue;
  export let name;

  let value;
  if (startValue) {
    value = startValue.split(",").map((v) => parseInt(v));
  } else {
    value = null;
  }

  const { field, onInput } = createField(name);
  const imageUrl = "/images/field.png";

  let canvasElement = null;

  onMount(() => {
    if (!canvasElement) return;

    const canvas = canvasElement.getContext("2d");
    const image = new Image();
    image.addEventListener("load", () => {
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
        if (!canvasElement) return;
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
        const rect = canvasElement.getBoundingClientRect();
        const windowX = event.clientX - rect.left;
        const windowY = event.clientY - rect.top;

        // get the canvas coordinates
        let canvasX, canvasY;
        if (flipped) {
          canvasX =
            canvasElement.width -
            windowX * (canvasElement.width / canvasElement.clientWidth);
          canvasY =
            canvasElement.height -
            windowY * (canvasElement.height / canvasElement.clientHeight);
        } else {
          canvasX =
            windowX * (canvasElement.width / canvasElement.clientWidth);
          canvasY =
            windowY * (canvasElement.height / canvasElement.clientHeight);
        }

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
</script>

<div use:field>
  <canvas bind:this={canvasElement} class="fieldPositionCanvas" />
  <div
    on:click={() => (flipped = !flipped)}
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
