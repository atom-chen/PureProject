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
var FamilyMemItem = (function (_super) {
    __extends(FamilyMemItem, _super);
    function FamilyMemItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FamilyMemItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.btnQuit, this.onBtnQuitClick);
        this.addTouchEvent(this.btnKick, this.onBtnKickClick);
        this.addTouchEvent(this.btnPro, this.onBtnProClick);
        this.addTouchEvent(this.btnDe, this.onBtnDeClick);
    };
    FamilyMemItem.prototype.onBtnQuitClick = function () {
        Proxy.family.quitFamilyReq();
    };
    FamilyMemItem.prototype.onBtnKickClick = function () {
        Proxy.family.kickMember(this.data.mInfo.memId);
    };
    FamilyMemItem.prototype.onBtnProClick = function () {
    };
    FamilyMemItem.prototype.onBtnDeClick = function () {
    };
    FamilyMemItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var mInfo = this.data.mInfo;
        this.icon.source = GlobalFun.getRoleIcon(mInfo.job, mInfo.sex, 1);
        this.mFlag.source = "family_json.family_mem_flag" + mInfo.position + "_png";
        this.mLvl.text = mInfo.lv.toString();
        this.labName.text = StringUtils.substitute(Language.lang.familyMemName, mInfo.memName, mInfo.lv);
        this.labScore.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyMemScore, mInfo.score));
        this.labDevote.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.familyMemDevote, mInfo.devote));
        // 显示当前状态
        var stateStr;
        if (mInfo.state === 1) {
            stateStr = Language.lang.familyMemOnline;
        }
        else {
            var offlineTime = GameCache.server.serverTime - mInfo.lastLogin;
            stateStr = StringUtils.substitute(Language.lang.familyMemOffline, App.DateUtils.getFormatBySecond(offlineTime, DateUtils.TIME_FORMAT_4));
        }
        ;
        this.labState.textFlow = TextFlowUtils.generateTextFlow(stateStr);
        // 按钮显示
        var fInfo = GameCache.family.fInfo;
        this.btnDe.visible = this.btnKick.visible = this.btnPro.visible = this.btnQuit.visible = false;
        if (mInfo.memId === GameCache.hero.mainPro.pro(PropId.AP_ACTOR_ID)) {
            this.btnQuit.visible = true;
            return;
        }
        var permits = GameConfig.familyCfg.privilege[fInfo.position];
        if (this.data.state === FamilyConst.STATE_MEM) {
            // 有踢人的权限
            if (permits.indexOf(FamilyConst.PERMIT_2) && mInfo.position < fInfo.position) {
                this.btnKick.visible = true;
            }
        }
        else {
            // 有升降职的权限
            if (permits.indexOf(FamilyConst.PERMIT_1) && mInfo.position < fInfo.position) {
                if (mInfo.position === FamilyConst.FAMILY_POS_ELDER) {
                    this.btnDe.visible = true;
                }
                else {
                    this.btnPro.visible = true;
                }
            }
        }
    };
    return FamilyMemItem;
}(BaseCustComponent));
__reflect(FamilyMemItem.prototype, "FamilyMemItem");
//# sourceMappingURL=FamilyMemItem.js.map