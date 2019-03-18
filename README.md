## Tradelab Bidder Table panel for Grafana

This panel is a fork of the original Grafana table panel, for customisation.

### Plugin options

Same as the original with some options added :

1. Add a display option to column type Number. The display option has 3 modes:
      - `Value` : display the value with the desired format, just like usual, nothing change.
      - `Progress Bar`: display the value on top of a progress bar, when unit is `percent`
      - `Delta`: display an arrow up for positive numbers, and an arrow down for negative numbers. Original value is displayed in a tooltip on hover. A possible feature is to add a threshold support to this option.

1. Add a new type `Country code`, with a display mode option:
      - `Value`: display original value
      - `Flag icon`: display a flag icon (svg format). For this feature to works, the country code must be [ISO 3166-1-alpha-2](https://www.iso.org/obp/ui/#search/code/)

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
