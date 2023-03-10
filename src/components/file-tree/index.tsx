import React, { PropsWithChildren, useState } from 'react'
import { useObserver } from "mobx-react";
import { FileTreeProps } from './interface'
import cx from 'classnames'
import './index.scss'

import FileTreeController from './controller'

import FileTreeNode from '../file-tree-node'

function FileTree(props: PropsWithChildren<FileTreeProps>){
    const [ controller ] = useState(() => new FileTreeController(props))

    return useObserver(() => (
        <div
         className={
            cx('su-file-tree',
            {
                'su-file-tree__lighting': controller.lighting
            })
         }
         onContextMenu={controller.onTreeRootContextMenu}
         onDragOver={controller.handleNodeDragover}
         onDrop={controller.handleNodeDrop}
         onDragLeave={controller.handleNodeDragleave}
        >
            {
                props.items.map((childFileNode, index) => (
                    <FileTreeNode
                       key={
                        props.itemKey ? 
                        childFileNode[props.itemKey] 
                        : index
                       }
                       item={childFileNode}
                       itemLabel={props.itemLabel}
                       active={props.active}
                       open={props.open}
                       disabled={props.disabled}
                       disableLeaf={props.disableLeaf}
                       classes={props.classes}
                       prependComponent={props.prependComponent}    
                       labelComponent={props.labelComponent}    
                       disabledOperation={props.disabledOperation}
                       onTreeNodeClick={props.onTreeNodeClick}  
                       onContextMenu={props.onContextMenu}
                       onDragstart={props.onDragstart}
                       onDragover={props.onDragover}
                       onDragleave={props.onDragleave}
                       onDrop={props.onDrop}
                    ></FileTreeNode>
                ))
            }
        </div>
    ))
}

export default FileTree