<script>
  // @ts-nocheck

  import { createForm } from "felte";
  import { onMount } from "svelte";
  import FieldPosition from "../components/FieldPosition.svelte";

  export let initialValues;
  export let onSubmit;

  onMount(() => {
    if (!initialValues) return;
    data.set(initialValues);
  });

  function autoUpper(event) {
    event.target.value = event.target.value.toUpperCase();
  }

  const { form, data } = createForm({ onSubmit });
</script>

<h1>Prematch</h1>

<form use:form>
  <FieldPosition
    name="startingPosition"
    startValue={initialValues ? initialValues["startingPosition"] : null}
  />

  <hr />

  <div class="grid">
    <input
      name="scouterInitials"
      placeholder="Scouter Initials"
      type="text"
      maxlength="2"
      required
      on:input={autoUpper}
      on:keypress={autoUpper}
    />
    <input
      name="matchNumber"
      placeholder="Match Number"
      type="tel"
      pattern="[0-9]*"
      novalidate
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
