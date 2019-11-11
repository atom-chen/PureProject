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
var NPCThing = (function (_super) {
    __extends(NPCThing, _super);
    function NPCThing() {
        return _super.call(this) || this;
    }
    NPCThing.prototype.init = function (pro) {
        var con = GameConfig.npc[pro.pro(PropId.AP_BODY_ID)];
        if (!con) {
            throw ("npc配置没找到," + pro.pro(PropId.AP_BODY_ID));
        }
        if (this._body == null) {
            this._body = new eui.Image();
            this.addChild(this._body);
        }
        this._body.source = RES_DIR_NPC_BODY + con["modelid"] + ".png";
        this._body.x = con["offx"];
        this._body.y = con["offy"];
        pro.charName = con["name"];
        _super.prototype.init.call(this, pro);
        this.title.setNameColor(ColorUtil.TITLE_NPC);
    };
    NPCThing.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._body) {
            this._body.source = null;
            App.DisplayUtils.removeFromParent(this._body);
            this._body = null;
        }
    };
    Object.defineProperty(NPCThing.prototype, "npcid", {
        get: function () {
            return this.pro.pro(PropId.AP_BODY_ID);
        },
        enumerable: true,
        configurable: true
    });
    return NPCThing;
}(BaseThing));
__reflect(NPCThing.prototype, "NPCThing");
//# sourceMappingURL=NPCThing.js.map