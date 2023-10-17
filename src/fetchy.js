/* modified version of fetchy, to be merged into main. */

/* fetchy-loader (c) 2023- emily lawrence. licensed under MIT license */

let Fetchy = {

    debug: false, // do we call debugger on fatal errors?
    navigate_anyways: true,

    _new_url: "",

    _error: (...data) => {
        console.error('fetchy-loader: %cerror:%c',
            'color: red; font-weight: 700;', 'color: revert; font-weight: revert;', ...data);
        if (Fetchy.debug) { debugger; }
    },
    _warn: (...data) => {
        console.error('fetchy-loader: %cwarning:%c',
            'color: red; font-weight: 500;', 'color: revert; font-weight: revert;', ...data);
    },
    _info: (...data) => { console.info('fetchy-loader: %cinfo:%c', 'color: lightblue;', 'color: revert;', ...data); },
    _debug: (...data) => { console.debug('fetchy-loader: %debug:%c', 'color: green;', 'color: revert;', ...data); },

    _catch_fail_fn: (e) => {
        Fetchy._error(e);
    },
    _navigate_failed: (reason) => Fetchy._warn(reason),

    // TODO: reimplement load()
    
    // returns a div containing the content at the url provided.
    get_html: async (url, opt) => {
        let new_url = new URL(url, document.location)
        let res = await fetch(new_url, opt)
        let text_html = await res.text();
        let donor_element = document.createElement("div");
        donor_element.innerHTML = text_html;
        return donor_element;
    },

    doc_onload: (e) => {
        document.querySelectorAll("*[data-source-url]").forEach(async (v, k) => {
            let url = v.getAttribute("data-source-url");
            v.innerHTML = (await Fetchy.get_html(url)).innerHTML;
        })
    }
}

window.onload = (e) => {
    Fetchy.doc_onload(e);
}