const express = require("express"),
	fs = require('fs'),
	path = require('path'),
	React = require("react"),
	Application = require("./src/app"),
	app = express();

app.use("/", express.static(path.join(__dirname, 'public')));

console.log("Development server runnning on port 3000");
app.listen(3000);