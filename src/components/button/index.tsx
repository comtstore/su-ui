import React, { PropsWithChildren, useEffect, useState } from 'react'
import cx from 'classnames'
import { ButtonProps } from './interface'
import ButtonController from './controller'
import './index.scss'
import { useObserver } from 'mobx-react'

function Button(props: PropsWithChildren<ButtonProps>){
    const ref: any = React.createRef()
    const [ controller ] =  useState(() => new ButtonController(props, ref))

    useEffect(() => {
        ['click', 'touchstart'].forEach(eventname => {
            window.addEventListener(eventname, controller.triggerCallback)
        }); 
        return () => {
            ['click', 'touchstart'].forEach(eventname => {
                window.removeEventListener(eventname, controller.triggerCallback)
            }); 
        }
    }, [])

    return useObserver(() => (
        <button
            ref={ref}
            disabled={props.disabled}
            className={
                cx(
                    'su-button',
                    'su-button-' + (props.type ?? 'contained'),
                    {
                        'su-button-block': props.block,
                        'su-button-activate': controller.isTriggerred,
                        'su-button-disabled': props.disabled
                    },
                    props.className,
                    props.classes?.button
                )
            }
            style={{
                ...props.style,
                ...props.styles?.button,
                width: props.width ?? 'fit-content',
                height: props.height ?? 'fit-content'
            }}
            onClick={props.onClick}
            onTouchStart={props.onTouchStart}
            onMouseOver={controller.onMouseOver}
            onMouseLeave={controller.onMouseLeave}
        >
            {
                controller.isShowContent ? props.children : null
            }
        </button>
    ))  
}

export default Button