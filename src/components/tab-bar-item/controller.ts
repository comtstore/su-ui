import { action, makeObservable, observable } from "mobx";
import { baseController } from "../../common/common.interface";
import { TabBarItemProps } from "./interface";

class TabBarItemController extends baseController<TabBarItemProps> {
  public constructor(props: TabBarItemProps) {
    super(props);
    makeObservable(this);
  }

  @observable
  public isBtnMouseover: boolean = false;

  @observable
  public isMouseover: boolean = false;

  @action
  public handleChangeIsMouseover = (newValue: boolean) => {
    this.isMouseover = newValue;
  };

  @action
  public handleChangeIsBtnMouseover = (newValue: boolean) => {
    this.isBtnMouseover = newValue;
  };
}

export default TabBarItemController;
