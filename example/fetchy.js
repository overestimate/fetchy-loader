/* fetchy-loader (c) 2023- emily lawrence. licensed under MIT license */

let fetchy_loader = {
    _debug: false, // do we call debugger on fatal errors?

    _error: (...data) => {
        console.error('fetchy-loader: %cerror:%c',
            'color: red; font-weight: 700;', 'color: revert; font-weight: revert;', ...data)
        if (fetchy_loader._debug) { debugger }
    },
    _warn: (...data) => {
        console.error('fetchy-loader: %cwarning:%c',
            'color: red; font-weight: 500;', 'color: revert; font-weight: revert;', ...data)
    },
    _info: (...data) => { console.info('fetchy-loader: %cinfo:%c', 'color: lightblue;', 'color: revert;', ...data) },
    _debug: (...data) => { console.debug('fetchy-loader: %debug:%c', 'color: green;', 'color: revert;', ...data) },

    /* url is the url you want to load.
    * init is the init object for fetch, used for setting headers/cookies/etc.
    * if navigate_anyways is true, then we navigate to the location on failure.
    */
    load: (url, init, navigate_anyways) => {
        let new_url = new URL(url, document.location); // we do this to allow relative urls
        fetch(new_url, init).then(response => {
            response.text().then((text) => { // text is a promise so we have to do this
                document.write(text); // load new page by writing html to document (ideally i'd load it and hotswap)
                window.history.pushState({"html": text, "pageTitle": document.title}, "", new_url); // push new url to history
            }, (reason) => fetchy_loader.navigate_failed(reason) ).catch((e) => { 
                if (navigate_anyways === true) { document.location = new_url } // nav if failed
                fetchy_loader._error(e)
            })
        }).catch((e => {
            if (navigate_anyways === true) { document.location = new_url } // nav if failed
            fetchy_loader._error(e)
        }))
    },

    navigate_failed: (reason) => fetchy_loader._warn(reason)
}