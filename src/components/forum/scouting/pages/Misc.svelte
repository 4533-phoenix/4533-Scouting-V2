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

<h1>Misc</h1>

<form use:form bind:this={subformContainer}>
  <div class="grid">
    <label for="driverSkill">Driver Skill:</label>

    <div class="radio">
      <input
        type="radio"
        name="driverSkill"
        value="Not Effective"
        id="notEffective"
        required
      />
      <label for="notEffective">Not Effective</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="driverSkill"
        value="Average"
        id="average"
        required
      />
      <label for="average">Average</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="driverSkill"
        value="Very Effective"
        id="veryEffective"
        required
      />
      <label for="veryEffective">Very Effective</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="driverSkill"
        value="Not Observed"
        id="notObserved"
        required
        checked
      />
      <label for="notObserved">Not Observed</label>
    </div>
  </div>

  <hr />

  <div class="grid">
    <label for="defenceRating">Defence Rating:</label>

    <div class="radio">
      <input
        type="radio"
        name="defenceRating"
        value="Below Average"
        id="belowAverage"
        required
      />
      <label for="belowAverage">Below Average</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="defenceRating"
        value="Average"
        id="average"
        required
      />
      <label for="average">Average</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="defenceRating"
        value="Good"
        id="good"
        required
      />
      <label for="good">Good</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="defenceRating"
        value="Excellent"
        id="excellent"
        required
      />
      <label for="excellent">Excellent</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="defenceRating"
        value="No Defence"
        id="didNotPlayDefence"
        required
        checked
      />
      <label for="didNotPlayDefence">No Defence</label>
    </div>
  </div>

  <hr />

  <div>
    <label for="speedRating">Speed Rating:</label>
    <input type="range" min="1" max="5" id="speedRating" name="speedRating">
  </div>

  <hr />

  <div class="grid">
    <div>
      <input
        type="checkbox"
        name="immobilized"
        id="immobilized"
        value="Immobilized"
      />
      <label for="immobilized">Immobilized</label>
    </div>
    <div>
      <input type="checkbox" name="tippy" id="tippy" value="Tippy" />
      <label for="tippy">Tippy</label>
    </div>
    <div>
      <input
        type="checkbox"
        name="droppedCones"
        id="droppedCones"
        value="Dropped Cones"
      />
      <label for="droppedCones">Dropped Cones</label>
    </div>
    <div>
      <input
        type="checkbox"
        name="goodAlliance"
        id="goodAlliance"
        value="Good Alliance"
      />
      <label for="goodAlliance">Good Alliance</label>
    </div>
  </div>

  <hr />

  <input
    name="comments"
    placeholder="Comments"
    type="text"
    maxlength="255"
  />

  <br />

  <div class="grid">
    <button
      type="button"
      class="contrast outline"
      on:click={() => onBack($data)}>Previous page</button
    >
    <button type="submit">Submit</button>
  </div>
</form>
