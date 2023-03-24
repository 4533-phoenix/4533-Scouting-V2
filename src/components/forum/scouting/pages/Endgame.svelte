<script>
  // @ts-nocheck

  import { createForm } from "felte";
  import { onMount } from "svelte";

  export let initialValues;
  export let onSubmit;
  export let onBack;

  let subformContainer = null;

  onMount(() => {
    if (!subformContainer || !initialValues) return;

    const inputs = subformContainer.querySelectorAll("input");

    inputs.forEach((input) => {
      input.value = initialValues[input.name];
    });

    const radios = subformContainer.querySelectorAll("input[type=radio]");
    radios.forEach((radio) => {
      if (radio.value === initialValues[radio.name]) {
        radio.checked = true;
      }
    });
  });

  const { form, data } = createForm({ onSubmit });
</script>

<h1>Endgame</h1>

<form use:form bind:this={subformContainer}>
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
      pattern="[0-9]*"
      novalidate
      required
    />
    <input
      name="linksScored"
      placeholder="Links Scored"
      type="tel"
      pattern="[0-9]*"
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
