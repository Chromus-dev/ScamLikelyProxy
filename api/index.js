const express = require("express");

const app = express();

app.get("/", (req, res) => {
   res.send("This is home page.");
});


// https://nordvpn.com/static/UrlCheckerInput.BidosNo3.js

const types = {
  0: "URL is in the database, but no information available about it (yet)",
  1: "Either the URL is missing from the database, or it is known to be clean",
  2: "Malware",
  3: "Phishing",
  4: "Spam",
  5: "Potentially Unwanted Application",
  6: "Potentially Unwanted Application (a web page containing PUAs)",
  7: "Potentially Unwanted Search Engine"
}; 

const explainations = {
    "reliableUrl": "{url} shows no signs of malicious activity. Nevertheless, remain vigilant while browsing.",

    "unexpectedError": "Error. Try again",

    "malwareDetection": "{url} was identified as a malicious site. It could infect your device with viruses, worms, spyware, trojans, and other malware.",

    "phishingDetection": "{url} was identified as a phishing site. It could trick you into revealing your personal information, like login credentials and credit card details.",

    "spamDetection": "{url} was identified as a spam site. It could record your email address and send you a lot of unwanted emails.",

    "unwantedAppDetection": "{url} is known to distribute potentially unwanted applications (PUA). They could install adware or contain other unwanted and dangerous features.",

    "suspiciousRedirectDetection": "{url} was identified as suspicious because you may have been redirected to it by malware or a potentially unwanted application."
}

// took this from nordvpn
const ee = (e, t) => {
    // e is api response
    const {status: a, category: n} = e;
    if (a !== 0)
        return {
            message: t.unexpectedError,
            isSuccessCheck: !1,
            isSafe: !1,
            response: e,
            error: null
        };
    if (n === 0 || n === 1)
        return {
            message: t.reliableUrl,
            isSuccessCheck: !0,
            isSafe: !0,
            response: e,
            error: null
        };
    const l = {
        2: t.malwareDetection,
        3: t.phishingDetection,
        4: t.spamDetection,
        5: t.unwantedAppDetection,
        6: t.unwantedAppDetection,
        7: t.suspiciousRedirectDetection
    }[n];
    return {
        message: l ?? t.unexpectedError,
        isSuccessCheck: !!l,
        isSafe: !1,
        response: e,
        error: null
    }
};

app.use('/:link', (req, res) => {
    if(req.method === 'OPTIONS') { return res.status(200).end() }
    if (req.method !== 'GET') return res.status(405).send('method ' + req.method + ' not allowed')

    let link = req.params.link.toString()
    link = decodeURIComponent(link)

    // console.log(link)

    fetch("https://link-checker.nordvpn.com/v1/public-url-checker/check-url", {
        "headers": {
          "accept": "application/json",
          "content-type": "application/json",
        },
        "body": JSON.stringify({url: (link)}),
        "method": "POST"
      })
    .then(res => res.json())
    .then(data => {
        let nordResponse = ee(data, explainations)

        nordResponse.message = nordResponse.message.replace('{url}', nordResponse.response.url)

        //{link, nordData: data, nordText}

        res.send(nordResponse)
    })
})

const PORT = 3300;

app.listen(PORT, () => {
   console.log(`Server is running on PORT: ${PORT}`);
});

module.exports = app;