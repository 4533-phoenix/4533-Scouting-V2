<script>
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";
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
