import { FileTreeOperartion, FileTreeProps } from "./interface";
import { baseController } from "../../common/common.interface";
import { makeObservable, observable } from "mobx";

class FileTreeController extends baseController<FileTreeProps> {
  public constructor(props: FileTreeProps) {
    super(props);
    makeObservable(this);
  }

  @observable
  public lighting: boolean = false;

  public level: number = -1;

  public onTreeRootContextMenu = (e) => {
    if (
      this.props.disabledOperation?.includes(FileTreeOperartion.CONTEXT_MENU)
    ) {
      return;
    }
    if (e.currentTarget === e.target) {
      this.props.onContextMenu?.({ e, item: null });
    }
  };

  public handleNodeDragover = (e) => {
    if (this.props.disabledOperation?.includes(FileTreeOperartion.DRAG)) {
      return;
    }
    this.props.onDragover?.({
      e,
      item: null,
      instance: this,
    });
  };

  public handleNodeDragleave = (e) => {
    if (this.props.disabledOperation?.includes(FileTreeOperartion.DRAG)) {
      return;
    }
    this.props.onDragleave?.({
      e,
      item: null,
      instance: this,
    });
  };

  public handleNodeDrop = (e) => {
    if (this.props.disabledOperation?.includes(FileTreeOperartion.DRAG)) {
      return;
    }
    this.props.onDrop?.({
      e,
      item: null,
      instance: this,
    });
  };
}

export default FileTreeController;
