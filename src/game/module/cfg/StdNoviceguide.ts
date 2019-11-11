class StdNoviceguide { 
    /** 字段名 */
    id: number;
    /** 引导步骤 */
    step: number;
    /** 完成条件 */
    command: any[] = [];
    /** 所在窗口 */
    targetView: any[] = [];
    /** 指向标签的提示 */
    targetViewText: any[] = [];
    /** 完成标志 */
    isComplete: number;
    /** 操作对象 */
    targetEle: string;
    /** 提示文字 */
    text: string;
    /** 方向，看图 */
    dir: number;
    /** 显示图层 */
    layer: string;
    /** 坐标偏移 */
    offset: any[] = [];
}