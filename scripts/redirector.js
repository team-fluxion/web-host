/* global require module */

const express = require('express');

const { joinPaths } = require('./lib');
const { redirection } = require('../config.json');

const app = express();

app.get(
    '*',
    (req, res) => {
        const matchingRedirects = redirection.redirects.filter(
            ({ from }) => from.indexOf(req.hostname) > -1
        );

        if (matchingRedirects.length) {
            res.redirect(joinPaths(matchingRedirects[0].to, req.url));
        } else {
            res.redirect(redirection.defaultUrl);
        }
    }
);

app.listen(
    redirection.port,
    () => { console.log(`Redirector started on ${redirection.port}`); }
);
