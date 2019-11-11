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
 * @Description: 宝石替换条目
 * @Author: xiejunwei
 * @Date: 2019-09-11 10:52:09
 * @LastEditTime: 2019-10-17 15:26:14
 */
var JewelReplaceItem = (function (_super) {
    __extends(JewelReplaceItem, _super);
    function JewelReplaceItem() {
        var _this = _super.call(this) || this;
        _this.setOrReplace = true;
        return _this;
    }
    JewelReplaceItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.btn, this.btnFunc);
    };
    JewelReplaceItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data.item) {
            this.initData();
        }
    };
    JewelReplaceItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    JewelReplaceItem.prototype.initData = function () {
        // let item: StdItem = GameConfig.item[this.data.id];
        var item = this.data.item;
        var gem = GameConfig.jewel[this.data.id];
        var roleId = GameCache.hero.getRoleIdByIndex(this.data.roleIdx);
        var jewList = GameCache.jewel.roleJewelList[roleId];
        this.item_0.data = item;
        this.iName.text = StringUtils.substitute(Language.lang.nameLvl, item.name, this.data.lvl);
        this.setOrReplace = jewList && jewList[this.data.part] ? false : true;
        this.propList.setData(item.staitcAttrs, [], 0, 0xffc600, 0xffffff);
        // let power = ItemUtils.getZdlByProp(item.staitcAttrs);
        this.zdl.value = this.data.power;
        if (this.data.curType == -1) {
            this.btn.visible = false;
            this.state.visible = true;
            this.state.source = "jewel_json.jewel_cur_png";
        }
        else {
            if ((gem.part == this.data.curType) || !this.data.have) {
                this.state.source = null;
                this.state.visible = false;
                this.btn.visible = true;
            }
            else {
                this.btn.visible = false;
                this.state.visible = true;
                this.state.source = "jewel_json.jewel_haved_png";
            }
        }
    };
    JewelReplaceItem.prototype.btnFunc = function () {
        if (this.setOrReplace) {
            Proxy.jewel.sendSetJewel(this.data.roleIdx, this.data.part, this.data.id);
            App.ViewManager.close(ViewConst.JEWELREPLACE);
        }
        else {
            Proxy.jewel.sendReplace(this.data.roleIdx, this.data.part, this.data.id);
        }
    };
    return JewelReplaceItem;
}(BaseCustComponent));
__reflect(JewelReplaceItem.prototype, "JewelReplaceItem");
//# sourceMappingURL=JewelReplaceItem.js.map