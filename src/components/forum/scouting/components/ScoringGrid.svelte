<script>
// @ts-nocheck

  import { onMount } from "svelte";

  export let inputElement = null;
  const imageUrl = "/images/scoring.png";

  onMount(() => {
    console.log(inputElement);

    if (!inputElement) return;
  });
</script>

<!-- render image -->
<img src={imageUrl} alt="Scoring Grid" />

<style>
  img {
    position: relative;
    width: 50%;
    height: auto;
    border-radius: 5px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>

<br />