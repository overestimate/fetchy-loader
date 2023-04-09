# fetchy-loader
`fetch()`-based page loading for your websites. hacked together in like 2 hours at 3am. probably sucks balls, oh well.

## porque?
prevents re-paints of your website when navigating between pages.

## how 2 use?
first off, link it using `<script src="path/to/fetchy.js"></script>`. then, replace `href="link"` with `fetchy_loader.load(link, {}, true)`

## i need cookies n stuff
`fetchy_loader.load(url, init, navigate_anyways)`, and from `fetchy.js`:
 * url is the url you want to load.
 * init is the init object for fetch, used for setting headers/cookies/etc. 
 * if navigate_anyways is true, then we navigate to the location on failure.