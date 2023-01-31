import { TabBarItemConfig } from '@components/tab-bar-item/interface'
import { action, makeObservable, observable } from 'mobx'
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