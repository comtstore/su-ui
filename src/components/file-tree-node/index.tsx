import React, { PropsWithChildren, useEffect, useState } from "react"
import { useObserver } from "mobx-react"
import { FileTreeNodeProps, FileTreeOperartion } from './interface'
import FileTreeNodeController from './controller'

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import MarkdownIcon from '../../assets/icons/markdown.svg'
import cx from 'classnames'
import GlobalStyles from '../../assets/styles'
import './index.scss'

function FileTreeNode(props: PropsWithChildren<FileTreeNodeProps>) {
    const [ controller ] = useState(() => new FileTreeNodeController(props))

    useEffect(() => {
        props.onMounted?.(props.item)
    }, [])

    const renderdefaultPrependComponent = () => {
        return (
            <>
            {
                props.item[controller.itemType] === controller.folderType && 
                (
                    controller.isOpen ? (
                        <FolderOpenIcon
                            sx={{ fontSize: 25 }}
                            color={GlobalStyles.TextColor.tc5}
                        ></FolderOpenIcon>
                    ) : (
                        <FolderIcon
                            sx={{ fontSize: 25 }}
                            color={GlobalStyles.TextColor.tc5}
                        ></FolderIcon>
                    )
                )
            }
            {
                props.item[controller.itemType] === 'md' &&
                (
                   <MarkdownIcon width={25} height={22} color={GlobalStyles.TextColor.tc3}>
                   </MarkdownIcon>
                )
            }
            </>
        )
    }

    const renderContent = () => {
        return (
            <div className="su-file-tree-node__content">
                {
                    props.item.children 
                    && props.item.children.length 
                    && props.item[controller.itemType] === controller.folderType
                    && (
                        <div className={
                            cx("su-file-tree-node__click",
                                {
                                    'su-file-tree-node__opened': controller.isOpen
                                }
                            )
                        }
                        onClick={controller.handleArrowClick}
                        >
                            <ArrowRightIcon
                                sx={{ fontSize: 25 }}
                                color={GlobalStyles.TextColor.tc3}
                            ></ArrowRightIcon>
                        </div>
                    ) || null
                }
                <div className="su-file-tree-node__prepend">
                    {
                        (props.prependComponent && props.prependComponent?.({
                            item: props.item,
                            open: controller.open,
                            active: controller.active
                        })) || renderdefaultPrependComponent()
                    }
                </div>
                <div className="su-file-tree-node__label">
                    {
                        (props.labelComponent && props.labelComponent?.({
                            item: props.item,
                            open: controller.open,
                            active: controller.active
                        })) || props.item[controller.itemLabel] || ''
                    }
                </div>
            </div>
        )
    }

    const renderRoot = () => {
        return (
            <div
               className={
                cx(
                    "su-file-tree-node__root",
                    {
                        [props.classes?.active ?? 'su-file-tree-node__active']: controller.isActive && !controller.isDisabled,
                        [props.classes?.disabled ?? 'su-file-tree-node__disabled']: controller.isActive && controller.disabled,
                        [props.classes?.node ?? 'su-file-tree-node']: !!props.classes?.node
                    }
                )
               }
               onClick={controller.handleTreeNodeClick}
               onContextMenu={controller.handleTreeNodeConTextMenu}
            >
                <div
                    className="su-file-tree-node__level"
                    style={{
                    marginLeft: controller.level * 24 + 'px'
                    }}
                />
                { renderContent() }
            </div>
        )
    }

    const renderChildrenNodes = (items) => {
        return (
            <>
            {
                items.map((
                    childFileNode,
                ) => {
                        if(childFileNode instanceof Array){
                            return renderChildrenNodes(childFileNode)
                        }
                        return (<FileTreeNode
                            key={childFileNode[props.itemKey]}
                            itemKey={props.itemKey}
                            item={childFileNode}
                            level={controller.level + 1}
                            itemLabel={controller.itemLabel}
                            active={controller.active}
                            open={controller.open}
                            disabled={controller.disabled}
                            disableLeaf={controller.disableLeaf}
                            classes={props.classes}
                            onOpenChange={props.onOpenChange}
                            openShouldChange={props.openShouldChange}
                            disabledOperation={props.disabledOperation}
                            prependComponent={props.prependComponent}    
                            labelComponent={props.labelComponent}   
                            onTreeNodeClick={props.onTreeNodeClick}
                            onContextMenu={props.onContextMenu}
                            onMounted={props.onMounted}
                            onDragstart={props.onDragstart}
                            onDragover={props.onDragover}
                            onDragleave={props.onDragleave}
                            onDrop={props.onDrop}
                        ></FileTreeNode>)
                    }
                )
            }
            </>
        )
    }

    return useObserver(() => (
        <div className={
            cx("su-file-tree-node",
            {
                'su-file-tree-node__lighting': controller.lighting
            })
        }
            onDragOver={controller.handleNodeDragover}
            onDragStart={controller.handleNodeDragstart}
            onDrop={controller.handleNodeDrop}
            onDragLeave={controller.handleNodeDragleave}
            draggable={!props.disabledOperation?.includes(FileTreeOperartion.DRAG)}
        >
            { renderRoot() }
            {
                props.item[controller.itemChildren] && 
                props.item[controller.itemChildren].length &&
                controller.isOpen ? (<div>{
                    renderChildrenNodes(props.item[controller.itemChildren])
                }</div>) : null
            }
        </div>
    ))
}

export default FileTreeNode