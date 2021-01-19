# web-host

[![License](https://img.shields.io/github/license/team-fluxion/web-host.svg)](https://opensource.org/licenses/MIT)

A host for serving multiple domains and sub-domains with redirection and more

## What is it?

*web-host* comprises of a setup that can help host Node.js websites over multiple domains and sub-domains, over or without SSL.

There's also other provisions like:

- Redirection to internally hosted or external websites
- Offline mode

## Installation

Clone the project at the home directory. This is currently a requirement that may go away in the future.

    # Clone the project
    git clone https://github.com/team-fluxion/web-host.git

    # Switch to project directory
    cd web-host

    # Install dependencies and commands with `make`
    make install

Uninstalling would remove all the commands.

    make uninstall

Or you can also re-install:

    make reinstall

## How to Use

1. Place websites to host under the `apps` directory. Each website only needs to provide a script that exposes a single default function accepting an argument as the port that it listens on.

2. (Optional) Create SSL certificates for the domains that need to be hosted over SSL, if at all.

3. Configure the host in file `config.json` mentioning the details of the certificates, websites and redirection.

Once everything is place, use the below installed commands:

1. `host-start` - starts all websites, starts listening on port `80` and `443` (if using SSL) and sets up bouncing to appropriate websites according to request URLs
2. `host-stop` - stops all websites
3. `host-restart` - restarts the server
4. `host-offline` - stops the server but starts an offline mode on both: port `80` and `443`
6. `host-resume` - works exactly like `host-restart`
5. `host-status` - reports the current status of the host

## To-do

* (a lot of them coming soon...)
