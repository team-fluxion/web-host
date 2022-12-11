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

place:
	@echo "Installing commands..."
	sudo install ./bin/* $(PREFIX)/bin/
	@echo "Commands installed"

service:
	@echo "Looking for a known init system..."
ifneq ($(shell command -v systemctl),)
	@echo "'SystemD' found. Attempting to create a service..."
	sudo cp ./init/* /etc/systemd/system/
	systemctl enable web-host-online.service
	@echo "SystemD service created and started."
else
	@echo "No known init system found."
endif

install: env place service
	@echo "web-host is now installed!"

uninstall:
	@echo "Uninstalling web-host..."
	sudo rm $(PREFIX)/bin/host-start
	sudo rm $(PREFIX)/bin/host-stop
	sudo rm $(PREFIX)/bin/host-restart
	sudo rm $(PREFIX)/bin/host-offline
	sudo rm $(PREFIX)/bin/host-resume
	sudo rm $(PREFIX)/bin/host-status
ifneq ($(shell command -v systemctl),)
	sudo rm /etc/systemd/system/web-host-online.service /etc/systemd/system/web-host-offline.service
endif
	@echo "Uninstallation was successful!"

reinstall: uninstall install
