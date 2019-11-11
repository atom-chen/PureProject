var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/*
 * @Description:  View基类，继承自egret.Sprite
 * @Author: guolinsen
 * @Date: 2019-06-27 11:50:57
 * @LastEditTime: 2019-10-17 11:32:58
 */
var BaseSpriteView = (function (_super) {
    __extends(BaseSpriteView, _super);
    /**
     * 构造函数
     * @param $controller 所属模块
     * @param $parent 父级
     */
    function BaseSpriteView($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this._resources = null;
        _this.isInit = true;
        return _this;
    }
    /**用于同一处理打开时的操作 */
    BaseSpriteView.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.open.call(this);
    };
    /**
     * 添加到父级
     */
    BaseSpriteView.prototype.addToParent = function () {
        if (this._myParent) {
            this._myParent.addChild(this);
        }
    };
    /**刷新显示类中的角色选择头像中的红点 */
    BaseSpriteView.prototype.refreshRed = function () {
        if (this["roleSelect"] && this["roleSelect"]["setListRed"]) {
            this["roleSelect"].setListRed();
        }
    };
    /**
     * 销毁
     */
    BaseSpriteView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this._myParent = null;
        this._resources = null;
    };
    return BaseSpriteView;
}(BaseEuiComponent));
__reflect(BaseSpriteView.prototype, "BaseSpriteView");
//# sourceMappingURL=BaseSpriteView.js.map