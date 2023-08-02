const { JSDOM } = require("jsdom");
const sinon = require("sinon");

const { window } = new JSDOM("<div id=\"app\"></div>", {
  url: "http://localhost:5173"
});
global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
global.window = window;
global.window.location = window.location;
global.history = window.history;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
require.extensions[".scss"] = function() {
  module.exports = () => ({});
};
require.extensions[".svg"] = function() {
  module.exports = () => ({});
};
