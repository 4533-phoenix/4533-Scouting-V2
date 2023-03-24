<script>
// @ts-nocheck

  import { onMount } from "svelte";

  export let name = null;
  const imageUrl = "/images/scoring.png";
  let inputElement = null;
  let value = "[]";

  function onclick() {
    value = "[1]";
  }
</script>

<input
  type="text"
  bind:value
  name={name}
  bind:this={inputElement}
  required
  readonly
  class="input"
/>

<img src={imageUrl} alt="Scoring Grid" on:click={onclick}/>

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