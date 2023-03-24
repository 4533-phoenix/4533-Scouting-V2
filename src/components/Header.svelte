<script>
  import ToggleTheme from "./ToggleTheme.svelte";
</script>

<nav class="container-fluid">
  <ul>
    <li>
      <a href="/" aria-label="Go Home" class="primary"><img src="/favicon.png" alt="Logo" /> Scouting App</a>
    </li>
  </ul>
  <ul>
    <li><a href="/about" class="secondary">About</a></li>
    <li><a href="/contact" class="secondary">Contact</a></li>
    <li><a href="/viewer" class="secondary">Viewer</a></li>
    <li><ToggleTheme /></li>
  </ul>
</nav>
<hr />
