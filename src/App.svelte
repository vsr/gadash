<script>
  export let appVersion = "";
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
</script>

<style>

</style>

<div class="container mx-auto">
  <Header />
  <div class="min-h-screen-3/4">Content here</div>
  <Footer {appVersion} />
</div>
