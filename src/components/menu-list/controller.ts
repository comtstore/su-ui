import { action, makeObservable } from '@comtstore/mobx'
import { baseController } from '../../common/common.interface'
import { MenuListProps, MenuListItem } from "./interface"

class MenuListController extends baseController<MenuListProps>{
    public constructor(props: MenuListProps){
        super(props)
        makeObservable(this)
    }

    @action
    public onItemClick = (item: MenuListItem) => {
        this.props.onItemClick?.(item)
    }
}

export default MenuListController