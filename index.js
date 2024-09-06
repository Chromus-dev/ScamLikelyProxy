/* ====== create node.js server with express.js framework ====== */
// dependencies
const express = require("express");

const app = express();

app.get("/", (req, res) => {
   res.send("This is home page.");
});

app.post("/", (req, res) => {
   res.send("This is home page with post request.");
});

// PORT
const PORT = 3000;

app.listen(PORT, () => {
   console.log(`Server is running on PORT: ${PORT}`);
});


// ======== Instructions ========
// save this as index.js
// you have to download and install node.js on your machine
// open terminal or command prompt
// type node index.js
// find your server at http://localhost:3000