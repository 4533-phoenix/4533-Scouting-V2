<script>
  // @ts-nocheck
  import { createField } from "felte";
  import { onMount } from "svelte";

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
      canvasElement.style.width = `${window.innerWidth / 2}px`;
      canvasElement.style.height = `${
        (image.height / image.width) * (window.innerWidth / 2)
      }px`;

      // animate function
      function animate() {
        // clear the canvas
        canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);
        // draw the image to the canvas rotate it 180 degrees
        canvas.save();
        canvas.translate(canvasElement.width, canvasElement.height);
        canvas.rotate(Math.PI);
        canvas.drawImage(image, 0, 0);
        canvas.restore();

        // draw the circle
        canvas.beginPath();
        canvas.arc(value[0], value[1], 10, 0, 2 * Math.PI);
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
    });
    image.src = imageUrl;
  });
</script>

<div use:field>
  <canvas bind:this={canvasElement} on:blur={onBlur} />
</div>

<br />

<style>
  canvas {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
