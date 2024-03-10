import React, { useState } from "react"
import { MenuListProps, MenuListItem } from "./interface"
import cx from 'classnames'
import './index.scss'
import MenuListController from './controller'
import { useObserver } from "mobx-react"

function MenuList(props: MenuListProps){
    const [ controller ] = useState(() => new MenuListController(props))
    return useObserver(() =>  (
        <div
            className={
                cx({
                    'su-menu-list': true,
                    [props.className ?? '']: true,
                    [props.classes?.root ?? '']: true,
                    vertical: props.direction === 'vertical'
                })
            }
        >
            {
                props.items.map((menuListItem: MenuListItem, index: number) => {
                    if(menuListItem.hide?.()){
                        return null
                    } else if(menuListItem.blank){
                        return <div
                            key={'blank-'+ index}
                            className={cx('su-menu-list-blank')}
                        ></div>
                    } else {
                        return <div
                            className={
                                cx({
                                    'su-menu-list-item': true,
                                    'vertical': props.direction === 'vertical',
                                    'su-menu-list-item__active': props.active && 
                                    (props.active === menuListItem || 
                                    (
                                        props.active instanceof Array &&
                                        props.active.findIndex(item => item[props.itemKey] === menuListItem[props.itemKey]) !== -1
                                    ))
                                })
                            } 
                            key={'item-' + index}
                            onClick={() => controller.onItemClick(menuListItem)}
                        >
                            { menuListItem.icon ? <div className="su-menu-list-item-icon">{ props.iconComponent ? props.iconComponent(menuListItem.icon, menuListItem) : menuListItem.icon }</div> : null }
                            <div className={
                                cx({
                                    "su-menu-list-item-name": true,
                                    [props.size ?? 'medium']: true
                                })
                            }>{ menuListItem[props.itemLabel ?? props.itemKey] }</div>
                        </div>
                    }
                })
            }
        </div>
    ))
}

export default MenuList