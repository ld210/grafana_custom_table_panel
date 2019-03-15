## Tradelab Bidder Table panel for Grafana

This panel is a fork of the original Grafana table panel, for customisation.

### Plugin options

Same as the original

### Install

1. Simply clone the repository in your grafana plugin folder and you're set.

### Development

1. [Build Grafana from source](http://docs.grafana.org/project/building_from_source/)
1. Clone the repository in the `data/plugins` folder and `cd` to it
1. make sure you have [yarn]( https://yarnpkg.com/) installed
1. install project dependencies: `yarn install --pure-lockfile`
1. Start the "watch" task: `yarn watch`
1. Run a local Grafana instance `grafana/bin/<os>-<architecture>/grafana-server`
1. Open Grafana at http://localhost:3000/
1. Log in with username "admin" and password "admin"
1. Create new dashboard and add the plugin

### Build the plugin

1. `yarn build`
