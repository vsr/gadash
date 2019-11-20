<script>
  export let appVersion = "";
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
</script>

<div class="w-full min-h-screen flex flex-col">
  <Header />
  <div class="min-h-screen-3/4 flex-1 container mx-auto p-2">Content here</div>
  <Footer {appVersion} />
</div>
