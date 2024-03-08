<script>
  // @ts-nocheck

  import { createForm } from "felte";
  import { onMount } from "svelte";

  export let initialValues;
  export let onSubmit;
  export let onBack;

  onMount(() => {
    if (!initialValues) return;
    data.set(initialValues);
  });

  const { form, data } = createForm({ onSubmit });
</script>

<h1>Endgame</h1>

<form use:form>
  <br />

	<div class="grid">
		<div>
			<input type="checkbox" name="trap" id="trap">
			<label for="trap">Trap</label>
		</div>
		<div>
			<input type="checkbox" name="climb" id="climb">
			<label for="climb">Climb</label>
		</div>
		<div>
			<input type="checkbox" name="melody" id="melody">
			<label for="melody">Melody</label>
		</div>
	</div>

  <br /><br />

  <div class="grid">
    <button
      type="button"
      class="contrast outline"
      on:click={() => onBack($data)}
    >
      Previous page
    </button>
    <button type="submit" class="outline">Next page</button>
  </div>
</form>
