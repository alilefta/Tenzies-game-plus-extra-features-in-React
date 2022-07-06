const express = require("express");
const path = require("path");
const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
	console.log(res);
});

app.listen(port, () => {
	console.log("Server is listeneing on port " + port);
});
