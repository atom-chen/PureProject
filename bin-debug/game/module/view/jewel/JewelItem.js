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
 * @Description: 宝石面板条目
 * @Author: xiejunwei
 * @Date: 2019-09-10 10:50:29
 * @LastEditTime: 2019-09-11 17:51:29
 */
var JewelItem = (function (_super) {
    __extends(JewelItem, _super);
    function JewelItem() {
        return _super.call(this) || this;
    }
    JewelItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        App.DisplayUtils.addLinkonText(this, this.jName);
    };
    JewelItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data) {
            this.initData();
        }
        else {
            this.cleanData();
        }
    };
    JewelItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    JewelItem.prototype.stateJuge = function (lvl, first) {
        if (first === void 0) { first = false; }
        this.icon.source = "public_json.public_lock_1_png";
        if (first) {
            var str = StringUtils.substitute(Language.lang.jewel_0, lvl);
            this.jName.textFlow = TextFlowUtils.generateTextFlow("<(u)(e_win_COPY#1)(c0x00ff0c)" + str + ">");
            this.jName.visible = true;
            this.blank.visible = true;
        }
        else {
            this.jName.visible = false;
            this.blank.visible = false;
        }
    };
    JewelItem.prototype.initData = function () {
        var item = GameConfig.item[this.data.id];
        var color = ItemUtils.getItemColor(item.showQuality);
        var name = StringUtils.substitute(Language.lang.nameLvl, item.name, this.data.lvl);
        this.jName.visible = true;
        this.blank.visible = true;
        this.jName.textFlow = TextFlowUtils.generateTextFlow("<(c" + color + ")" + name + ">");
        this.icon.source = RES_DIR_IMAGES_ITEM + item.icon + ".png";
    };
    JewelItem.prototype.cleanData = function () {
        this.icon.source = null;
        this.jName.visible = false;
        this.blank.visible = false;
    };
    Object.defineProperty(JewelItem.prototype, "seleted", {
        set: function (val) {
            this.sele.visible = val;
        },
        enumerable: true,
        configurable: true
    });
    return JewelItem;
}(BaseCustComponent));
__reflect(JewelItem.prototype, "JewelItem");
//# sourceMappingURL=JewelItem.js.map