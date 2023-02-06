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
    )}>
        { props.icon?.() }
        <span className={
            cx('su-tag-name', 
               props.classes?.label
            )
        }>{ props.label }</span>
    </div>))
}

export default Tag