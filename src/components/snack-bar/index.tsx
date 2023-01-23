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

  public static show = (showConfig: InfoConfig): Promise<() => void> => {
    return new Promise((resolve) => {
      if(!SnackBar.isLoaded){
        SnackBar.load(() => {
          resolve(SnackBar.instance.show(showConfig))
        })
      }else {
         resolve(SnackBar.instance.show(showConfig))
      }
    })
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

  public show = (showConfig: InfoConfig): () => void => {
    showConfig.isOpen = showConfig.isOpen ?? true
    this.infoList.push(showConfig)
    const index: number = this.infoList.length - 1

    const handleClose = () => {
      showConfig.isOpen = false
      this.infoList.splice(index, 1, { ...showConfig })
    }

    if(showConfig.duration){
      setTimeout(handleClose, showConfig.duration);
    }

    return handleClose
  }

  render(): React.ReactNode {
      return (
          <div className='snack-bar-group'>
          {
              this.infoList.map((snackBarItem, index) => {
                if(snackBarItem.isOpen){
                  return (
                      <div key={index} className='snack-bar-item'>
                        <Alert className='snack-bar-item-alert' severity={snackBarItem.type}>
                          <span className='snack-bar-item-alert-content' dangerouslySetInnerHTML={{
                            __html:  snackBarItem.content
                          }}></span>
                        </Alert>
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