<script>
  // @ts-nocheck

  import { createForm } from "felte";
  import { onMount } from "svelte";

  export let initialValues;
  export let onSubmit;
  export let onBack;
  export let isSubmitting;

  let subformContainer = null;

  onMount(() => {
    if (!initialValues) return;
    data.set(initialValues);
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
    <input type="range" min="0" max="100" id="speedRating" name="speedRating" />
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
    <div>
      <input
        type="checkbox"
        name="isBroken"
        id="isBroken"
        value="Is Broken"
      />
      <label for="isBroken">Currently Broken</label>
    </div>
  </div>

  <hr />

  <input name="comments" placeholder="Comments" type="text" maxlength="255" />

  <hr />

  <div class="grid">
    <label for="robotRating">Robot Rating:</label>

    <div class="rating">
      <label>
        <input type="radio" name="robotRating" value="1" checked />
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="robotRating" value="2" />
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="robotRating" value="3" />
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="robotRating" value="4" />
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="robotRating" value="5" />
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
    </div>

    <label for="appRating">App Rating:</label>

    <div class="rating">
      <label>
        <input type="radio" name="appRating" value="1" checked />
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="appRating" value="2" />
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="appRating" value="3" />
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="appRating" value="4" />
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
      <label>
        <input type="radio" name="appRating" value="5" />
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
        <span class="icon">★</span>
      </label>
    </div>
  </div>

  <br /><br />

  <div class="grid">
    {#if isSubmitting}
    <button type="button" disabled>Previous page</button>
      <button type="button" aria-busy="true" disabled>Submitting...</button>
    {:else}
      <button type="button" on:click={() => onBack($data)}>Previous page</button>
      <button type="submit">Submit</button>
    {/if}
  </div>
</form>

<style>
  .rating {
    display: inline-block;
    position: relative;
    height: 50px;
    line-height: 50px;
    font-size: 50px;
  }

  .rating label {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    cursor: pointer;
  }

  .rating label:last-child {
    position: static;
  }

  .rating label:nth-child(1) {
    z-index: 5;
  }

  .rating label:nth-child(2) {
    z-index: 4;
  }

  .rating label:nth-child(3) {
    z-index: 3;
  }

  .rating label:nth-child(4) {
    z-index: 2;
  }

  .rating label:nth-child(5) {
    z-index: 1;
  }

  .rating label input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .rating label .icon {
    float: left;
    color: transparent;
  }

  .rating label:last-child .icon {
    transition: background-color var(--transition),
      border-color var(--transition), color var(--transition),
      box-shadow var(--transition);
    color: var(--color);
  }

  .rating:not(:hover) label input:checked ~ .icon,
  .rating:hover label:hover input ~ .icon {
    color: yellow;
  }

  .rating label input:focus:not(:checked) ~ .icon:last-child {
    /* lighter than black, medium grey */
    color: var(--color);
    transition: background-color var(--transition),
      border-color var(--transition), color var(--transition),
      box-shadow var(--transition);
    text-shadow: 0 0 5px yellow;
  }
</style>
