<script>
  import Header from "$lib/Header.svelte";
  import Footer from "$lib/Footer.svelte";
  import "@picocss/pico/css/pico.min.css";
</script>

<svelte:head>
  <title>Scouting App</title>
</svelte:head>

<div class="app">
  <Header />

  <main class="container-fluid">
    <slot />
  </main>

  <Footer />
</div>
