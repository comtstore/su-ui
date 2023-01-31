import React, { useState } from "react"
import { MenuListProps, MenuListItem } from "./interface"
import cx from 'classnames'
import './index.scss'
import MenuListController from './controller'

function MenuList(props: MenuListProps){

    const [ controller ] = useState(() => new MenuListController(props))

    return (
        <div 
            className="su-menu-list"
            style={{
                width: props.width ?? 150
            }}
        >
            {
                props.items.map((menuListItem: MenuListItem, index: number) => {
                    if(menuListItem.blank){
                        return (
                            <div
                              key={'blank-'+ index}
                              className={
                                cx('su-menu-list-blank')
                              }
                            >  
                            </div>
                        )
                    }else {
                        return (
                            <div
                                className={
                                    cx(
                                        'su-menu-list-item',
                                        {
                                            'su-menu-list-item__active': props.active && 
                                            (props.active === menuListItem || 
                                            (
                                                props.active instanceof Array &&
                                                props.active.includes(menuListItem)
                                            ))
                                        }
                                    )
                                } 
                                key={'item-' + index}
                                onClick={() => controller.onItemClick(menuListItem)}
                            >
                                <div className="su-menu-list-item-icon">{ menuListItem.icon }</div>
                                <div className="su-menu-list-item-name">{ menuListItem.name }</div>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}

export default MenuList