<script>
  import WhiteBalanceSunny from "svelte-material-icons/WhiteBalanceSunny.svelte";
  import MoonWainingCrescent from "svelte-material-icons/MoonWaningCrescent.svelte";
  import { onMount } from "svelte";
  const STORAGE_KEY = "theme";
  const DARK_PREFERENCE = "(prefers-color-scheme: dark)";
  const THEMES = {
    DARK: "dark",
    LIGHT: "light",
  };
  /**
   * @type {string | null}
   */
  let currentTheme = null;
  const prefersDarkThemes = () => window.matchMedia(DARK_PREFERENCE).matches;
  const toggleTheme = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(
        STORAGE_KEY,
        prefersDarkThemes() ? THEMES.LIGHT : THEMES.DARK
      );
    }
    applyTheme();
  };
  const applyTheme = () => {
    const preferredTheme = prefersDarkThemes() ? THEMES.DARK : THEMES.LIGHT;
    currentTheme = localStorage.getItem(STORAGE_KEY) ?? preferredTheme;
    document.documentElement.setAttribute("data-theme", currentTheme);
  };
  onMount(() => {
    applyTheme();
    window.matchMedia(DARK_PREFERENCE).addEventListener("change", applyTheme);
  });
</script>

<button on:click={toggleTheme}>
  <div>
    {#if currentTheme !== THEMES.DARK}
      <MoonWainingCrescent width="100%" />
    {:else}
      <WhiteBalanceSunny width="100%" />
    {/if}
  </div>
</button>

<style>
  button {
    display: flex;
  }
  button > div {
    transition: transform 0.2s ease-in-out;
  }
  button:hover > div,
  button:focus > div {
    transform: scale(1.25);
  }
</style>
