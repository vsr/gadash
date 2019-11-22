<script>
  export let appVersion = "";
  export let gaClientId;
  import { onMount } from "svelte";

  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import Intro from "./components/Intro.svelte";
  import DashboardPage from "./components/DashboardPage.svelte";
  import { loadGoogleApi, loadJs } from "./lib/loader";

  let gapiLoaded = false;
  let gapiAuthenticated = false;
  let gapiUser = null;

  window.gapi = window.gapi || (window.gapi = {});

  onMount(() => {
    loadGoogleApi(window, gapi);

    gapi.analytics.ready(function() {
      gapi.analytics.auth.authorize({
        container: "auth-button",
        clientid: gaClientId
      });

      gapiLoaded = true;
      gapi.analytics.auth.on("success", function(response) {
        gapiAuthenticated = true;
        gapiUser = gapi.analytics.auth.getUserProfile();
      });
    });
  });

  const signOut = () => {
    gapi && gapi.analytics.auth.signOut();
    gapiAuthenticated = false;
  };
</script>

<div class="w-full min-h-screen flex flex-col">
  <Header {gapiAuthenticated} {gapiUser} on:logout={signOut} />
  <div class="min-h-screen-3/4 flex-1 container mx-auto p-2">

    <div class:hidden={gapiAuthenticated}>
      <Intro />
      <section class="mx-2 my-4" id="auth-button" />
    </div>
    {#if gapiUser}
      <DashboardPage />
    {/if}

  </div>
  <Footer {appVersion} />
</div>
<div class="hidden">
  <div class="DateRangeSelector">
    <div class="DateRangeSelector-item">
      <label>
        <input />
      </label>

    </div>
  </div>
  <div class="ViewSelector2">
    <div class="ViewSelector2-item">
      <label>
        <select>
          <option />
        </select>
      </label>
    </div>
  </div>
</div>
