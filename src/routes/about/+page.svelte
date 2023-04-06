<script>
  let dontTouchLevel = 0;
  function dontTouch() {
    switch (dontTouchLevel) {
      case 0:
        alert("Hey, please don't touch that!");
        break;
      case 1:
        alert("Seriously, don't touch that!");
        break;
      case 2:
        alert("I'm warning you, don't touch that!");
        break;
      case 3:
        alert("I'm going to have to ask you to stop touching that.");
        break;
      case 4:
        alert("Last warning, don't touch that!");
        break;
      default:
        alert(":(");
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        break;
    }

    dontTouchLevel++;
  }
</script>

<h1>About</h1>
<p>Made by drakeerv for team Phoenix 4533.</p>

<div id="dont-touch" on:click={dontTouch} on:keydown={void 0} />

<style>
  #dont-touch {
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    background-color: var(--background-color);
    cursor: pointer;
  }
</style>
