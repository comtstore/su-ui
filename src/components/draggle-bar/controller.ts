import { DraggleBarProps } from "./interface";
import { baseController} from '../../common/common.interface'
import { action, makeObservable, observable } from "mobx";

class DraggleBarController extends baseController<DraggleBarProps>{
    public constructor(props){
        super(props)
        makeObservable(this)
    }

    @observable
    public isDragging: boolean = false

    @action
    public startDragging = () => {
        this.isDragging = true
    }

    @action
    public stopDragging = () => {
        this.isDragging = false
    }

    @action
    public inDragging = (e) => {
        if (this.isDragging) {
            this.props.onDragging?.(e)
        }
      }
}

export default DraggleBarController