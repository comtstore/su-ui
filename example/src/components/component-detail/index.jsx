import React from 'react'
import ButtonDetail from '../button-detail/index.jsx'

function ComponentDetail(props){
    return (<div className="component-detail">
        { props.active && props.active.name === 'Button' ? <ButtonDetail></ButtonDetail> : null }
    </div>)
}

export default ComponentDetail