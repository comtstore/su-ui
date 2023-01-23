import React, { useState } from 'react'
import { TabBarItemProps } from "./interface";
import cx from 'classnames'
import './index.scss'
import TabBarItemController from './controller'

// import MarkdownIcon from '../../assets/icons/markdown.svg'
// import CloseIcon from '../../assets/icons/close.svg'
// import RoundIcon from '../../assets/icons/round.svg'

// import GlobalStyles from '../../assets/styles'
import { useObserver } from 'mobx-react';

function TabBarItem(props: TabBarItemProps){
    const [ controller ] = useState(() => new TabBarItemController(props))

    return useObserver(() => (
      <div
          className={
            cx('su-tab-bar-item',
            {
                'su-tab-bar-item__active': props.active.findIndex(item => item[props.itemKey] === props.item[props.itemKey]) !== -1,
                'su-tab-bar-item__active-before': props.active.findIndex(item => item[props.itemKey] === props.item[props.itemKey]) === props.index + 1,
                'su-tab-bar-item__active-after':  props.active.findIndex(item => item[props.itemKey] === props.item[props.itemKey]) === props.index - 1
            })
          }
          onClick={props.onClick}
          onMouseOver={() => controller.handleChangeIsMouseover(true)}
          onMouseLeave={() => controller.handleChangeIsMouseover(false)}
      >
          <div className='su-tab-bar-item-label'>
            <div className='icon'>
              {
                props.prependComponent?.({
                  item: props.item,
                  index: props.index
                })
              }
            </div>
            { props.itemLabel ? <span className='first'>{ props.item[props.itemLabel] }</span> : null }
            { props.itemSecondLabel ? <span className='second'>{ 
             typeof props.itemSecondLabel === 'string' ?
             props.item[props.itemSecondLabel] : 
             props.itemSecondLabel(props.item) }</span> : null }
          </div>
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
      </div>
  )) 
}

export default TabBarItem