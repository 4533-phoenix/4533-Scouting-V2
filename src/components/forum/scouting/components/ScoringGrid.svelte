<script>
  // @ts-nocheck
  import { createField } from "felte";
  import { onMount } from "svelte";

  export let name;
  export let startValue;

  let value;
  if (startValue) {
    value = startValue.split(",").map((v) => parseInt(v));
  } else {
    value = [];
  }

  const { field, onInput } = createField(name);
  const imageUrl = "/images/scoring.png";

  let canvasElement = null;
  let gridColumns = 9;
  let gridRows = 4;

  function gridPosToIndex(gridX, gridY) {
    return gridY * gridColumns + gridX;
  }

  function isEnabled(gridX, gridY) {
    return value.includes(gridPosToIndex(gridX, gridY));
  }

  function setGrid(gridX, gridY, enabled) {
    const index = gridPosToIndex(gridX, gridY);
    if (enabled) {
      if (!value.includes(index)) {
        value.push(index);
      }
    } else {
      value = value.filter((i) => i !== index);
    }
  }

  onMount(() => {
    if (!canvasElement) return;

    const canvas = canvasElement.getContext("2d");
    const image = new Image();
    image.addEventListener("load", () => {
      // set the canvas width and height to the image width and height
      canvasElement.width = image.width;
      canvasElement.height = image.height;
      // set the canvas sie to the image size
      resize();

      // get grid vars
      const gridWidth = canvasElement.width / gridColumns;
      const gridHeight = canvasElement.height / gridRows;

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
        if (!canvasElement) return;
        // clear the canvas
        canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);
        // draw the image to the canvas
        canvas.drawImage(image, 0, 0);

        // draw the grid
        for (let x = 0; x < gridColumns; x++) {
          for (let y = 0; y < gridRows; y++) {
            if (isEnabled(x, y)) {
              canvas.fillStyle = "rgba(175, 0, 0, 0.5)";
              canvas.fillRect(
                x * gridWidth,
                y * gridHeight,
                gridWidth,
                gridHeight
              );
            }
          }
        }

        // request the next animation frame
        requestAnimationFrame(animate);
      }

      // add the click event listener
      canvasElement.addEventListener("click", (event) => {
        // make the grid in canvas coordinates, not screen coordinates
        const rect = canvasElement.getBoundingClientRect();
        const windowX = event.clientX - rect.left;
        const windowY = event.clientY - rect.top;

        // get the canvas coordinates
        const canvasX =
          windowX * (canvasElement.width / canvasElement.clientWidth);
        const canvasY =
          windowY * (canvasElement.height / canvasElement.clientHeight);

        // get the grid coordinates
        const gridX = Math.floor(canvasX / gridWidth);
        const gridY = Math.floor(canvasY / gridHeight);

        // toggle the grid
        setGrid(gridX, gridY, !isEnabled(gridX, gridY));

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
  <canvas class="scoringGridCanvas" bind:this={canvasElement} />
</div>

<br />

<style>
  .scoringGridCanvas {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
