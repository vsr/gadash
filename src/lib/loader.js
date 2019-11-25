const SCRIPT = 'script';

const loadedScripts = [];

export const loadJs = (path, callback) => {
    if (loadedScripts.indexOf(path) < 0) {
        const js = document.createElement(SCRIPT);
        const fjs = document.getElementsByTagName(SCRIPT)[0];
        js.src = path;
        js.onload = callback;
        fjs.parentNode.insertBefore(js, fjs);
        loadedScripts.push(path);
    }
};

export const loadGoogleApi = (w, g) => {
    g = w.gapi || (w.gapi = {});
    g.analytics = {
        q: [],
        ready: function (cb) {
            this.q.push(cb);
        }
    };
    loadJs("https://apis.google.com/js/platform.js", () => {
        g.load("analytics")
    });
};