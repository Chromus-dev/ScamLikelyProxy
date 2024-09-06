/* ====== create node.js server with express.js framework ====== */
// dependencies
const express = require("express");

const app = express();

app.get("/", (req, res) => {
   res.send("This is home page.");
});

app.get('/:link', (req, res) => {
    let link = req.params.link
    fetch('https://link-checker.nordvpn.com/v1/public-url-checker/check-url', {
        method: 'POST',
        body: JSON.stringify({url: link})
    })
    .then(res => res.json())
    .then(data => res.send(data))
})

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