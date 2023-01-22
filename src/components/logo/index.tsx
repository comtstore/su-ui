import React from 'react'
import './index.scss'
import cx from 'classnames'
import { LogoProps } from './interface'

class Logo extends React.Component<LogoProps>{
    render(): React.ReactNode {
        return (
            <div 
                className={cx(
                    "logo-container",
                    this.props.className
                )}
            >
                { this.props.src && <img src={this.props.src} alt="logo" />}
                { this.props.custom }
            </div>
        )        
    }
}

export default Logo