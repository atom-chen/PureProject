/*
 * @Description: 通用分页pannel类,可继承
 * @Author: liangzhaowei
 * @Date: 2019-07-16 15:58:46
 * @LastEditTime: 2019-10-28 16:35:45
 */
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
var CommunalPagePannel = (function (_super) {
    __extends(CommunalPagePannel, _super);
    function CommunalPagePannel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.oldIndex = -1;
        _this.viewDic = {};
        _this.bSetTitleInChile = false; //是否在子类设置窗口名称
        _this.skinName = "CommunalPagePannelSkin";
        return _this;
    }
    CommunalPagePannel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        if (this.isInit) {
            this.addEvent(egret.TouchEvent.CHANGE, this.tabBtn, this.onTabChange);
            this.addEvent(egret.Event.CHANGING, this.tabBtn, this.onTabEvent);
            this.tabBtn.selectedIndex = param ? param.secIndex : 0;
            this.viewProp = param;
            this.onTabChange();
            this.setTabBar();
            /**升级的时候需要刷新 */
            this.message(MsgConst.PROPERTY + PropId.AP_LEVEL, this.setTabBar);
        }
    };
    CommunalPagePannel.prototype.init = function () {
        this.setTabBar();
        /**设置在子类设置标题,父类在切换窗口的时候,就不用重复设置 */
        this.bSetTitleInChile = true;
        // let viewData = this.pannelModuleData[0];
        // if (viewData) {
        // 	let view = App.ViewManager.getView(viewData.viewconst);
        // 	view.bSetTitleInChile = true;
        // }
        /**显示分割线 */
        for (var i = 0; i < 4; i++) {
            this["line" + i].visible = i < (Object.keys(this.pannelModuleData).length - 1);
        }
    };
    CommunalPagePannel.prototype.setTabBar = function () {
        /**icon 列表 */
        var listIcon = [];
        /**pannel列表 */
        var listPanel = [];
        for (var index in this.pannelModuleData) {
            var obj = { icon: "role.png" };
            obj.icon = RES_DIR_PAGEICON + this.pannelModuleData[index].viewIcon;
            if (!App.ViewManager.checkOpenCondition(this.pannelModuleData[index], false)) {
                obj.icon = obj.icon.replace(".png", "_ud.png");
            }
            listIcon.push(obj);
            listPanel.push(this.pannelModuleData[index].module);
        }
        this.setViewData(listIcon, listPanel);
    };
    /**刷新红点 */
    CommunalPagePannel.prototype.refreshRed = function () {
        _super.prototype.refreshRed.call(this);
        if (!this.tabBtn) {
            return;
        }
        for (var i = 0; i < this.tabBtn.numChildren; i++) {
            var moduleNe = this.pannelModuleData[i] ? this.pannelModuleData[i].module : "";
            App.ViewManager.showRedPoint(this.tabBtn.getChildAt(i), App.RedPoint.redViewResult[moduleNe]);
        }
        /**刷新下级红点方法 */
        if (this.tabBtn.selectedIndex >= 0) {
            var view = this.viewDic[this.tabBtn.selectedIndex];
            if (view && view["refreshRed"]) {
                view["refreshRed"]();
            }
        }
    };
    CommunalPagePannel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.close.call(this);
        this.curView && this.curView['close']();
    };
    /**用于阻止点击事件 */
    CommunalPagePannel.prototype.onTabEvent = function (e) {
        var tab = e.target;
        if (this.pannelModuleData[tab.selectedIndex]) {
            var modelData = this.pannelModuleData[tab.selectedIndex];
            if (!App.ViewManager.checkOpenCondition(modelData, true)) {
                e.preventDefault();
                return;
            }
        }
    };
    CommunalPagePannel.prototype.onTabChange = function (e) {
        var selectedIndex = this.tabBtn.selectedIndex;
        if (this.oldIndex != selectedIndex) {
            if (this.curView) {
                this.curView['close']();
                this.curView['visible'] = false;
            }
            this.oldIndex = selectedIndex;
        }
        var view = this.getView(selectedIndex);
        //第一次打开时候e是没有数据的,可以传入viewProp的数据作为下级页签的打开依据
        if (!e) {
            view["open"](this.viewProp);
            /**刚进入的时候刷新红点方法,避免延时显示红点 */
            if (this["refreshRed"]) {
                this["refreshRed"]();
            }
        }
        else {
            view["open"]();
            /**刚进入的时候刷新红点方法,避免延时显示红点 */
            if (this["refreshRed"]) {
                this["refreshRed"]();
            }
        }
        view['visible'] = true;
        this.curView = view;
        /**设置标题 */
        if (this.pannelModuleData[selectedIndex]) {
            var viewData = this.pannelModuleData[selectedIndex];
            var view_1 = App.ViewManager.getView(viewData.viewconst);
            if (view_1 && viewData && viewData.winTitle) {
                view_1.setWinTitle(viewData.winTitle);
            }
            /**帮助按钮 */
            if (view_1 && viewData) {
                view_1.setWinHeleTitle(viewData.helpBtn);
            }
        }
    };
    CommunalPagePannel.prototype.setViewData = function (viewName, viewCl) {
        this.tabBtn.dataProvider = new eui.ArrayCollection(viewName);
        this.viewCl = viewCl;
    };
    CommunalPagePannel.prototype.getView = function (index) {
        var v = this.viewDic[index];
        if (!v) {
            var cl = this.viewCl[index];
            /**将配表中的类名转换成类 */
            if (typeof cl === 'string') {
                cl = window[cl];
            }
            v = new cl();
            if (v && cl.name) {
                v.name = cl.name;
            }
            this.viewDic[index] = v;
            this.viewContent.addChild(v);
            v.width = this.viewContent.width;
            v.height = this.viewContent.height;
        }
        return v;
    };
    return CommunalPagePannel;
}(BaseSpriteView));
__reflect(CommunalPagePannel.prototype, "CommunalPagePannel");
//# sourceMappingURL=CommunalPagePannel.js.map