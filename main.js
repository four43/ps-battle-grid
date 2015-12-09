const React = require("react"),
	App = require("./src/app");

const config = {
	psBattleUrl: 'http://www.reddit.com/r/photoshopbattles/hot.json',
	commentUrlTemplate: 'http://www.reddit.com/r/photoshopbattles/comments/{{id}}.json'
};

React.render(<App {...config}
	/>, document.getElementById("app"));