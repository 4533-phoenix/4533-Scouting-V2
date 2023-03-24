<script>
  // @ts-nocheck
  import { createField } from "felte";
  import { onMount } from "svelte";

  export let flipped = false;
  export let name;

  const { field, onInput, onBlur } = createField(name);
  const imageUrl = "/images/field.png";

  let canvasElement = null;
  let value = [0, 0];

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
        // clear the canvas
        canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);
        // draw the image to the canvas rotate it 180 degrees if flipped
        canvas.save();
        if (flipped) {
          // rotate 180 degrees
          canvas.translate(canvasElement.width, canvasElement.height);
          canvas.rotate(Math.PI);
        }
        canvas.drawImage(image, 0, 0);
        canvas.restore();

        // draw the circle
        canvas.beginPath();
        canvas.arc(value[0], value[1], 5, 0, 2 * Math.PI);
        canvas.fillStyle = "red";
        canvas.fill();

        // request the next animation frame
        requestAnimationFrame(animate);
      }

      // add the click event listener
      canvasElement.addEventListener("click", (event) => {
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
</script>

<div use:field>
  <canvas bind:this={canvasElement} on:blur={onBlur} class="fieldPositionCanvas" />
  <button on:click={() => (flipped = !flipped)} class="fieldPositionFlipButton">Flip</button>
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
    left: 50%;
    transform: translateX(-50%);
  }
</style>
