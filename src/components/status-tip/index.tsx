import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import { StatusTipItemConfig, StatusTipProps } from './interface'
import RoundIcon from '../../assets/icons/round.svg'

function StatusTip(props: StatusTipProps){
        const [ isShowDesc, setIsShowDesc ] = useState(true)
        const isShowDescTimeout: React.MutableRefObject<null | NodeJS.Timeout> = useRef(null)

        const clearIsShowDescTimeout = () => {
            // 清除原来的定时器
            isShowDescTimeout.current && clearTimeout(isShowDescTimeout.current)
            isShowDescTimeout.current = null
        }

        useEffect(() => {
            clearIsShowDescTimeout()
            setIsShowDesc(true)
            const status = props.status
            const index = props.items.findIndex(item => item.name === status)
            if(index > -1){
                const itemConfig: StatusTipItemConfig = props.items[index]
                if(itemConfig.duration && itemConfig.duration > 0){
                    isShowDescTimeout.current = setTimeout(() => {
                        setIsShowDesc(false)
                    }, itemConfig.duration)
                }

            }
        }, [ props.status ])

        return (<React.Fragment>
            {
                props.items.map((item: StatusTipItemConfig) => {
                    return <>
                    {
                        props.status === item.name && !item.hidden ? (
                            <div
                                className='status-tip-item'
                                key={item.name}
                            >
                                <RoundIcon width="14px" height="14px" color={item.color}></RoundIcon>
                                {
                                    item.desc && isShowDesc ? <span
                                        className='desc'
                                        style={{
                                            color: item.color
                                        }}
                                    >{ item.desc }</span> : null
                                }
                            </div>
                        ) : null
                    }
                    </>
                })
            }
        </React.Fragment>)
}

export default StatusTip