import React, { useCallback, useMemo, useState } from 'react'
import ReactDOM from 'react-dom';
import GeneralIcon from '@assets/icons/general.svg'
import { MenuList, Button } from '@ui/index.esm.js'
import ComponentDetail from './components/component-detail/index.jsx'
import './index.scss'

function Root(){
    const [ active, setActive ] = useState(null)

    const [ show, setShow ] = useState(false)

    const menuItemConfig = useMemo(() => ([
        {
            name: 'Button',
            icon: <GeneralIcon />,
            hide: () => show
        }, {
            name: 'DraggleBar'
        }, {
            blank: true
        }, {
            name: 'FileTree'
        }, {
            name: 'FileTreeNode'
        }, {
            blank: true
        },  {
            name: 'TabBar'
        }, {
            name: 'TabBarItem'
        }, {
            blank: true
        }, {
            name: 'Logo'
        }, {
            name: 'Main'
        }, {
            name: 'MenuList'
        }, {
            name: 'SnackBar'
        }, {
            name: 'TopBar'
        }, {
            blank: true
        }
    ]), [ show ])

    const onItemClick = (item) => {
        setActive(item)
    }

    const changeShow = useCallback(() => {
        console.log("🚀 ~ file: index.jsx:56 ~ changeShow ~ show", show)
        setShow(!show)
    }, [ show ])

    return <div className='root-container'>
        <MenuList
           items={menuItemConfig}
           onItemClick={onItemClick}
           active={active}
           itemKey={'name'}
           itemLabel={'name'}
        />
        <ComponentDetail active={active}/>
        <Button onClick={changeShow}>切换显示与隐藏</Button>
    </div>
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
