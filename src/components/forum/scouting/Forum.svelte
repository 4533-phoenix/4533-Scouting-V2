<script>
  // @ts-nocheck

  // We import our page components (similar to the one above).
  import Prematch from "./pages/Prematch.svelte";
  import Autonomous from "./pages/Autonomous.svelte";
  import Teleop from "./pages/Teleop.svelte";
  import Endgame from "./pages/Endgame.svelte";
  import Misc from "./pages/Misc.svelte";

  const pages = [Prematch, Autonomous, Teleop, Endgame, Misc];

  // The current page of our form.
  let page = 0;

  // The state of all of our pages
  let pagesState = [];

  // Our handlers
  function onSubmit(values) {
    if (page === pages.length - 1) {
      // On our final page we POST our data somewhere
      pagesState[page] = values;

      return fetch("/api/addScoutingData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pagesState),
      }).then((response) => {
        if (response.ok) {
          // If we get a 200 response, we set our page to 0
          page = 0;
          pagesState = [];
        } else {
          // If we get a non-200 response, we display an error message
          alert("Error!");
        }
      });
    } else {
      // If we're not on the last page, store our data and increase a step
      pagesState[page] = values;
      pagesState = pagesState; // Triggering update
      page += 1;
    }
  }

  function onBack(values) {
    if (page === 0) return;
    console.log(values);
    pagesState[page] = values;
    pagesState = pagesState; // Triggering update
    page -= 1;
  }
</script>

<!-- We display the current step here -->
<svelte:component
  this={pages[page]}
  {onSubmit}
  {onBack}
  initialValues={pagesState[page]}
/>
