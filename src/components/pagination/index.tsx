import React, { useEffect, useMemo, useState } from "react"
import { PaginationProps } from "./interface"
import cx from 'classnames'
import './index.scss'
import PaginationController from "./controller"

function MenuList(props: PaginationProps){
    const [ controller ] = useState(() => new PaginationController(props))
    // props发生变化，controller内需要变化
    useEffect(() => controller.updateProps(props), [ props ])

    const pageNum = useMemo(() => Math.ceil(props.num / props.limit), [ props.num, props.limit ])

    return <div className={
        cx('su-pagination', props.className, props.classes?.root)
    }>
         <div className='su-pagination-main'>
            {
                props.page > 0 ?
                <div
                    className='su-pagination-main-page-left-arrow'
                    onClick={controller.turnToBeforePage}
                ><div></div></div> : null
            }
            {
                1 < props.page - Math.floor(props.pageLimit / 2) ? <div
                    className='su-pagination-main-page-more'
                >···</div> : null
            }
            {
                new Array(pageNum).fill(1).map((_, index) => index + 1).map((currentPageNum) => {
                    if(currentPageNum < props.page - Math.floor(props.pageLimit / 2)
                      || currentPageNum >= props.page - Math.floor(props.pageLimit / 2) + props.pageLimit
                    ) return null
                    return <div
                        className={cx('su-pagination-main-page-num', {
                            'selected': props.page === currentPageNum
                        })}
                        key={currentPageNum}
                        onClick={(e) => controller.changePage(e, currentPageNum)}
                    >{currentPageNum}</div>
                }).filter(haveContent => haveContent)
            }
            {
                pageNum >= props.page - Math.floor(props.pageLimit / 2) + props.pageLimit ?
                <div 
                   className='su-pagination-main-page-more'
                >···</div> : null
            }
            {
                props.page < pageNum ?
                <div 
                    className='su-pagination-main-page-right-arrow'
                    onClick={controller.turnToNextPage}
                ><div></div></div> : null
            }
        </div>
    </div>
}

export default MenuList