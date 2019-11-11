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
 * @Description: 奖励提示窗口数据管理
 * @Author: xiejunwei
 * @Date: 2019-10-23 15:22:06
 */
var AwardCache = (function (_super) {
    __extends(AwardCache, _super);
    function AwardCache() {
        return _super.call(this) || this;
    }
    AwardCache.prototype.clear = function () {
    };
    /**
     * 打开奖励面板
     * @parameter itemArr 奖励列表，type 面板类型，fbid 副本ID 当type为副本类型时，fbid作为必须字段
     */
    AwardCache.prototype.openAwardTips = function (itemArr, type, fbid) {
        // let fubenCfg: StdFuben = GameConfig.fuben[fbid];
        var view = new ViewProp();
        view.firData = {};
        // view.firData["itemArr"] = itemArr;
        var conf;
        var delay = false;
        if (!App.ViewManager.isShow(ViewConst.AWARDTIPS)) {
            switch (type) {
                /**副本奖励（通用）**/
                case AwardSourceType.COPY:
                    conf = GameConfig.fuben[fbid];
                    delay = true;
                    if (!conf)
                        return;
                    view.firData["fbid"] = fbid;
                    //掉落动画
                    switch (fbid) {
                        case GlobalVar.GUAJI_SCENE:
                            App.ThingManager.addDropList(itemArr);
                            break;
                    }
                    //判断副本类型
                    switch (conf.type) {
                        case 3:
                            view.firData["state"] = "copy";
                            view.firData["funcObj"] = Proxy.copy;
                            view.firData["func"] = Proxy.copy.sendGetAward;
                            break;
                        /**爬塔 */
                        case 4:
                            view.firData["state"] = "copyTower";
                            view.firData["funcObj"] = Proxy.copytower;
                            view.firData["func"] = Proxy.copytower.gotoCopy;
                            view.firData["out"] = true;
                            break;
                        /**个人BOSS */
                        case 2:
                            view.firData["funcObj"] = Proxy.copy;
                            view.firData["func"] = Proxy.copy.sendGetAward;
                            break;
                        /**经验 */
                        case 5:
                            view.firData["state"] = "exp";
                            view.firData["funcObj"] = Proxy.copy;
                            view.firData["func"] = PassMgr.switchGj;
                            break;
                        /** 炼狱boss */
                        case 9:
                            // view.firData["state"] = "pass";
                            view.firData["funcObj"] = GameCache.pgtBoss;
                            view.firData["func"] = GameCache.pgtBoss.takeAwd;
                            break;
                        case CopyType.FASHION:
                            view.firData["state"] = "copy";
                            view.firData["funcObj"] = GameCache.copy;
                            view.firData["func"] = GameCache.copy.exitFashionCopy;
                            break;
                        default:
                            view.firData["funcObj"] = Proxy.copy;
                            view.firData["func"] = Proxy.copy.sendGetAward;
                            break;
                    }
                    view.firData["itemArr"] = itemArr;
                    break;
                /**副本奖励（通用）**/
                /**扫荡 */
                case AwardSourceType.SWEEP:
                    view.firData["state"] = "pass";
                    view.firData["itemArr"] = itemArr;
                    break;
                /**扫荡 */
                /**竞技奖励**/
                case AwardSourceType.JINGJI:
                    view.firData["func"] = GameCache.copy.exitCopy;
                    view.firData["funcObj"] = GameCache.copy;
                    view.firData["itemArr"] = itemArr;
                    break;
                /**竞技奖励**/
                /**BOSS归属奖励**/
                case AwardSourceType.BOSS_PLUS:
                    view.firData["state"] = "boss";
                    view.firData["func"] = GameCache.boss.recvAward;
                    view.firData["funcObj"] = GameCache.boss;
                    view.firData["itemArr1"] = itemArr;
                    view.firData["itemArr"] = [];
                    break;
                /**BOSS归属奖励**/
                /**BOSS参与奖励**/
                case AwardSourceType.BOSS:
                    view.firData["state"] = "boss";
                    view.firData["func"] = GameCache.boss.recvAward;
                    view.firData["funcObj"] = GameCache.boss;
                    view.firData["itemArr"] = itemArr;
                    view.firData["itemArr1"] = [];
                    break;
                /**BOSS参与奖励**/
                /**其他奖励面板 */
                case AwardSourceType.OTHER:
                    view.firData["state"] = "pass";
                    view.firData["itemArr"] = itemArr;
                    view.firData["func"] = PassMgr.switchGj;
                    break;
            }
            if (delay) {
                App.TimerManager.addDelay(1000, 1, 1, App.ViewManager.open, App.ViewManager, null, null, ViewConst.AWARDTIPS, view);
            }
            else {
                App.ViewManager.open(ViewConst.AWARDTIPS, view);
            }
        }
        else {
            var win = App.ViewManager.getView(ViewConst.AWARDTIPS);
            switch (type) {
                case AwardSourceType.BOSS_PLUS:
                    win["setList"](1, itemArr);
                    break;
                case AwardSourceType.BOSS:
                    win["setList"](2, itemArr);
                    break;
                case AwardSourceType.COPY:
                    // view.firData["fbid"] = fbid;
                    win['setCopyId'](fbid);
                    win['resetHandler'](Proxy.copy, Proxy.copy.sendGetAward);
                default:
                    var list = win["itemList"];
                    var array = list.dataProvider;
                    array.replaceAll(array.source.concat(itemArr));
                    break;
            }
        }
    };
    return AwardCache;
}(BaseClass));
__reflect(AwardCache.prototype, "AwardCache");
//# sourceMappingURL=AwardCache.js.map