export type ComponentProps = {
    /**
     * className, 只会挂在最外层的组件上
     */
    className?: string
    /**
     * classes，为各个细节组件添加className
     */
    classes?: {
        [key: string]: any
    },
    /**
     * 最外层组件的样式
     */
    style?: {
        [key: string]: any
    }
    /**s
     * styles, 提供组件内部各个细节组件的样式控制
     */
    styles?: {
        [ key: string ]: any
    }
}

export class baseController<T> {

    protected props: T

    protected ref: any

    constructor(props: T, ref?: any){
        this.props = props
        this.ref = ref
    }

    
}