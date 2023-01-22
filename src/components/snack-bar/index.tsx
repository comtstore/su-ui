import React from 'react'
import { observer } from 'mobx-react'
import './index.scss'
import Alert from '@mui/material/Alert';
import { makeObservable, observable } from 'mobx'
import { InfoConfig } from './interface';
import ReactDOM from 'react-dom';

@observer
class SnackBar extends React.Component {

  private static instance: SnackBar

  public constructor(props){
    super(props)
    makeObservable(this)
    SnackBar.instance = this
  }

  public static isLoaded: boolean = false

  private static isLoading: boolean = false

  public static show = (showConfig: InfoConfig) => {
    if(!SnackBar.isLoaded){
      SnackBar.load(() => {
        SnackBar.instance.show(showConfig)
      })
    }else {
       SnackBar.instance.show(showConfig)
    }
  }

  public static load = (cb) => {
    if(SnackBar.isLoaded) return
    if(SnackBar.isLoading) return
    SnackBar.isLoading = true
    const snackBarRoot = document.createElement('div')
    snackBarRoot.id = 'snackBar-root'
    document.body.appendChild(snackBarRoot)
    ReactDOM.render(
      <React.StrictMode>
        <SnackBar />
      </React.StrictMode>,
      snackBarRoot,
      () => {
        SnackBar.isLoading = false
        SnackBar.isLoaded = true
        cb()
      }
    );
  }

  @observable
  public infoList: InfoConfig[] = []

  public show = (showConfig: InfoConfig) => {
    showConfig.isOpen = showConfig.isOpen ?? true
    this.infoList.push(showConfig)
    const index: number = this.infoList.length - 1
    if(showConfig.duration){
      setTimeout(() => {
        showConfig.isOpen = false
        this.infoList.splice(index, 1, { ...showConfig })
      }, showConfig.duration);
    }
  }

  render(): React.ReactNode {
      return (
          <div className='snack-bar-group'>
          {
              this.infoList.map((snackBarItem, index) => {
                if(snackBarItem.isOpen){
                  return (
                      <div key={index} className='snack-bar-item'>
                        <Alert severity={snackBarItem.type}>{snackBarItem.content}</Alert>
                      </div>
                  )
                }else {
                  return null
                }
              })
          }
          </div>
      )
  }
}

export default SnackBar