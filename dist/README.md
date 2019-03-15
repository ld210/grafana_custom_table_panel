## Tradelab Bidder Table panel for Grafana

This panel is a fork of the original Grafana table panel, for customisation.

### Plugin options

Same as the original

### Install

1. Clone the repository in your grafana plugin folder & cd to it
1. Make sure you have [yarn]( https://yarnpkg.com/) installed
1. install project dependencies: `yarn install --pure-lockfile`
1. Buil a production build: `yarn build`

or

1. Clone the repository, install dependencies & run a production build with `yarn build`
1. Create a new folder in your plugin repository and copy the `dist` folder and its content into it

### Development

1. Clone the repository and `cd` to it
1. make sure you have [yarn]( https://yarnpkg.com/) installed
1. install project dependencies: `yarn install --pure-lockfile`
1. Start the "watch" task: `yarn watch`
1. Run a local Grafana instance with the development version of the plugin: `docker run -p 3000:3000 -d --name grafana-plugin-dev --volume $(pwd)/dist:/var/lib/grafana/plugins/clock-panel grafana/grafana`
1. Check the logs to see that Grafana has started up: `docker logs -f grafana-plugin-dev`
1. Open Grafana at http://localhost:3000/
1. Log in with username "admin" and password "admin"
1. Create new dashboard and add the plugin

To build a production build with minification: `yarn build`


