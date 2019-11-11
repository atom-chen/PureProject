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
 * @Description: 滑动选择模块
 * @Author: liangzhaowei
 * @Date: 2019-08-13 16:03:47
 * @LastEditTime: 2019-08-15 19:10:51
 */
var SlidePage = (function (_super) {
    __extends(SlidePage, _super);
    function SlidePage() {
        var _this = _super.call(this) || this;
        _this.listGroup = [];
        _this.activeSlideLen = 10;
        _this.page = 0;
        _this.skinName = "SlidePageSkin";
        return _this;
    }
    SlidePage.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = ItemBase;
        App.DisplayUtils.slideContent(this.gTouch, this.moveAct, this);
        App.DisplayUtils.slideContent(this, this.moveAct, this);
    };
    SlidePage.prototype.moveAct = function (nLenght) {
        if (nLenght > this.activeSlideLen) {
            if (this.page > 0) {
                this.page = this.page - 1;
            }
            this.setList();
        }
        else if (nLenght < -this.activeSlideLen) {
            if (this.page < this.listGroup.length - 1) {
                this.page = this.page + 1;
            }
            this.setList();
        }
    };
    /**listItem 物品列表  showNum 每行显示数量*/
    SlidePage.prototype.setData = function (listItem, showNum, gap) {
        if (showNum === void 0) { showNum = 3; }
        if (gap === void 0) { gap = 10; }
        this.listGroup = [];
        for (var i = 0, len = listItem.length; i < len; i += showNum) {
            this.listGroup.push(listItem.slice(i, i + showNum));
        }
        var listTagImg = [];
        for (var i_1 = 0; i_1 < this.listGroup.length; i_1++) {
            var obj = { icon: "public_json.public_page_bg_png", icon2: "public_json.public_page_sl_png" };
            listTagImg.push(obj);
        }
        this.tabBtn.dataProvider = new eui.ArrayCollection(listTagImg);
        this.list.layout["gap"] = gap;
        this.setList();
        this.tabBtn.visible = this.listGroup.length > 1;
    };
    /**刷新列表 */
    SlidePage.prototype.setList = function () {
        this.tabBtn.selectedIndex = this.page;
        this.setListData(this.list, this.listGroup[this.page]);
    };
    return SlidePage;
}(BaseCustComponent));
__reflect(SlidePage.prototype, "SlidePage");
//# sourceMappingURL=SlidePage.js.map