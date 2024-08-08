import { MenuListItem } from "./interface"

const getAttrFromItem = (menuListItem: MenuListItem, attrName: string, fallbackAttrName: string, props) => {
    const _attrName = props[attrName] ?? (fallbackAttrName ? props[fallbackAttrName] : '')
    let attr = menuListItem[_attrName]
    if(typeof attr === 'function'){
        attr = attr()
    }
    return attr
}

export const getMenuListItemLabel = (menuListItem: MenuListItem, props) => {
    return getAttrFromItem(menuListItem, 'itemLabel', 'itemKey', props)
}

export const getMenuListItemKey = (menuListItem: MenuListItem, props) => {
    return getAttrFromItem(menuListItem, 'itemKey', '', props)
}
