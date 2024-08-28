import { ComponentProps } from "../../common/common.interface";

/**
 * 目前只支持竖着的拖动条
 */
export interface DraggleBarProps extends ComponentProps {
  /**
   * 组，当draggleBar被拖动时，会触发整个组中的所有的draggleBar的拖动事件
   */
  group?: string;
  /**
   * 当被拖动时
   * @param e
   * @returns
   */
  onDragging?: (e) => void;
  /**
   * classes
   */
  classes?: {
    root?: string;
  };
  /**
   * styles
   */
  styles?: {
    root?: React.CSSProperties;
  };
}
