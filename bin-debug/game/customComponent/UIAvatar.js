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
 * 界面上显示龙骨模型
*/
var UIAvatar = (function (_super) {
    __extends(UIAvatar, _super);
    function UIAvatar() {
        var _this = _super.call(this) || this;
        _this.body = new ThingBody(_this);
        return _this;
        // if (!DeviceUtils.IsMobile) {
        // 	this.scaleX = this.scaleY = 1.1;
        // }
    }
    UIAvatar.prototype.showMonster = function (id) {
        if (this.pro == null) {
            this.pro = new PropertySet();
        }
        this.pro.kind = ThingKind.Monster;
        this.pro.pro(PropId.AP_BODY_ID, id);
        this.setData(this.pro);
    };
    UIAvatar.prototype.updatePart = function (pPart, id) {
        // let pro = DBPart.PartId[pName];
        this.pro.pro(pPart, id);
        this.refresh();
    };
    UIAvatar.prototype.setData = function (pro) {
        this.pro = pro;
        this.body.init(pro);
        this.body.setStage(true);
        this.body.playAction(ActionStandard.getSpine(ActionStandard.SA_IDLE));
    };
    UIAvatar.prototype.refresh = function () {
        this.body.changeSkin();
    };
    UIAvatar.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.body.onRemove();
    };
    UIAvatar.prototype.$onAddToStage = function (stage, lv) {
        _super.prototype.$onAddToStage.call(this, stage, lv);
        this.body.setStage(true);
    };
    UIAvatar.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        if (this.body) {
            this.body.setStage(false);
        }
    };
    return UIAvatar;
}(BaseCustComponent));
__reflect(UIAvatar.prototype, "UIAvatar");
//# sourceMappingURL=UIAvatar.js.map