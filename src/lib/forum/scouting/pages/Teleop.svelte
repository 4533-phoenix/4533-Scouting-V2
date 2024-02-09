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

<h1>Teleop</h1>

<form use:form>
  <div class="grid">
    <input
      name="teleopAmpNotes"
      placeholder="Amp notes"
      type="tel"
      pattern="[0-9]*"
      novalidate
      required
    />
		<input
      name="teleopSpeakerNotes"
      placeholder="Speaker notes"
      type="tel"
      pattern="[0-9]*"
      novalidate
      required
    />
		<input
      name="teleopAmpSpeakerNotes"
      placeholder="Amplified speaker notes"
      type="tel"
      pattern="[0-9]*"
      novalidate
      required
    />
  </div>

	<hr />

  <div class="grid">
    <div>
      <input name="teleopMelody" type="checkbox" id="teleopMelody" />
      <label for="teleopMelody">Melody</label>
    </div>
    <div>
      <input name="teleopEnsemble" type="checkbox" id="teleopEnsemble" />
      <label for="teleopEnsemble">Ensemble</label>
    </div>
		<div>
      <input name="teleopPark" type="checkbox" id="teleopPark" />
      <label for="teleopPark">Park</label>
    </div>
		<div>
      <input name="teleopOnstage" type="checkbox" id="teleopOnstage" />
      <label for="teleopOnstage">Onstage</label>
    </div>
		<div>
      <input name="teleopSpotlit" type="checkbox" id="teleopSpotlit" />
      <label for="teleopSpotlit">Spotlit</label>
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
