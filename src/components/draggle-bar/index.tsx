import React, { useEffect, useState } from 'react'
import { DraggleBarProps } from './interface'
import DraggleBarController from './controller'
import './index.scss'
import { useObserver } from 'mobx-react'

function DraggleBar(props: DraggleBarProps){
    const [ controller ] = useState(() => new DraggleBarController(props))

    useEffect(() => {
        window.addEventListener('mousemove', controller.inDragging)
        window.addEventListener('mouseup', controller.stopDragging)
        return () => {
            window.removeEventListener('mousemove', controller.inDragging)
            window.removeEventListener('mouseup', controller.stopDragging)
        }
    })

    return useObserver(() => (
        <div
          className="draggle-line"
          onMouseDown={controller.startDragging}
         >
            {
                controller.isDragging ?  
                <div className="line" /> : null
            }
        </div>
    ))
}

export default DraggleBar