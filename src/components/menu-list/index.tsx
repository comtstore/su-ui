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
                cx('su-menu-list', props.className, props.classes?.root)
            }
        >
            {
                props.items.map((menuListItem: MenuListItem, index: number) => {
                    return <>
                    { menuListItem.hide?.() ? null :
                      (
                        menuListItem.blank ? <div
                            key={'blank-'+ index}
                            className={
                            cx('su-menu-list-blank')
                            }
                        ></div> : (
                            <div
                                className={
                                    cx(
                                        'su-menu-list-item',
                                        {
                                            'su-menu-list-item__active': props.active && 
                                            (props.active === menuListItem || 
                                            (
                                                props.active instanceof Array &&
                                                props.active.findIndex(item => item[props.itemKey] === menuListItem[props.itemKey]) !== -1
                                            ))
                                        }
                                    )
                                } 
                                key={'item-' + index}
                                onClick={() => controller.onItemClick(menuListItem)}
                            >
                                <div className="su-menu-list-item-icon">{ props.iconComponent ? props.iconComponent(menuListItem.icon, menuListItem) : menuListItem.icon }</div>
                                <div className="su-menu-list-item-name">{ menuListItem[props.itemLabel ?? props.itemKey] }</div>
                            </div>
                        )
                      )
                    }
                    </>
                })
            }
        </div>
    ))
}

export default MenuList