import { ButtonProps } from './interface'
import { baseController} from '../../common/common.interface'
import { action, makeObservable, observable } from 'mobx'

class ButtonContoller extends baseController<ButtonProps>{

    public constructor(props: ButtonProps, ref: any){
        super(props, ref);
        makeObservable(this);
    }
    
    @observable
    public isTriggerred: boolean = false //是否被触发
    
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