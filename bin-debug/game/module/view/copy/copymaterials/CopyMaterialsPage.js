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
 * @Description: 材料副本页面
 * @Author: xiejunwei
 * @Date: 2019-08-21 15:50:38
 * @LastEditTime: 2019-10-28 19:17:36
 */
var CopyMaterialpage = (function (_super) {
    __extends(CopyMaterialpage, _super);
    function CopyMaterialpage($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skinName = "CopyMaterialsPageSkin";
        return _this;
    }
    CopyMaterialpage.prototype.init = function () {
        _super.prototype.init.call(this);
        this.itemList.itemRenderer = CopyMaterialsItem;
    };
    CopyMaterialpage.prototype.open = function (param) {
        this.message(MsgConst.COPY_COUNT, this.initList);
        this.initList();
    };
    CopyMaterialpage.red = function () {
        return GameCache.copy.checkMaterial();
    };
    CopyMaterialpage.changeMsg = function () {
        return [MsgConst.COPY_COUNT];
    };
    CopyMaterialpage.prototype.initList = function () {
        var conf = GameConfig.copyMaterials;
        var arr = [];
        for (var i in conf) {
            arr.push(conf[i]);
        }
        arr = arr.sort(this.sortList);
        this.setListData(this.itemList, arr);
    };
    CopyMaterialpage.prototype.sortList = function (a, b) {
        return a.order > b.order ? 1 : -1;
    };
    return CopyMaterialpage;
}(BaseSpriteView));
__reflect(CopyMaterialpage.prototype, "CopyMaterialpage");
//# sourceMappingURL=CopyMaterialsPage.js.map