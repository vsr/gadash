import App from "./App.svelte";

const app = new App({
  target: document.querySelector('#app'),
  props: {
    appVersion: "__appVersion__",
    gaClientId: "__gaClientId__"
  }
});

export default app;