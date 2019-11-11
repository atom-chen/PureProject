/**
 * View基类接口
 */
interface IBaseWinView {
    // /**
    //  * 是否已经初始化
    //  * @returns {boolean}
    //  */
    // isInit():boolean;


    /**
     *对面板进行内容初始化，用于子类继承
     *
     */
    initUI(): void;

    /**
     * 刷新数据，用于子类继承
     */
    refreshData(): void;


    /**
     * 刷新面板内容，用于子类继承
     */
    refreshView(): void;



    /**
     * 面板是否显示
     * @return
     *
     */
    isShow():boolean;

    /**
     * 添加到父级
     */
    addToParent():void;

    /**
     * 从父级移除
     */
    removeFromParent():void;

    // /**
    //  *对面板进行显示初始化，用于子类继承
    //  *
    //  */
    // initUI():void;

    // /**
    //  *对面板数据的初始化，用于子类继承
    //  *
    //  */
    // initData():void;

    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    open(param:ViewProp):void;

    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    close(...param:any[]):void;

    /**
     * 销毁
     */
    destroy():void;

    /**
     * 设置是否隐藏
     * @param value
     */
    setVisible(value:boolean):void;

    // /**
    //  * 设置初始加载资源
    //  * @param resources
    //  */
    // setResources(resources:string[]):void;

    // /**
    //  * 分模块加载资源
    //  */
    // loadResource(loadComplete:Function, initComplete:Function):void;
}