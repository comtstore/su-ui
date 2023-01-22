const BoxShadow = require('./box-shadow')
const FontSize = require('./font-size')
const TextColor = require('./text-color')
const Theme = require('./theme')

module.exports = {
    ...BoxShadow,
    ...FontSize,
    ...TextColor,
    ...Theme,
    BoxShadow,
    FontSize,
    TextColor,
    Theme
}

