<script>
  // @ts-nocheck

  // We import our page components (similar to the one above).
  import Prematch from "./pages/Prematch.svelte";
  import Autonomous from "./pages/Autonomous.svelte";
  import Teleop from "./pages/Teleop.svelte";
  import Endgame from "./pages/Endgame.svelte";
  import Misc from "./pages/Misc.svelte";

  const pages = [Prematch, Autonomous, Teleop, Endgame, Misc];

  // is submitting
  let isSubmitting = false;

  // the current page of our form.
  let page = 0;

  // the state of all of our pages
  let pagesState = [];

  // anti charlie
	// -- deals with spam
  let antiCharlie = false;

  // our handlers
  function onSubmit(values) {
    if (page === pages.length - 1) {
      // set submitting to true
      isSubmitting = true;
      // on our final page we POST our data somewhere
      pagesState[page] = values;
      if (antiCharlie) return;

      let finalPagesState = pagesState;
      finalPagesState.forEach((finalPageState, index) => {
        Object.keys(finalPageState).forEach((key) => {
          if (key === "speedRating") {
            finalPagesState[index][key] = finalPageState[key] / 20;
          }
        });
      });

      antiCharlie = true;
      return fetch("/api/addScoutingData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pagesState),
      }).then((response) => {
        if (response.ok) {
          // if we get a 200 response, we set our page to 0
          page = 0;
          pagesState = [];
        } else {
          // if we get a non-200 response, we display an error message
          alert("Error!");
        }
        antiCharlie = false;
        isSubmitting = false;
      });
    } else {
      // if we're not on the last page, store our data and increase a step
      pagesState[page] = values;
      pagesState = pagesState; // triggering update
      page += 1;
    }
  }

  function onBack(values) {
    if (page === 0) return;
    pagesState[page] = values;
    pagesState = pagesState; // triggering update
    page -= 1;
  }
</script>

<!-- We display the current step here -->

<svelte:component
  this={pages[page]}
  onSubmit={onSubmit}
  onBack={onBack}
  initialValues={pagesState[page]}
  {isSubmitting}
/>
