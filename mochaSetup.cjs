/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { JSDOM } = require("jsdom");

const jsdom = new JSDOM("<div id='root'></div>", {
    url: "http://localhost:3000/"
});


global.window = jsdom.window;
global.document = jsdom.window.document;
global.DocumentFragment = jsdom.window.DocumentFragment;
