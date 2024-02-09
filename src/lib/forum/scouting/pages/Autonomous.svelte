<script>
  // @ts-nocheck

  import ScoringGrid from "../components/ScoringGrid.svelte";
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

<h1>Autonomous</h1>

<form use:form>
  <div class="grid">
    <input
      name="autoAmpNotes"
      placeholder="Amp notes"
      type="tel"
      pattern="[0-9]*"
      novalidate
      required
    />
		<input
      name="autoSpeakerNotes"
      placeholder="Speaker notes"
      type="tel"
      pattern="[0-9]*"
      novalidate
      required
    />
  </div>

  <hr />

  <div>
    <input
      name="autoLeave"
      type="checkbox"
      id="leave"
    />
    <label for="leave">Leave</label>
  </div>

  <br />

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
