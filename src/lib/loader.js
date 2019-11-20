const SCRIPT = 'script';

export const loadJs = (path, callback) => {
    const js = document.createElement(SCRIPT);
    const fjs = document.getElementsByTagName(SCRIPT)[0];
    js.src = path;
    js.onload = callback;
    fjs.parentNode.insertBefore(js, fjs);
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