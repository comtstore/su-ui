import { ButtonProps } from "./interface";
import { baseController } from "../../common/common.interface";
import { action, makeObservable, observable, reaction } from "mobx";
import { RefObject } from "react";
import { bool } from "prop-types";

class ButtonContoller extends baseController<
  ButtonProps,
  RefObject<HTMLButtonElement>
> {
  public constructor() {
    super();
    makeObservable(this);
  }

  @observable
  public isTriggerred: boolean = false; //是否被触发

  /**
   * 鼠标是否在按钮上
   */
  @observable
  public isMouseover: boolean = false;

  @action
  public onMouseOver = () => {
    this.isMouseover = true;
  };

  @action
  public onMouseLeave = () => {
    this.isMouseover = false;
  };

  @action
  public triggerCallback = (e) => {
    if (!this.ref?.current?.contains(e.target as Node)) {
      this.isTriggerred = false;
    } else {
      this.isTriggerred = true;
    }
  };
}

export default ButtonContoller;
