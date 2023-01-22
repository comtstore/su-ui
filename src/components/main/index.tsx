import React, { PropsWithChildren } from 'react'
import { MainProps } from './interface'
import cx from 'classnames'
import './index.scss'
import { useObserver } from 'mobx-react'

function Main(props: PropsWithChildren<MainProps>){
    return useObserver(() => (
        <div 
           className={
            cx('su-main-container', props.className)
           }
           style={{
            ...props.style,
            ...props.styles?.root
           }}
        >
            {props.children}
        </div>
    ))
}

export default Main