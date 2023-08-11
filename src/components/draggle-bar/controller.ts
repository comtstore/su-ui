/* eslint-disable no-unused-vars */
import { DraggleBarProps } from "./interface";
import { baseController} from '../../common/common.interface'
import { action, makeObservable, observable } from "mobx";

const groups: Map<string, Set<DraggleBarController>> = new Map()

class DraggleBarController extends baseController<DraggleBarProps>{
    public constructor(props){
        super(props)
        makeObservable(this)
        this.initialState()
    }

    public initialState = () => {
        this.initialGroup()
    }

    private initialGroup = () => {
        const groupId = this.props.group
        if(groupId){
            let group = groups.get(groupId)
            if(!group){
                group = new Set()
                groups.set(groupId, group)
            }
            group.add(this)
        }
    }

    @observable
    public isDragging: boolean = false

    private groupDo = (doFunc: ((controller: DraggleBarController) => void)) => {
        const groupId = this.props.group
        if(groupId){
            groups.get(groupId)?.forEach(doFunc)
        }
    }

    @action
    public startDragging = () => {
        this.isDragging = true
        this.groupDo(controller => {
            controller.isDragging = true
        })
    }

    @action
    public stopDragging = () => {
        this.isDragging = false
        this.groupDo(controller => {
            controller.isDragging = false
        })
    }

    @action
    public inDragging = (e) => {
        if (this.isDragging) {
            this.props.onDragging?.(e)
        }
    }
}

export default DraggleBarController