import { FileTreeItem, FileTreeNodeProps, FileTreeOperartion } from "./interface";
import { baseController} from '../../common/common.interface'
import { action, computed, makeObservable, observable } from 'mobx'

class FileTreeNodeController extends baseController<FileTreeNodeProps>{

    public constructor(props: FileTreeNodeProps){
        super(props);
        makeObservable(this);
    }

    @computed
    public get itemChildren(){
        return this.props.itemChildren ?? 'children'
    }

    @computed
    public get level(): number{
        return this.props.level ?? 0
    }

    @computed
    public get disabled(): Array<FileTreeItem>{
        return this.props.disabled ?? []
    }

    @computed
    public get disableLeaf(): boolean{
        return this.props.disableLeaf ?? false
    }

    @computed
    public get itemType(): string {
        return this.props.itemType ?? 'type'
    }

    @computed
    public get itemLabel(): string {
        return this.props.itemLabel ?? 'name'
    }

    @computed
    public get folderType(): string {
        return this.props.folderType ?? 'folder'
    }

    @computed
    public get isDisabled(): boolean{
        return this.disabled.includes(this.props.item) ||
        (!!this.props.disableLeaf && this.props.item[this.itemType] !== this.folderType)
    }

    @computed
    public get open(): Array<FileTreeItem>{
        return this.props.open ?? []
    }

    @computed
    public get isOpen () {
        return this.open.includes(this.props.item)
    }

    @computed
    public get active(){
        return this.props.active ?? []
    }

    @computed
    public get isActive () {
        return this.active.includes(this.props.item)
    }

    /**
     * 左上角箭头点击
     */
    public handleArrowClick = () => {
        const index = this.open.findIndex(item => item === this.props.item)
        if(index > -1){
            this.open.splice(index, 1)
        }else{
            this.open.push(this.props.item)
        }
    }

    /**
     * 节点点击
     */
    public handleTreeNodeClick = (e) => {
        if(this.isDisabled) return
        this.props.onTreeNodeClick?.({
            item: this.props.item,
            e
        })
    }

    public handleTreeNodeConTextMenu = (e) => {
        if(this.isDisabled) return
        this.props.onContextMenu?.({
            item: this.props.item,
            e
        })
    }

    @observable
    public lighting: boolean = false

    public handleNodeDragstart = (e) => {
        if(this.isDisabled){ return }
        if(this.props.disabledOperation?.includes(FileTreeOperartion.DRAG)){ return }
        this.props.onDragstart?.({
            e,
            item: this.props.item,
            instance: this
        })
    }

    public handleNodeDragover = (e) => {
        if(this.isDisabled){ return }
        if(this.props.disabledOperation?.includes(FileTreeOperartion.DRAG)){ return }
        this.props.onDragover?.({
            e,
            item: this.props.item,
            instance: this
        })
    }

    public handleNodeDragleave = (e) => {
        if(this.isDisabled){ return }
        if(this.props.disabledOperation?.includes(FileTreeOperartion.DRAG)){ return }
        this.props.onDragleave?.({
            e,
            item: this.props.item,
            instance: this
        })
    }

    public handleNodeDrop = (e) => {
        if(this.isDisabled){ return }
        if(this.props.disabledOperation?.includes(FileTreeOperartion.DRAG)){ return }
        this.props.onDrop?.({
            e,
            item: this.props.item,
            instance: this
        })
    }
}

export default FileTreeNodeController