/* global require module __dirname */

const path = require('path');
const fs = require('fs');
const https = require('https');
const tls = require('tls');
const express = require('express');

const { root_cert_path, domains } = require('../config');

const baseUrl = path.join(__dirname, '../');
const httpServer = express();

const serveOfflinePage = (req, res) => {
    res.send(
	    fs.readFileSync(
	        `${baseUrl}/offline.html`,
	        'utf8'
	    )
    );
}

httpServer.get('*', serveOfflinePage);

const httpsServer = https.createServer(
    {
	    key: fs.readFileSync(`${root_cert_path}/privkey.pem`),
	    cert: fs.readFileSync(`${root_cert_path}/fullchain.pem`),
	    SNICallback: (serverName, cb) => {
	        console.log(`Requested server: ${serverName}`);

	        const matchingDomain = domains.filter(
		        d => serverName.endsWith(d.server)
	        )[0];

	        console.log(`Matching server: ${matchingDomain.server}`);

	        if (matchingDomain) {
		        const ctx = tls.createSecureContext(
		            Object.assign(
			            {},
			            {
			                key: fs.readFileSync(`${matchingDomain.cert_path}/privkey.pem`),
			                cert: fs.readFileSync(`${matchingDomain.cert_path}/fullchain.pem`)
			            }
		            )
		        );

		        if (cb) {
		            cb(null, ctx);
		        } else {
		            return ctx;
		        }
	        }
	    }
    },
    httpServer
);

// Listen on port 80 and 443
httpServer.listen(
    80,
    () => { console.log('Port 80 offline!'); }
);
httpsServer.listen(
    443,
    () => { console.log('Port 443 offline!'); }
);
