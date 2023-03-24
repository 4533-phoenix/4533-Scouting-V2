<script>
  import { page } from "$app/stores";
</script>

<h1>{$page.status}</h1>

{#if $page.error}
  <p>{$page.error.message}</p>
{:else}
    <p>Something went wrong</p>
{/if}
