SHELL = /bin/sh

ifeq ($(PREFIX),)
    PREFIX := /usr/local
endif

help:
	@echo "Use one of the following options:"
	@echo "'make install' - Installs web-host"
	@echo "'make uninstall' - Uninstalls web-host"
	@echo "'make reinstall' - Reinstalls web-host"

env:
	@echo "Checking for dependencies..."
	apt update && apt upgrade
	mkdir -p /var/web-host/apps
	apt install npm
	npm install -g forever

place:
	@echo "Installing commands..."
	sudo install ./bin/host-start $(PREFIX)/bin/
	sudo install ./bin/host-stop $(PREFIX)/bin/
	sudo install ./bin/host-restart $(PREFIX)/bin/
	sudo install ./bin/host-offline $(PREFIX)/bin/
	sudo install ./bin/host-resume $(PREFIX)/bin/
	sudo install ./bin/host-status $(PREFIX)/bin/
	@echo "Commands installed"

install: env place
	@echo "web-host is now installed!"

uninstall:
	@echo "Uninstalling web-host..."
	sudo rm $(PREFIX)/bin/host-start
	sudo rm $(PREFIX)/bin/host-stop
	sudo rm $(PREFIX)/bin/host-restart
	sudo rm $(PREFIX)/bin/host-offline
	sudo rm $(PREFIX)/bin/host-resume
	sudo rm $(PREFIX)/bin/host-status
	@echo "Uninstallation was successful!"

reinstall: uninstall install
