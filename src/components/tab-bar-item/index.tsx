import React, { useState } from 'react'
import { TabBarItemProps } from "./interface";
import cx from 'classnames'
import './index.scss'
import TabBarItemController from './controller'
import { useObserver } from 'mobx-react';

function TabBarItem(props: TabBarItemProps){
    const [ controller ] = useState(() => new TabBarItemController(props))

    return useObserver(() => {
      const isActiveBefore = props.index === props.items.length - 1 ? 
      false : props.active.findIndex(item => item[props.itemKey] === props.items[props.index + 1][props.itemKey]) !== -1
      const isActiveAfter = props.index === 0 ? 
      false : props.active.findIndex(item => item[props.itemKey] === props.items[props.index - 1][props.itemKey]) !== -1

      return (
        <div
            className={
              cx('su-tab-bar-item',
              {
                  'su-tab-bar-item__active': props.active.findIndex(item => item[props.itemKey] === props.item[props.itemKey]) !== -1,
                  'su-tab-bar-item__active-before': isActiveBefore,
                  'su-tab-bar-item__active-after':  isActiveAfter
              })
            }
            style={{
              paddingLeft: props.prependComponent ? '20px' : '5px',
              paddingRight: props.appendComponent ? '40px' : '5px'
            }}
            onClick={props.onClick}
            onMouseOver={() => controller.handleChangeIsMouseover(true)}
            onMouseLeave={() => controller.handleChangeIsMouseover(false)}
        >
            <div className='su-tab-bar-item-label'>
              {
                props.prependComponent ? (
                  <div className='icon'>
                    {
                      props.prependComponent?.({
                        item: props.item,
                        index: props.index
                      })
                    }
                  </div>
                ) : null
              }
              { props.itemLabel ? <span className='first'>{ props.item[props.itemLabel] }</span> : null }
              { props.itemSecondLabel ? <span className='second'>{ 
               typeof props.itemSecondLabel === 'string' ?
               props.item[props.itemSecondLabel] : 
               props.itemSecondLabel(props.item) }</span> : null }
            </div>
            {
              props.appendComponent ?  (
                <div className='su-tab-bar-item-append'
                      onMouseOver={() => controller.handleChangeIsBtnMouseover(true)}
                      onMouseLeave={() => controller.handleChangeIsBtnMouseover(false)}
                >
                  {
                    props.appendComponent?.({
                      item: props.item,
                      index: props.index,
                      controller: controller
                    })
                  }
                </div>
              ) : null
            }
        </div>
      )
    }) 
}

export default TabBarItem