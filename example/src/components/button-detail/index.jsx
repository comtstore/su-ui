import React from 'react'
import { Button } from '@ui/index.esm.js'

function ButtonDetail(props){
    return <div>
       <div>outlined button</div>
       medium: 
       <Button
          type="outlined"
       >nice</Button>
       large: 
        <Button
          type="outlined"
          size="large"
       >nice</Button>
       small: 
        <Button
          type="outlined"
          size="small"
       >nice</Button>
    </div>
}

export default ButtonDetail