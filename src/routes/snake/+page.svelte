<!-- snake game -->
<script>
  import { onMount } from "svelte";

  /**
   * @type {HTMLCanvasElement | null}
   */
  let canvasElement = null;

  onMount(() => {
    if (!canvasElement) return;

    const canvas = canvasElement.getContext("2d");

    function resize() {
      if (!canvasElement) return;

      canvasElement.width = canvasElement.clientWidth;
      canvasElement.height = canvasElement.clientHeight;
    }
    resize();
    document.addEventListener("resize", resize);

    let snake = [
      { x: 150, y: 150 },
      { x: 140, y: 150 },
      { x: 130, y: 150 },
      { x: 120, y: 150 },
      { x: 110, y: 150 },
    ];

    let apple = { x: 200, y: 200 };

    let dx = 10;
    let dy = 0;

    let score = 0;

    function animate() {
      requestAnimationFrame(animate);

      if (!canvasElement || !canvas) return;
      canvas.fillStyle = "lightgrey";
      canvas.fillRect(0, 0, canvasElement.width, canvasElement.height);

      snake.forEach(drawSnakePart);

      drawApple();
      drawScore();
    }
    requestAnimationFrame(animate);
    setInterval(moveSnake, 100);

    /**
     * @param {{ x: number; y: number; }} snakePart
     */
    function drawSnakePart(snakePart) {
      if (!canvasElement || !canvas) return;

      canvas.fillStyle = "lightgreen";
      canvas.strokeStyle = "darkgreen";

      canvas.fillRect(snakePart.x, snakePart.y, 10, 10);
      canvas.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    function drawApple() {
      if (!canvasElement || !canvas) return;

      canvas.fillStyle = "red";
      canvas.strokeStyle = "darkred";

      canvas.fillRect(apple.x, apple.y, 10, 10);
      canvas.strokeRect(apple.x, apple.y, 10, 10);
    }

    function drawScore() {
      if (!canvasElement || !canvas) return;

      canvas.fillStyle = "black";
      canvas.strokeStyle = "black";
      canvas.font = "20px Arial";
      canvas.fillText("Score: " + score, 10, 20);
    }

    function moveSnake() {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      snake.unshift(head);

      const didEatApple = snake[0].x === apple.x && snake[0].y === apple.y;
      if (didEatApple) {
        score += 10;
        createApple();
      } else {
        snake.pop();
      }

      if (!canvasElement) return;
      const hitLeftWall = snake[0].x < 0;
      const hitRightWall = snake[0].x > canvasElement.width - 10;
      const hitTopWall = snake[0].y < 0;
      const hitBottomWall = snake[0].y > canvasElement.height - 10;

      for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
          gameOver();
        }
      }

      if (hitLeftWall || hitRightWall || hitTopWall || hitBottomWall) {
        gameOver();
      }
    }

    function createApple() {
      apple.x = Math.floor(Math.random() * 30) * 10;
      apple.y = Math.floor(Math.random() * 30) * 10;
    }

    /**
     * @param {{ keyCode: any; }} event
     */
    function changeDirectionKey(event) {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;

      const keyPressed = event.keyCode;
      const goingUp = dy === -10;
      const goingDown = dy === 10;
      const goingRight = dx === 10;
      const goingLeft = dx === -10;

      if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
      }

      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
      }

      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
      }

      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
      }
    }

    function gameOver() {
      alert(`Game Over! Your score is ${score}`);

      snake = [
        { x: 150, y: 150 },
        { x: 140, y: 150 },
        { x: 130, y: 150 },
        { x: 120, y: 150 },
        { x: 110, y: 150 },
      ];

      score = 0;
      dx = 10;
      dy = 0;

      createApple();
    }

    document.addEventListener("keydown", changeDirectionKey);
  });
</script>

<div id="snake-container">
  <canvas bind:this={canvasElement} />
</div>

<style>
  #snake-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #snake-container canvas {
    border: 1px solid #000000;
    width: 500px;
    height: 500px;
  }
</style>
