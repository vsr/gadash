<script>
  export let appVersion = "";
  export let gaClientId;
  import { onMount } from "svelte";

  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import { loadGoogleApi } from "./lib/loader";

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
        console.log(response);
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

    <h2>analytics dashboard</h2>
    <section id="auth-button" />

  </div>
  <Footer {appVersion} />
</div>
