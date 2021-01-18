/* global require */

const app = require('express')();

app.get(
    '*',
    ({ hostname, url }, res) => {
	    console.log(`Routing ${hostname} from http to https...`);
	    res.redirect(`https://${hostname}${url}`);
    }
);

app.listen(
    80,
    () => { console.log('Routing all traffic from http to https'); }
);
