import { DraggleBarProps } from "./interface";
import { baseController } from "../../common/common.interface";
import { action, makeObservable, observable } from "mobx";

const groups: Map<string, Set<DraggleBarController>> = new Map();

class DraggleBarController extends baseController<DraggleBarProps> {
  public constructor() {
    super();
    makeObservable(this);
  }

  public groupId: string = "";

  public initialGroup = (groupId) => {
    // 将当前控制器从原来的组删除
    if (this.groupId) {
      const group = groups.get(this.groupId);
      if (group) {
        group.delete(this);
        if (group.size === 0) {
          groups.delete(this.groupId);
        }
      }
    }
    // 添加新控制器
    this.groupId = groupId;
    if (groupId) {
      let group = groups.get(groupId);
      if (!group) {
        group = new Set();
        groups.set(groupId, group);
      }
      group.add(this);
    }
  };

  @observable
  public isDragging: boolean = false;

  private groupDo = (doFunc: (controller: DraggleBarController) => void) => {
    const groupId = this.props.group;
    if (groupId) {
      groups.get(groupId)?.forEach(doFunc);
    }
  };

  @action
  public startDragging = () => {
    this.isDragging = true;
    this.groupDo((controller) => {
      controller.isDragging = true;
    });
  };

  @action
  public stopDragging = () => {
    this.isDragging = false;
    this.groupDo((controller) => {
      controller.isDragging = false;
    });
  };

  @action
  public inDragging = (e) => {
    if (this.isDragging) {
      this.props.onDragging?.(e);
    }
  };
}

export default DraggleBarController;
