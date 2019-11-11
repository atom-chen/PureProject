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
 * create by junwei on 07/29/2019
 *  时装面板
 */
var FashionPannel = (function (_super) {
    __extends(FashionPannel, _super);
    function FashionPannel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.fashionBag = {};
        _this.tabIndex_0 = 0;
        _this.tabindex_1 = 0;
        _this.arr = [["AP_HAT", "AP_HAIR", "AP_EYE", "AP_GLASSES"],
            ["AP_BODY_ID", "AP_PANTS", "AP_WEAPON", "AP_ASSIST"],
            ["AP_SWING", "AP_BACK"]];
        _this.skinName = "FashionPannelSkin";
        return _this;
    }
    FashionPannel.prototype.init = function () {
        this.itemList.itemRenderer = FashionItem;
        var hander = Handler.create(this, this.onCLick, [], false);
        this.roleSelect.handler = hander;
        this.initTypeData();
    };
    FashionPannel.prototype.open = function (viewProp) {
        this.message(MsgConst.FASHION_TRY, this.initTab);
        this.message(MsgConst.FASHION_GET, this.onCLick);
        this.message(MsgConst.EQUIP_ATTR_CHANGE, this.onCLick);
        this.message(MsgConst.FASHION_INFO, this.onCLick);
        this.message(MsgConst.FASHION_DELETE, this.onCLick);
        this.addTouchEvent(this.tabBtn_0, this.initTab);
        this.addTouchEvent(this.tabBtn_1, this.initList);
        this.addTouchEvent(this.sBtn, this.saveFunc);
        this.tabBtn_0.selectedIndex = this.tabBtn_1.selectedIndex = 0;
        this.onCLick();
    };
    FashionPannel.prototype.onCLick = function () {
        GameCache.fashion.role = this.roleSelect.nSlRole;
        GameCache.fashion.dish = {}; // 切换角色清空试穿列表
        this.intiRole();
        this.initTab();
    };
    FashionPannel.prototype.initTab = function () {
        this.tabIndex_0 = this.tabBtn_0.selectedIndex;
        var type = this.arr[this.tabIndex_0];
        var arr = [];
        for (var i = 0; i < type.length; i++) {
            var data = {
                icon: "fashion_json.fashion_" + type[i] + "_png",
                icon2: "fashion_json.fashion_" + type[i] + "_s_png",
            };
            arr.push(data);
        }
        this.tabBtn_1.dataProvider = new eui.ArrayCollection(arr);
        this.initList();
        this.initFashion();
    };
    // 初始化类型数据
    FashionPannel.prototype.initTypeData = function () {
        var conf = GameConfig.fashion;
        for (var i in conf) {
            var item = conf[i];
            if (!this.fashionBag[item.part])
                this.fashionBag[item.part] = [];
            this.fashionBag[item.part].push(item);
        }
    };
    //初始化时装列表
    FashionPannel.prototype.initList = function () {
        var type_0 = this.tabBtn_0.selectedIndex;
        var type_1 = this.tabBtn_1.selectedIndex > this.arr[type_0].length - 1 ? 0 : this.tabBtn_1.selectedIndex;
        var type = PropId[this.arr[type_0][type_1]];
        var arr = this.fashionBag[type] ? this.fashionBag[type] : [];
        var arr_0 = [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item.conds[0].value == this.roleSelect.job || item.conds[0].value == 0)
                arr_0.push(item);
        }
        this.setListData(this.itemList, arr_0);
    };
    //显示角色已装备时装item
    FashionPannel.prototype.initFashion = function () {
        var type_0 = this.tabBtn_0.selectedIndex;
        var arr = this.arr[type_0];
        var fashionData = GameCache.fashion.roleFashionData[this.roleSelect.roleId];
        var pro = GameCache.fashion.tempProp;
        this.mModel.refresh();
        for (var i = 0; i < 4; i++) {
            if (arr[i]) {
                var type = PropId[arr[i]];
                this["item_" + i].visible = true;
                var item = GameCache.fashion.dish[type];
                !item && (item = fashionData && fashionData[type] ? fashionData[type] : null);
                if (item) {
                    this["item_" + i].data = item;
                }
                else {
                    this["item_" + i].reSet();
                    this["item_" + i].initPartImg(arr[i]);
                }
            }
            else {
                this["item_" + i].visible = false;
            }
        }
    };
    FashionPannel.prototype.intiRole = function () {
        GameCache.fashion.tempProp = GameCache.hero.list[this.roleSelect.nSlRole].pro.clone();
        this.mModel.setData(GameCache.fashion.tempProp);
    };
    FashionPannel.prototype.saveFunc = function () {
        GameCache.fashion.saveFunc(this.roleSelect.nSlRole);
    };
    FashionPannel.prototype.openCoordinate = function () {
        var view = new ViewProp();
        view.exData1 = this.roleSelect.job;
        App.ViewManager.open(ViewConst.COORDINATE, view);
    };
    return FashionPannel;
}(BaseSpriteView));
__reflect(FashionPannel.prototype, "FashionPannel");
//# sourceMappingURL=FashionPannel.js.map