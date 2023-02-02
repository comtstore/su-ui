import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import GeneralIcon from '@assets/icons/general.svg'
import { MenuList } from '@ui/index.esm.js'
import ComponentDetail from './components/component-detail/index.jsx'
import './index.scss'

function Root(){
    const [ active, setActive ] = useState(null)

    const [ menuItemConfig ] = useState([
        {
            name: 'Button',
            icon: <GeneralIcon />,
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
    ])

    const onItemClick = (item) => {
        console.log("🚀 ~ file: index.jsx:47 ~ onItemClick ~ item", item)
        setActive(item)
    }

    return <div className='root-container'>
        <MenuList
           items={menuItemConfig}
           onItemClick={onItemClick}
           active={active}
           itemKey={'name'}
           itemLabel={'name'}
        />
        <ComponentDetail active={active}/>
    </div>
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
