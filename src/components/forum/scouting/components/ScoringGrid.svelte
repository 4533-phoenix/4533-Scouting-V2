<script>
  import { createField } from "felte";
  import { onMount } from "svelte";

  export let name;
  export let startValue;

  let value = startValue ? startValue.split(",").map((/** @type {string} */ v) => parseInt(v)) : [];

  const { field, onInput } = createField(name);
  const imageUrl = "%sveltekit.assets%/images/scoring.png";

  /**
   * @type {HTMLCanvasElement | null}
   */
  let canvasElement = null;
  let gridColumns = 9;
  let gridRows = 4;

  /**
   * @param {number} gridX
   * @param {number} gridY
   */
  function gridPosToIndex(gridX, gridY) {
    return gridY * gridColumns + gridX;
  }

  /**
   * @param {number} gridX
   * @param {number} gridY
   */
  function isEnabled(gridX, gridY) {
    return value.includes(gridPosToIndex(gridX, gridY));
  }

  /**
   * @param {number} gridX
   * @param {number} gridY
   * @param {boolean} enabled
   */
  function setGrid(gridX, gridY, enabled) {
    const index = gridPosToIndex(gridX, gridY);
    if (enabled) {
      if (!value.includes(index)) {
        value.push(index);
      }
    } else {
      value = value.filter((/** @type {number} */ i) => i !== index);
    }
  }

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
        // request the next animation frame
        requestAnimationFrame(animate);

        // clear the canvas
        if (!canvasElement || !canvas) return;
        canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);

        // draw the image to the canvas
        if (!canvasElement) return;
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
      }

      // add the click event listener
      canvasElement.addEventListener("click", (event) => {
        // check for canvas element
        if (!canvasElement) return;

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
