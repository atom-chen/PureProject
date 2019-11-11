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
 * @Description: 主界面副角色列表按钮
 * @Author: guolinsen
 * @Date: 2019-08-28 18:04:51
 * @LastEditTime: 2019-10-25 15:52:33
 */
var MainCreateRoleBtn = (function (_super) {
    __extends(MainCreateRoleBtn, _super);
    function MainCreateRoleBtn() {
        var _this = _super.call(this) || this;
        _this._job = 0;
        _this.index = 1;
        _this.skinName = "MainCreateRoleBtnSkin";
        return _this;
    }
    MainCreateRoleBtn.prototype.init = function () {
        this.addTouchEvent(this, this.onTouch);
    };
    Object.defineProperty(MainCreateRoleBtn.prototype, "job", {
        get: function () {
            return this._job;
        },
        set: function (v) {
            if (v) {
                this.img.source = "zjm_json.zjm_createRole" + v + "_png";
                this.name = "";
            }
            else {
                this.img.source = "zjm_json.zjm_createrole_bg_png";
                this.name = ViewConst[ViewConst.ADVENTURE];
            }
            this._job = v;
        },
        enumerable: true,
        configurable: true
    });
    MainCreateRoleBtn.prototype.onTouch = function () {
        if (this._job == 0) {
            App.ViewManager.open(ViewConst.ADVENTURE);
        }
        else {
            var viewData = new ViewProp();
            viewData.exData1 = this.index;
            App.ViewManager.open(ViewConst.ROLE, viewData);
        }
    };
    return MainCreateRoleBtn;
}(BaseCustComponent));
__reflect(MainCreateRoleBtn.prototype, "MainCreateRoleBtn");
//# sourceMappingURL=MainCreateRoleBtn.js.map