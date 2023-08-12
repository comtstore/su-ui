import { useObserver } from 'mobx-react'
import React from 'react'
import cx from 'classnames'
import './index.scss'
import { TagProps } from './interface'

function Tag(props: TagProps){
    return useObserver(() => (<div className={cx(
        'su-tag',
        props.className,
        props.classes?.root
    )}
    style={{
        ...props.style,
        ...props.styles?.root
    }}
    onClick={props.onClick}
    >
        { props.icon?.() }
        { props.label ? (
            <span className={
                cx('su-tag-name', 
                   props.classes?.label
                )
            }
            style={props.styles?.label}
            >{ props.label }</span>
        ) : null
        }
    </div>))
}

export default Tag