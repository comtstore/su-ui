import { TabBarItemConfig } from '@components/tab-bar-item/interface'
import { action, makeObservable } from '@comtstore/mobx'
import { baseController } from '../../common/common.interface'
import { TabBarProps } from './interface'

class TabBarController extends baseController<TabBarProps>{
    public constructor(props: TabBarProps){
        super(props)
        makeObservable(this)
    }

    @action
    public onTabClick = (_e: React.MouseEvent, tabItem: TabBarItemConfig) => {
        this.props.onTabClick?.(tabItem)
    }
}

export default TabBarController