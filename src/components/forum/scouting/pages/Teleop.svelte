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

<h1>Teleop</h1>

<form use:form bind:this={subformContainer}>
  <div class="grid">
    <div>
      <input
        name="smartPlacement"
        type="checkbox"
        id="smartPlacement"
      />
      <label for="smartPlacement">Smart placement</label>
    </div>

    <div>
      <input name="defended" type="checkbox" id="defended" />
      <label for="defended">Defended</label>
    </div>
  </div>

  <hr />

  <div class="grid">
    <label for="floorPickup">Floor Pickup:</label>

    <div class="radio">
      <input
        type="radio"
        name="floorPickup"
        value="Cones"
        id="cones"
        required
      />
      <label for="cones">Cones</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="floorPickup"
        value="Cubes"
        id="cubes"
        required
      />
      <label for="cubes">Cubes</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="floorPickup"
        value="Both"
        id="both"
        required
      />
      <label for="both">Both</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="floorPickup"
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
    <label for="substationUse">Substation Use:</label>

    <div class="radio">
      <input
        type="radio"
        name="substationUse"
        value="Single"
        id="single"
        required
      />
      <label for="single">Single</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="substationUse"
        value="Double"
        id="double"
        required
      />
      <label for="double">Double</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="substationUse"
        value="Both"
        id="both"
        required
      />
      <label for="both">Both</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="substationUse"
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
