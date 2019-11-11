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
 * @Description: 欢迎界面
 * @Author: guolinsen
 * @Date: 2019-09-23 15:22:53
 */
var NoviceWelcomeView = (function (_super) {
    __extends(NoviceWelcomeView, _super);
    function NoviceWelcomeView() {
        return _super.call(this) || this;
    }
    NoviceWelcomeView.prototype.open = function () {
        _super.prototype.open.call(this);
        this.addTouchEvent(this, this.onTouch);
    };
    NoviceWelcomeView.prototype.onTouch = function () {
        this.closeView();
    };
    NoviceWelcomeView.prototype.close = function () {
        _super.prototype.close.call(this);
        GameCache.quest.autoQuest();
    };
    return NoviceWelcomeView;
}(BaseEuiWindow));
__reflect(NoviceWelcomeView.prototype, "NoviceWelcomeView");
//# sourceMappingURL=NoviceWelcomeView.js.map