export interface IComponentProps {
  /**
   * className, 只会挂在最外层的组件上
   */
  className?: string;
  /**
   * 最外层组件的样式
   */
  style?: React.CSSProperties;
  /**
   * classes，为各个细节组件添加className
   */
  classes?: {
    [key: string]: any;
  };
  /**s
   * styles, 提供组件内部各个细节组件的样式控制
   */
  styles?: {
    [key: string]: React.CSSProperties;
  };
}

export class baseController<PropsType, RefType> {
  protected props: PropsType | undefined;

  protected ref: RefType | undefined;

  /**
   * 当组件props刷新时，需要重新设置props以防止引用错误
   * @param props
   */
  public updateProps = (props: PropsType): void => {
    this.props = props;
  };

  public updateRef = (ref: RefType): void => {
    this.ref = ref;
  };
}
