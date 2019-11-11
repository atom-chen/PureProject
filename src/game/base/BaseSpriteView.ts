/*
 * @Description:  View基类，继承自egret.Sprite
 * @Author: guolinsen
 * @Date: 2019-06-27 11:50:57
 * @LastEditTime: 2019-10-17 11:32:58
 */
class BaseSpriteView extends BaseEuiComponent {
    private _resources: string[] = null;

    /**
     * 构造函数
     * @param $controller 所属模块
     * @param $parent 父级
     */
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.isInit = true;
    }


    /**用于同一处理打开时的操作 */
    public open(param: any = null) {
        super.open();

    }

    /**
     * 添加到父级
     */
    public addToParent(): void {
        if (this._myParent) {
            this._myParent.addChild(this);
        }
    }

    /**刷新显示类中的角色选择头像中的红点 */
    public refreshRed() {
        if (this["roleSelect"] && this["roleSelect"]["setListRed"]) {
            this["roleSelect"].setListRed();
        }
    }

    /**
     * 销毁
     */
    public destroy(): void {
        super.destroy();
        this._myParent = null;
        this._resources = null;
    }


}
