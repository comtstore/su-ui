import React, { PropsWithChildren, useState } from 'react'
import { TabBarProps } from './interface'
import { useObserver } from 'mobx-react'
import cx from 'classnames'
import './index.scss'
import TabBarItem from '../tab-bar-item'
import { TabBarItemConfig } from '@components/tab-bar-item/interface'
import TabBarController from './controller'

function TabBar(props: PropsWithChildren<TabBarProps>){

    const [ controller ] = useState(() => new TabBarController(props))

    return useObserver(() => (
        <div 
         className={
            cx(props.className,
               'su-tab-bar-container'
            )
         }
        >
            <div className='su-tab-bar-body'>
            {
                props.items.map((tabItem: TabBarItemConfig, index) => (
                    <TabBarItem
                       key={ tabItem[props.itemKey] }
                       active={props.active}
                       index={index}
                       item={tabItem}
                       items={props.items}
                       itemKey={props.itemKey}
                       itemLabel={props.itemLabel}
                       itemSecondLabel={props.itemSecondLabel}
                       appendComponent={props.appendComponent}
                       prependComponent={props.prependComponent}
                       labelComponent={props.labelComponent}
                       onClick={(e) => controller.onTabClick(e, tabItem)}
                    ></TabBarItem>
                ))
            }
            </div>
        </div>
    ))
}

export default TabBar