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
  <ScoringGrid name="autoScoringGrid" startValue={initialValues ? initialValues["autoScoringGrid"] : null} />

  <hr />

  <div class="grid">
    <input
      name="gamePiecesAttempted"
      placeholder="Game pieces attempted"
      type="tel"
      pattern="[0-9]*"
      novalidate
      required
    />
  </div>

  <hr />

  <div>
    <input
      name="mobility"
      type="checkbox"
      id="mobility"
    />
    <label for="mobility">Mobility</label>
  </div>

  <hr />

  <div class="grid">
    <label for="autoChargePosition">Charge Position:</label>

    <div class="radio">
      <input
        type="radio"
        name="autoChargePosition"
        value="Docked"
        id="docked"
        required
      />
      <label for="docked">Docked</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="autoChargePosition"
        value="Engaged"
        id="engaged"
        required
      />
      <label for="engaged">Engaged</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="autoChargePosition"
        value="Attempted"
        id="attempted"
        required
      />
      <label for="attempted">Attempted</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="autoChargePosition"
        value="None"
        id="none"
        required
        checked
      />
      <label for="none">None</label>
    </div>
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
