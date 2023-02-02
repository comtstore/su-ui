import { ButtonProps } from './interface'
import { baseController} from '../../common/common.interface'
import { action, makeObservable, observable } from 'mobx'

class ButtonContoller extends baseController<ButtonProps>{

    public constructor(props: ButtonProps, ref: any){
        super(props, ref);
        makeObservable(this);
        if(props.onlyShowContentOnHover){
            this.isShowContent = false
        }
    }
    
    @observable
    public isTriggerred: boolean = false //是否被触发

    @observable
    public isShowContent: boolean = true// 是否显示children

    @action
    public onMouseOver = () => {
        if(this.props.onlyShowContentOnHover){
            this.isShowContent = true
        }
    }

    @action
    public onMouseLeave = () => {
        if(this.props.onlyShowContentOnHover){
            this.isShowContent = false
        }
    }
    
    @action
    public triggerCallback = (e) => {
        if(!this.ref?.current?.contains(e.target as Node)){
            this.isTriggerred = false
        }else{
            this.isTriggerred = true
        }
    }
}

export default ButtonContoller