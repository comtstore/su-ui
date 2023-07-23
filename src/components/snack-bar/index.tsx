import React from 'react'
import { observer } from 'mobx-react'
import './index.scss'
import Alert from '@mui/material/Alert';
import { makeObservable, observable } from 'mobx'
import { InfoConfig } from './interface';
import ReactDOM from 'react-dom';
import { v4 as uuid } from 'uuid'

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
    // eslint-disable-next-line no-unused-vars
    const handleClose = (id: string, closeSuccessFunc?: (index: number) => void) => {
      const index = this.infoList.findIndex(info => info.id === id)
      if(index > -1){
        this.infoList[index].isOpen = false
        this.infoList.splice(index, 1, { ...this.infoList[index] })
        closeSuccessFunc?.(index)
      }
    }

    showConfig.isOpen = showConfig.isOpen ?? true
    showConfig.id = showConfig.id ?? uuid()

    if(showConfig.replaceId){
      handleClose(showConfig.replaceId, (index) => {
        this.infoList.splice(index, 1, showConfig)
      })
    } else {
      this.infoList.push(showConfig)
    }

    if(showConfig.duration){
      setTimeout(() => handleClose(showConfig.id!), showConfig.duration);
    }

    return () => handleClose(showConfig.id!)
  }

  render(): React.ReactNode {
      return (
          <div className='snack-bar-group'>
          {
              this.infoList.map((snackBarItem) => {
                return <>
                  {
                    snackBarItem.isOpen ? 
                    <div key={snackBarItem.id} className='snack-bar-item'>
                      <Alert className='snack-bar-item-alert' severity={snackBarItem.type}>
                        {
                          typeof snackBarItem.content === 'string' ? 
                          <span className='snack-bar-item-alert-content' dangerouslySetInnerHTML={{
                            __html: snackBarItem.content
                          }}></span>
                          : snackBarItem.content
                        }
                      </Alert>
                    </div> : null
                  }
                </>
              })
          }
          </div>
      )
  }
}

export default SnackBar