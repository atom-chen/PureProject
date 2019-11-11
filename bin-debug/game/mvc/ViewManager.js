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
 * @Description: 窗口管理器
 * @Author: liangzhaowei
 * @Date: 2019-08-13 10:06:31
 */
var ViewManager = (function (_super) {
    __extends(ViewManager, _super);
    /**
     * 构造函数
     */
    function ViewManager() {
        var _this = _super.call(this) || this;
        /**映射类*/
        _this._viewCl = {};
        _this._viewCl = {};
        _this._views = {};
        _this._opens = [];
        _this._opened = {};
        return _this;
    }
    ViewManager.prototype.register = function (type, cl) {
        this._viewCl[type] = cl;
    };
    /**
     * 清空处理
     */
    ViewManager.prototype.clear = function () {
        this.closeAll();
        this._views = {};
    };
    /**
     * 销毁一个面板
     * @param key 唯一标识
     * @param newView 新面板
     */
    ViewManager.prototype.destroy = function (key) {
        var view = this._views[key];
        if (view) {
            view.destroy();
            delete this._views[key];
            view = null;
            true && console.log("销毁窗口", this.getViewCl(key));
        }
    };
    ViewManager.prototype.destroyView = function () {
        var views = this._views;
        var opens = this._opens;
        for (var key in views) {
            var view = views[key];
            if (opens.indexOf(parseInt(key)) == -1) {
                if (view["addDelayDestroy"]) {
                    view["addDelayDestroy"]();
                }
            }
        }
    };
    /**
     * 开启面板，并跳转到指定标签
     * @param key 面板唯一标识
     * @param index1 标签1
     * @param index2 标签2
    */
    ViewManager.prototype.openTab = function (key, index1, index2) {
        var param;
        if (index1 || index2) {
            param = new ViewProp();
            param.firIndex = index1;
            param.secIndex = index2;
        }
        this.open(key, param);
    };
    /**
     * 开启面板
     * @param key 面板唯一标识
     * @param param 参数
     *
     */
    ViewManager.prototype.open = function (key, param) {
        if (param === void 0) { param = null; }
        if (!this.checkWin(key, true)) {
            return;
        }
        /**直接打开模块的时候,检测是否开启并提示 */
        if (key && param) {
            var cmpKey = "";
            if (typeof key != 'string') {
                cmpKey = ViewConst[key];
            }
            var firIndex = param.firIndex || 0;
            var secIndex = param.secIndex || 0;
            if (GameConfig.modControl[cmpKey]) {
                var cfgMod = GameConfig.modControl[cmpKey][firIndex][secIndex];
                if (cfgMod) {
                    if (!this.checkOpenCondition(cfgMod, true)) {
                        return;
                    }
                }
            }
        }
        if (typeof key == "string") {
            key = parseInt(key) || ViewConst[key];
        }
        // 特殊处理家族
        if (key == ViewConst.FAMILY) {
            if (!GameCache.family.isInFamily) {
                key = ViewConst.FAMILY_LIST;
            }
        }
        var view = this.getView(key);
        if (view == null) {
            //Log.trace("UI_" + key + "不存在");
            return;
        }
        if (!view.isShow()) {
            //只能打开一个窗口
            if (view.myParent == LayerManager.UI_Win && key < ViewConst.CLOSEALLWIN) {
                this.closeAll();
            }
            view.addToParent.call(view, param);
            view.openView.call(view, param);
        }
        else {
            view.resetOpen(param);
            return view;
        }
        //如果是UI层，强制居中
        if (view.myParent == LayerManager.UI_Win ||
            view.myParent == LayerManager.UI_Tips ||
            view.myParent == LayerManager.UI_TipsNoClick) {
            view.horizontalCenter = 0;
            view.verticalCenter = 0;
        }
        if (this._opens.indexOf(key) == -1) {
            this._opens.push(key);
        }
        if (DeviceUtils.IsMobile && key < ViewConst.GAME_WORLD) {
            this.close(ViewConst.GAME_WORLD);
            // this.close(ViewConst.MAIN_UI);
            LayerManager.UI_Main.visible = false;
        }
        return view;
    };
    /**记录需要重新打开的界面信息 */
    ViewManager.prototype.recoredWin = function (key, firIndex, secIndex) {
        if (firIndex === void 0) { firIndex = 0; }
        if (secIndex === void 0) { secIndex = 0; }
        if (typeof key != "string") {
            key = ViewConst[key];
        }
        if (!this.backOpen) {
            this.backOpen = new ViewProp();
        }
        this.backOpen.key = key;
        this.backOpen.firIndex = firIndex;
        this.backOpen.secIndex = secIndex;
    };
    /**
     * 关闭面板
     * @param key 面板唯一标识
     * @param param 参数
     * 返回关闭的界面是否是打开的
     */
    ViewManager.prototype.close = function (key, param) {
        if (param === void 0) { param = null; }
        if (typeof key == "string") {
            key = parseInt(key) || ViewConst[key];
        }
        if ((key != this.backOpen) && this.backOpen) {
            this.backOpen = null;
        }
        if (!this.isShow(key)) {
            return;
        }
        var view = this.getView(key);
        if (view == null) {
            return;
        }
        var viewIndex = this._opens.indexOf(key);
        if (viewIndex >= 0) {
            this._opens.splice(viewIndex, 1);
        }
        view.removeFromParent();
        view.close.call(view, param);
        var showSCENE = true;
        for (var _i = 0, _a = this._opens; _i < _a.length; _i++) {
            var e = _a[_i];
            if (e < ViewConst.GAME_WORLD) {
                showSCENE = false;
                break;
            }
        }
        if (DeviceUtils.IsMobile && showSCENE) {
            this.open(ViewConst.GAME_WORLD);
            // this.open(ViewConst.MAIN_UI);
            LayerManager.UI_Main.visible = true;
        }
        //关闭的时候也要记录当前的窗口
        if (typeof ViewConst[key] == "string") {
            this.recordOpenWin(ViewConst[key]);
        }
        return true;
    };
    ViewManager.prototype.recordOpenWin = function (key) {
        //记录已经打开过的窗口
        if (!this._opened[key]) {
            this._opened[key] = true;
        }
    };
    ViewManager.prototype.toggle = function (key, param) {
        if (param === void 0) { param = null; }
        if (typeof key == "string") {
            key = parseInt(key) || ViewConst[key];
        }
        if (!this.isShow(key)) {
            this.open.call(this, key, param);
        }
        else {
            this.close.call(this, key, param);
        }
    };
    /**
     * 根据唯一标识获取一个UI对象
     * @param key
     * @returns {any}
     */
    ViewManager.prototype.getView = function (key) {
        if (typeof key == "string") {
            if (key.indexOf("#") != -1) {
                key = key.split("#")[0];
            }
            key = parseInt(key) || ViewConst[key];
        }
        var bv = this._views[key];
        if (bv) {
            return bv;
        }
        var cl = this._viewCl[key];
        if (cl) {
            bv = new cl();
            bv["viewKey"] = key;
            this._views[key] = bv;
        }
        return bv;
    };
    /**根据key获取映射类,只是获取映射类名称,并不会创建实例 */
    ViewManager.prototype.getViewCl = function (key) {
        return this._viewCl[key];
    };
    /**记录需要重新打开的界面信息 */
    ViewManager.prototype.openParm = function (key, parm1, parm2) {
        var param;
        param = new ViewProp();
        param.exData1 = parm1;
        param.exData2 = parm2;
        this.open(key, param);
    };
    /**
     * 关闭所有开启中的UI
     * @param 是否只是关闭win窗口
     */
    ViewManager.prototype.closeAll = function (isWin) {
        if (isWin === void 0) { isWin = true; }
        var len = this._opens.length;
        while (len) {
            len--;
            var ui = this.getView(this._opens[len]);
            if (isWin && ui.myParent == LayerManager.UI_Win) {
                this.close(this._opens[len]);
            }
            else if (!isWin && (ui.myParent != LayerManager.UI_Main && ui.myParent != LayerManager.UI_Main2)) {
                this.close(this._opens[len]);
            }
        }
    };
    /**
     * 当前ui打开数量
     * @returns {number}
     */
    ViewManager.prototype.currOpenNum = function () {
        return this._opens.length;
    };
    /**
     * 检测一个UI是否开启中
     * @param key
     * @returns {boolean}
     */
    ViewManager.prototype.isShow = function (key) {
        return this._opens.indexOf(key) != -1;
    };
    //是否已经打开过了, 为了与红点对应, !!! 未打开过的返回 true 
    ViewManager.prototype.bOpened = function (key, index) {
        if (index === void 0) { index = 0; }
        var str = index == 0 ? ViewConst[key] : ViewConst[key] + "#" + index;
        return this._opened[str] ? false : true;
    };
    /***********************红点***************************************** */
    /**根据窗口名称检测对应红点  winName 窗口名称 changeMsgList 间隔时间内改变的消息队列 */
    ViewManager.prototype.getRedByWinName = function (winName, changeMsgList, bReturn) {
        if (bReturn === void 0) { bReturn = true; }
        var cfg = GameConfig.modControl[winName];
        if (cfg) {
            /**不符合条件直接返回 */
            if (!this.checkWin(winName)) {
                return false;
            }
            for (var index in cfg) {
                var pannel = cfg[index];
                for (var page in pannel) {
                    var viewObj = pannel[page];
                    if (this.getRedByViewName(viewObj, changeMsgList)) {
                        if (bReturn) {
                            return true;
                        }
                    }
                }
            }
        }
        else {
            if (typeof winName == "string") {
                winName = parseInt(winName) || ViewConst[winName];
            }
            var view = App.ViewManager.getViewCl(winName);
            return this.getRedByViewFun(view, changeMsgList, [], winName);
        }
        return false;
    };
    /**根据界面中的红点方法以及相关消息列表获取红点结果 */
    /**view 红点方法界面 changeMsgList 需要刷新的消息列表   redItemIdList 配表中需要对应系统需要刷新的物品id*/
    ViewManager.prototype.getRedByViewFun = function (view, changeMsgList, redItemIdList, winName) {
        if (redItemIdList === void 0) { redItemIdList = []; }
        var res = false;
        if (view && view["red"]) {
            /**当前帧是否已经刷新过此界面 */
            if (App.RedPoint.redViewCycleResult[winName] == undefined) {
                /**存在需要刷新的列表 */
                if (view["changeMsg"]) {
                    var viewList = [];
                    if (redItemIdList && redItemIdList.length) {
                        viewList = view["changeMsg"]().concat(redItemIdList);
                    }
                    else {
                        viewList = view["changeMsg"]();
                    }
                    /**是否能找到需要刷新红点的消息 */
                    var bFindChangeMsg = false;
                    for (var index in viewList) {
                        var msg = viewList[index];
                        if (changeMsgList[msg]) {
                            bFindChangeMsg = true;
                            break;
                        }
                    }
                    /**判断是否已经刷新过 */
                    if (App.RedPoint.redViewResult[winName] == undefined) {
                        bFindChangeMsg = true;
                    }
                    /**没有需要刷新的消息 */
                    if (!bFindChangeMsg) {
                        res = App.RedPoint.redViewResult[winName] || false;
                        /**记录当前帧刷新结果 */
                        App.RedPoint.redViewCycleResult[winName] = res;
                    }
                    else {
                        recordRed();
                    }
                }
                else {
                    recordRed();
                }
            }
            else {
                res = App.RedPoint.redViewResult[winName];
                /**记录当前帧刷新结果 */
                App.RedPoint.redViewCycleResult[winName] = res;
            }
        }
        function recordRed() {
            res = view["red"]();
            /**记录当前界面的红点结果 */
            App.RedPoint.redViewResult[winName] = res;
            /**记录当前帧刷新结果 */
            App.RedPoint.redViewCycleResult[winName] = res;
        }
        return res;
    };
    ViewManager.prototype.getRedByViewName = function (viewObj, changeMsgList) {
        if (!viewObj) {
            return false;
        }
        /**未达到开启条件 */
        if (!this.checkOpenCondition(viewObj, false)) {
            return false;
        }
        var redList = [];
        if (viewObj.redItemIdList) {
            for (var index in viewObj.redItemIdList) {
                redList.push(MsgConst.BAG_ITEM_NUM + viewObj.redItemIdList[index]);
            }
        }
        /**如果还有二级页签模块 */
        if (viewObj.module) {
            return this.getRedByViewFun(window[viewObj.module], changeMsgList, redList, viewObj.module);
        }
        else {
            /**只是一级页签 */
            if (viewObj.pannel) {
                return this.getRedByViewFun(window[viewObj.pannel], changeMsgList, redList, viewObj.pannel);
            }
        }
        return false;
    };
    /**显示红点 */
    /**con 需要显示红点控件 必须是egret.DisplayObjectContainer */
    /**show 是否显示红点 */
    /**right 离控件最右边的位置 */
    /**top 离控件最上边的位置 */
    /**redName 红点名称 */
    ViewManager.prototype.showRedPoint = function (con, show, right, top, redName) {
        if (right === void 0) { right = -5; }
        if (top === void 0) { top = -5; }
        if (con instanceof egret.DisplayObjectContainer) {
            redName = redName || "redPoint";
            var red = con.getChildByName(redName);
            if (show) {
                if (!red) {
                    red = new eui.Image("public_json.public_hongdian_png");
                    red.touchEnabled = false;
                    red.right = right;
                    red.top = top;
                    red.name = redName;
                    con.addChild(red);
                }
                else {
                    red.visible = true;
                }
            }
            else {
                if (red) {
                    red.visible = false;
                }
            }
            return red;
        }
    };
    /***********************红点***************************************** */
    /**检测窗口开启条件 */
    ViewManager.prototype.checkWin = function (key, showTips) {
        var bOpen = true;
        if (typeof key != 'string') {
            key = ViewConst[key];
        }
        var cfg = GameConfig.modControl[key];
        //默认取第一个模块来确认作为开启条件
        var openCondition;
        if (cfg && cfg[0]) {
            if (cfg[0][0]) {
                openCondition = cfg[0][0];
            }
            else {
                openCondition = cfg[0];
            }
        }
        bOpen = this.checkOpenCondition(openCondition, showTips);
        return bOpen;
    };
    /**检测开启条件 */
    ViewManager.prototype.checkOpenCondition = function (openCondition, showTips) {
        if (showTips === void 0) { showTips = false; }
        if (GlobalVar.OPEN_ALL_WIN)
            return true;
        var bCan = true;
        var tipsArr = [];
        if (openCondition) {
            var pro = GameCache.hero.mainPro;
            if (pro) {
                /**等级开启 */
                if (openCondition.openLv) {
                    var lv = pro.pro(PropId.AP_LEVEL);
                    if (lv < openCondition.openLv) {
                        bCan = false;
                        if (showTips) {
                            tipsArr.push(StringUtils.substitute(Language.lang.sysOpenError1, openCondition.openLv));
                        }
                        else {
                            return false;
                        }
                    }
                }
                /**任务开启 */
                if (openCondition.openQuest) {
                    var questId = GameCache.quest.questId;
                    if (questId == null)
                        return false; //任务数据未返回
                    if ((questId != -1) && questId < openCondition.openQuest) {
                        bCan = false;
                        if (showTips) {
                            var taskNe = GameConfig.quest[openCondition.openQuest - 1] ? GameConfig.quest[openCondition.openQuest - 1].name : "";
                            tipsArr.push(StringUtils.substitute(Language.lang.lcn18, taskNe));
                        }
                        else {
                            return false;
                        }
                    }
                }
                /**开服天数 */
                if (openCondition.openDay) {
                    if (!GameCache.server.serverOpenDay)
                        return false; //开服天数还未返回
                    if (openCondition.openDay > GameCache.server.serverOpenDay) {
                        bCan = false;
                        if (showTips) {
                            tipsArr.push(StringUtils.substitute(Language.lang.lcn19, openCondition.openQuest));
                        }
                        else {
                            return false;
                        }
                    }
                }
                /**vip等级 */
                if (openCondition.vipLv) {
                    if (openCondition.vipLv > GameCache.vip.realValue()) {
                        bCan = false;
                        if (showTips) {
                            tipsArr.push(StringUtils.substitute(Language.lang.sysOpenError2, openCondition.vipLv));
                        }
                        else {
                            return false;
                        }
                    }
                }
            }
            else {
                return false;
            }
        }
        if (!bCan && showTips) {
            GlobalFun.SysMsg(StringUtils.substitute(Language.lang.sysOpen, tipsArr.join(",")));
        }
        return bCan;
    };
    Object.defineProperty(ViewManager.prototype, "openedUI", {
        /**获取开启中的ui  */
        get: function () {
            var openList = [];
            for (var index in this._opens) {
                var openViewConst = this._opens[index];
                /**常驻界面不加入列表 */
                if (openViewConst == ViewConst.GAME_WORLD || openViewConst == ViewConst.MAIN_UI ||
                    openViewConst == ViewConst.MAIN_QUEST || openViewConst == ViewConst.MAIN_UI_COCER) {
                    continue;
                }
                openList.push(this._opens[index]);
            }
            return openList;
        },
        enumerable: true,
        configurable: true
    });
    return ViewManager;
}(BaseClass));
__reflect(ViewManager.prototype, "ViewManager");
//# sourceMappingURL=ViewManager.js.map