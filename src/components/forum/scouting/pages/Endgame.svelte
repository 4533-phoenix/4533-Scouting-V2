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
  <div class="grid">
    <label for="finalChargePosition">Charge Position:</label>

    <div class="radio">
      <input
        type="radio"
        name="finalChargePosition"
        value="Parked"
        id="parked"
        required
      />
      <label for="parked">Parked</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="finalChargePosition"
        value="Docked"
        id="docked"
        required
      />
      <label for="docked">Docked</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="finalChargePosition"
        value="Engaged"
        id="engaged"
        required
      />
      <label for="engaged">Engaged</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="finalChargePosition"
        value="Attempted"
        id="attempted"
        required
      />
      <label for="attempted">Attempted</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="finalChargePosition"
        value="None"
        id="none"
        required
        checked
      />
      <label for="none">None</label>
    </div>
  </div>

  <hr />

  <div class="grid">
    <input
      name="allianceDocked"
      placeholder="Alliance docked"
      type="tel"
      pattern="[0-3]"
      novalidate
      required
    />
    <input
      name="linksScored"
      placeholder="Links Scored"
      type="tel"
      pattern="[0-9]"
      novalidate
      required
    />
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
