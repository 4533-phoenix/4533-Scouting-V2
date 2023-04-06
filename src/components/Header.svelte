<script>
  import ToggleTheme from "./ToggleTheme.svelte";
</script>

<nav class="container-fluid">
  <ul>
    <li>
      <a href="/" aria-label="Go Home" class="primary"
        ><img src="/favicon.png" alt="Logo" /> Scouting App</a
      >
    </li>
  </ul>
  <ul>
    <li><a href="/about" class="secondary">About</a></li>
    <li><a href="/contact" class="secondary">Contact</a></li>
    <li><a href="/viewer" class="secondary">View</a></li>
    <li><a href="/camera" class="secondary">Cam</a></li>
    <li id="toggle-theme"><ToggleTheme /></li>
  </ul>
</nav>
<hr />

<style>
  #toggle-theme {
    min-width: 4rem;
  }
</style>