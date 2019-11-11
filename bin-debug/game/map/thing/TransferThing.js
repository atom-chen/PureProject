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
/**
 * 传送阵
*/
var TransferThing = (function (_super) {
    __extends(TransferThing, _super);
    function TransferThing() {
        return _super.call(this) || this;
    }
    TransferThing.prototype.init = function (pro) {
        _super.prototype.init.call(this, pro);
        if (this._body == null) {
            this._body = new eui.Image();
            this._body.source = RES_DIR_TRANSFER;
            this.addChild(this._body);
            this._body.x = -55;
            this._body.y = -156;
        }
        this.title.setNameColor(ColorUtil.TITLE_NPC);
    };
    TransferThing.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        // if (this._body) {
        // 	this._body.source = null;
        // 	App.DisplayUtils.removeFromParent(this._body);
        // 	this._body = null;
        // }
    };
    return TransferThing;
}(BaseThing));
__reflect(TransferThing.prototype, "TransferThing");
//# sourceMappingURL=TransferThing.js.map