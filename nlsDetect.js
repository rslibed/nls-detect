const express = require('express');
const app = express();
const fs = require('fs');

const nlsData = {
    "ar": 1,
    "bs": 1,
    "ca": 1,
    "cs": 1,
    "da": 1,
    "de": 1,
    "el": 1,
    "es": 1,
    "et": 1,
    "fi": 1,
    "fr": 1,
    "he": 1,
    "hi": 1,
    "hr": 1,
    "hu": 1,
    "id": 1,
    "it": 1,
    "ja": 1,
    "ko": 1,
    "lt": 1,
    "lv": 1,
    "nl": 1,
    "nb": 1,
    "pl": 1,
    "pt-br": 1,
    "pt-pt": 1,
    "ro": 1,
    "ru": 1,
    "sl": 1,
    "sr": 1,
    "sv": 1,
    "th": 1,
    "tr": 1,
    "vi": 1,
    "zh-cn": 1,
    "zh-hk": 1,
    "zh-tw": 1

}

const nlsLangs = [];

for (const langKey in nlsData) {
    nlsLangs.push(langKey);
}

const langInFile = [];

const regexExp = /\"[a-z]{1}[a-z]{1}\-?[a-z]?[a-z]?\"/g;

app.get('/', (req, res) => {
    fs.readFile('3DViz/js/nls/resources.js', function (err, data) {
        const fileData = data.toString();
        const matches = fileData.match(regexExp);
        let matchIndex = 0;
        while (matchIndex < matches.length) {
            const removeQuotes = matches[matchIndex].replace('"', "").replace('"', "")
            langInFile.push(removeQuotes);
            matchIndex++;
        }
    })
    res.send(langInFile);
});



app.listen(8080, () => console.log('Nls Detect is running...'))