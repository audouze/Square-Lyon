# Soundworks Square - Cosima Residence with L. Bianchi

> Part of L. Bianchi residence at IRCAM (Cosima project, December 2016): Augmented exploration of the Stravinsky Place in Paris.

> See [soundworks-template repository](https://github.com/collective-soundworks/soundworks-template) for detail on how to use the Soundworks framework.

# Clients

## development vs production

For working purpose, a controller is available at `http://your.ip/controller`.
This client should ***never*** be accessible in production. 

To do that:

- switch the `env` from `development` to `production` in the `src/server/config/your-config.js`.
- retranspile `npm run transpile`
- run the server with by setting the `ENV` global to your config file basename: `ENV=your-config node dist/server/index.js`


# Useful Links

Project website: http://forumnet.ircam.fr/fr/event/square

Experience url: http://apps.cosima.ircam.fr/square

# Hardware pour déployer en réseau local

* Mac avec appli Server installée (pour le DHCP et le DNS)
https://itunes.apple.com/fr/app/os-x-server/id883878097

* Bornes WiFi
https://store.ubnt.com/collections/wireless/products/unifi-ap-pro 

* Switch Ethernet supportant PPoE (Power over ethernet)
https://www.ldlc.com/fiche/PB00118820.html

* Câbles réseau RJ45 (catégorie 6)
https://www.ldlc.com/fiche/PB00187679.html

* Multiprise

## Software pour déployer en réseau local

si l’application doit tourner sur les internets (4g, etc.) un serveur dédié avec debian peut être utilisé sans problème, dans ce cas le DHCP et le DNS sont gérés par des services extérieurs.

node 	pour lancer l’application (le serveur)
https://nodejs.org/en/ (préférer la version TLS pour Long Term Support)
git 	pour récupérer et mettre à jour l’application

notes macOS :
installer les command line developer tools
`xcode-select --install`

passer par homebrew pour installer git
https://brew.sh/index_fr.html

pour un déploiement en ligne, utiliser :
pm2 	package node qui permet de monitorer l’application et de la relancer automatiquement si elle plante (http://pm2.keymetrics.io/) 
