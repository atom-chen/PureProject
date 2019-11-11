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
 * @Description: 窗口层
 * @Author: guolinsen
 * @Date: 2019-09-18 20:08:06
 */
var UIWinLayer = (function (_super) {
    __extends(UIWinLayer, _super);
    function UIWinLayer(param) {
        var _this = this;
        if (DeviceUtils.IsPC) {
            _this = _super.call(this, param) || this;
        }
        else {
            _this = _super.call(this) || this;
            _this.numShow++;
            _this.bg = new eui.Image();
            _this.bg.source = RES_DIR_IMAGES + "phoneUIBg.jpg";
            _this.bg.width = App.StageUtils.getWidth();
            _this.bg.height = App.StageUtils.getHeight();
            _this.addChild(_this.bg);
            _this.visible = false;
        }
        return _this;
    }
    return UIWinLayer;
}(BaseEuiLayer));
__reflect(UIWinLayer.prototype, "UIWinLayer");
//# sourceMappingURL=UIWinLayer.js.map