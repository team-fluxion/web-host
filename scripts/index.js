/* global require */

const fs = require('fs');
const tls = require('tls');
const bouncy = require('bouncy');

const {
    root_cert_path,
    domains,
    redirection,
    websites
} = require('../config.json');

// Start redirector on the programmed port
require('./redirector');

// Start all configured websites
websites.forEach(w => { require('../apps/' + w.website)(w.port); });

// Start an https server with bouncy
const server = bouncy(
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
    (req, res, bounce) => {
	    const matchingWebsites = websites
	          .filter(
		          w => {
		              return w.host === req.headers.host;
		          }
	          )
	          .concat({ port: redirection.port });

	    console.log(`Bouncing '${req.headers.host}' to ${matchingWebsites[0].port}`);
	    bounce(matchingWebsites[0].port);
    }
);
server.listen(443);

// Route all http to https
require('./http-to-https');
