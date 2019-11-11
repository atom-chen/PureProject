/*
 * @Description:自定义控件
 * @Author: guolinsen
 * @Date: 2019-08-15 15:16:16
 * @LastEditTime: 2019-09-19 15:00:33
 */
class BaseCustComponent extends eui.ItemRenderer {
    public className = "@逻辑类名";

    public constructor() {
        super();
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.init();
    }

    protected init(): void {

    }

    private event = [];


    /* 添加listView子项点击事件回调 */
    public addItemClick(target: egret.DisplayObject, func: Function): void {
        this.addEvent(eui.ItemTapEvent.ITEM_TAP, target, func)
    }

    /**控件添加一个点击事件 */
    public addTouchEvent(obj: any, func: Function) {
        this.addEvent(egret.TouchEvent.TOUCH_TAP, obj, func);
    }

    /**控件添加一个事件 */
    public addEvent(ev: string, obj: any, func: Function) {
        if (!obj) {
            return;
            //throw new Error(obj + "不存在绑定对象");
        }
        obj.addEventListener(ev, func, this);
        this.event.push([ev, func, obj]);
    }

    /**移除所有事件 */
    protected removeAllEvent() {
        for (let ev of this.event) {
            ev[2].removeEventListener(ev[0], ev[1], this);
        }
        this.event = [];
        App.MessageCenter.removeAll(this);
        App.TimerManager.removeAll(this);
    }

    public dispose(): void {
        this.removeAllEvent();
        this.disposeChildren(this);
    }

    /*刷新list数据*/
    public setListData(list: eui.List, data: any[]): void {
        let dp = list.dataProvider as eui.ArrayCollection;
        dp ? dp.source = data : list.dataProvider = new eui.ArrayCollection(data);
    }

    private disposeChildren(dis): void {
        if (!dis.numChildren) {
            return;
        }
        let len = dis.numChildren;
        let child;
        while (len) {
            len--;
            child = dis.removeChildAt(0);
            if (child instanceof eui.Image && child.texture) {
                (child as eui.Image).source = null;
            }
            if (child["stop"]) {
                child["stop"]();
            }
            if (child["dispose"]) {
                child["dispose"]();
            }
            // App.RedPoint.remove(child.hashCode);
            this.disposeChildren(child);
        }
    }
}