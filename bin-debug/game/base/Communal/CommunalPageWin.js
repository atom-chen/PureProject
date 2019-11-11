/*
    author:lzw
    date:2018/12/18 14:42
    explain:通用分页窗口类,可继承
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
var CommunalPageWin = (function (_super) {
    __extends(CommunalPageWin, _super);
    function CommunalPageWin($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.oldIndex = -1;
        _this.viewDic = {};
        _this.winModuleData = {}; //窗口对应的模块数据
        /**tab 列表icon */
        _this.listIcon = [];
        /**tab 列表panel */
        _this.listPanel = [];
        _this.skinName = "CommunalPageWinSkin";
        return _this;
    }
    /**用于同一处理打开时的操作 */
    CommunalPageWin.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.open.call(this);
        /**刚进入的时候刷新红点方法,避免延时显示红点 */
        if (this["refreshRed"]) {
            this["refreshRed"]();
        }
    };
    CommunalPageWin.prototype.openView = function (param) {
        if (this.isInit) {
            this.addEvent(egret.TouchEvent.CHANGE, this.tabBtn, this.onTabChange);
            this.addEvent(egret.Event.CHANGING, this.tabBtn, this.onTabEvent);
            this.tabBtn.visible = this.viewCl.length > 1; //如果只有一个子项就隐藏切换按钮
            this.tabBtn.selectedIndex = param ? param.firIndex : 0;
            this.viewProp = param;
            this.onTabChange();
        }
        _super.prototype.openView.call(this, param);
    };
    /**刷新红点 */
    CommunalPageWin.prototype.refreshRed = function () {
        for (var i = 0; i < this.tabBtn.numChildren; i++) {
            var pannelNe = this.listPanel[i] ? this.listPanel[i] : "";
            App.ViewManager.showRedPoint(this.tabBtn.getChildAt(i), this.getPanelRedForView(i));
        }
        /**刷新正在显示中的panel的红点方法 */
        if (this.tabBtn.selectedIndex >= 0) {
            var pannel = this.viewDic[this.tabBtn.selectedIndex];
            if (pannel && pannel["refreshRed"]) {
                pannel["refreshRed"]();
            }
        }
    };
    /**获取view中的红点 */
    CommunalPageWin.prototype.getPanelRedForView = function (index) {
        var bRed = false;
        if (this.winModuleData[index]) {
            var pannelList = this.winModuleData[index];
            if (pannelList) {
                for (var item in pannelList) {
                    var modData = pannelList[item];
                    if (modData.pannel) {
                        if (App.RedPoint.redViewResult[modData.pannel] != undefined) {
                            bRed = App.RedPoint.redViewResult[modData.pannel];
                            break;
                        }
                        else {
                            if (App.RedPoint.redViewResult[modData.module]) {
                                bRed = true;
                                break;
                            }
                        }
                    }
                }
            }
        }
        return bRed;
    };
    /**用于创建类 */
    CommunalPageWin.prototype.init = function () {
        var cfg = GameConfig.modControl[ViewConst[this.viewKey]];
        /**icon 列表 */
        this.listIcon = [];
        /**pannel列表 */
        this.listPanel = [];
        for (var index in cfg) {
            var pageIndex = 0;
            var obj = { icon: "role_json.role_index_ud_0_png", icon2: "role_json.role_index_0_png" };
            var pannel = void 0;
            for (var item in cfg[index]) {
                if (cfg[index][item].pannel) {
                    obj.icon = cfg[index][item].pageIcon;
                    obj.icon2 = cfg[index][item].pageIcon2;
                    pageIndex = cfg[index][item].firIndex;
                    pannel = cfg[index][item].pannel;
                    break;
                }
            }
            this.listIcon.push(obj);
            if (pannel) {
                this.listPanel.push(pannel);
            }
            this.winModuleData[pageIndex] = cfg[index];
        }
        this.setViewData(this.listIcon, this.listPanel);
    };
    CommunalPageWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.curView && this.curView['close']();
    };
    /**用于阻止点击事件 */
    CommunalPageWin.prototype.onTabEvent = function (e) {
        var tab = e.target;
        if (this.winModuleData[tab.selectedIndex]) {
            /**与配表约定选取类型中的第一个功能模块作为开启的依据 */
            var pannelData = this.winModuleData[tab.selectedIndex] ? this.winModuleData[tab.selectedIndex][0] : null;
            if (!App.ViewManager.checkOpenCondition(pannelData, true)) {
                e.preventDefault();
                return;
            }
        }
    };
    CommunalPageWin.prototype.onTabChange = function (e) {
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
        // 是否需要显示返回按钮
        this.backGrp && (this.backGrp.visible = true);
        /**设置标题 */
        if (this.winModuleData[selectedIndex]) {
            var viewData = this.winModuleData[selectedIndex][0];
            if (!viewData) {
                return;
            }
            if (viewData.winTitle && !view.bSetTitleInChile) {
                this.setWinTitle(viewData.winTitle);
                this.setWinHeleTitle(viewData.helpBtn);
            }
            // 是否需要显示返回按钮
            this.backGrp && (this.backGrp.visible = viewData.showBackBTN > 0);
        }
    };
    CommunalPageWin.prototype.setViewData = function (viewName, viewCl) {
        if (viewName.length) {
            this.tabBtn.dataProvider = new eui.ArrayCollection(viewName);
            this.tabBtn.validateNow();
        }
        if (viewCl.length) {
            this.viewCl = viewCl;
        }
    };
    CommunalPageWin.prototype.getView = function (index) {
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
            v.pannelModuleData = this.winModuleData[index];
            this.viewDic[index] = v;
            this.viewContent.addChild(v);
        }
        return v;
    };
    return CommunalPageWin;
}(BaseEuiWindow));
__reflect(CommunalPageWin.prototype, "CommunalPageWin");
//# sourceMappingURL=CommunalPageWin.js.map