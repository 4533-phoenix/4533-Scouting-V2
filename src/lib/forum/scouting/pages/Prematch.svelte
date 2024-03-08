<script>
  // @ts-nocheck

  import { createForm } from "felte";
  import { onMount } from "svelte";

  export let initialValues;
  export let onSubmit;

  let matchNumberInput;

  onMount(() => {
    if (!initialValues) return;
    data.set(initialValues);
  });

  function scouterInitialEvent(event) {
    event.target.value = event.target.value.toUpperCase();
    if (event.target.value.length === 3) {
      matchNumberInput.focus();
    }
  }

  const { form, data } = createForm({ onSubmit });
</script>

<h1>Prematch</h1>

<form use:form>
  <div class="grid">
    <input
      name="scouterInitials"
      placeholder="Scouter Initials"
      type="text"
      maxlength="3"
      minlength="3"
      required
      on:input={scouterInitialEvent}
      on:keypress={scouterInitialEvent}
    />
    <input
      name="matchNumber"
      placeholder="Match Number"
      type="tel"
      pattern="[0-9]*"
      novalidate
      bind:this={matchNumberInput}
      required
    />
    <input
      name="teamNumber"
      placeholder="Team Number"
      type="tel"
      pattern="[0-9]*"
      novalidate
      required
    />
  </div>

  <hr />

  <div class="grid">
    <label for="allianceColor">Alliance Color:</label>

    <div class="radio">
      <input type="radio" name="allianceColor" value="Red" id="red" required />
      <label for="red">Red</label>
    </div>
    <div class="radio">
      <input
        type="radio"
        name="allianceColor"
        value="Blue"
        id="blue"
        required
      />
      <label for="blue">Blue</label>
    </div>
  </div>

  <hr />

  <div class="grid">
    <label for="matchType">Match Type:</label>

    
    <div class="radio">
      <input type="radio" name="matchType" value="Prac" id="prac" required />
      <label for="qual">Practice</label>
    </div>
    <div class="radio">
      <input type="radio" name="matchType" value="Qual" id="qual" required />
      <label for="qual">Qualification</label>
    </div>
    <div class="radio">
      <input type="radio" name="matchType" value="Semi" id="semi" required />
      <label for="semi">Semi-Final</label>
    </div>
    <div class="radio">
      <input type="radio" name="matchType" value="Final" id="final" required />
      <label for="final">Final</label>
    </div>
  </div>

  <br />

  <div class="grid">
    <button type="submit" class="outline">Next page</button>
  </div>
</form>
