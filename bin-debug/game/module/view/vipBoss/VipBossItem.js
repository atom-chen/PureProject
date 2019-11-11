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
 * @Description: VIPBOSS条目
 * @Author: xiejunwei
 * @Date: 2019-09-20 11:41:35
 */
var VipBossItem = (function (_super) {
    __extends(VipBossItem, _super);
    function VipBossItem() {
        return _super.call(this) || this;
    }
    VipBossItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.enterBtn, this.enterFunc);
        this.addTouchEvent(this.check, this.onCheck);
        this.check.selected = false;
        this.time = new SecondCountDown();
        this.time.addCallBack(this.initTime, this);
        this.time.addLabel(this.rTime, Language.lang.reviveTime, DateUtils.TIME_FORMAT_1);
    };
    VipBossItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data.id)
            return;
        this.time.time = 0;
        this.stateJuge();
        this.initData();
        this.autoHint();
    };
    VipBossItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    VipBossItem.prototype.initData = function () {
        var mConfig = GameConfig.monster[this.data.id];
        if (!mConfig)
            return;
        this.mName.text = mConfig.name;
        this.mLvl.text = mConfig.level;
        if (this.data.hp == 0) {
            this.icon.source = RES_DIR_MONSTERICON + mConfig.icon + "d.png";
        }
        else {
            this.icon.source = RES_DIR_MONSTERICON + mConfig.icon + ".png";
        }
        this.item_0.data = this.data.conf.reward_show[0];
        this.item_1.data = this.data.conf.reward_show[1];
        this.item_2.data = this.data.conf.reward_show[2];
        this.setProgess();
        //首杀显示
        this.fName.text = this.data.kname;
        if (this.data.kname == "") {
            this.fName.visible = false;
            this.fImg.visible = false;
        }
        else {
            this.fName.visible = true;
            this.fImg.visible = true;
        }
    };
    VipBossItem.prototype.setProgess = function () {
        this.hp.maximum = 100;
        this.hp.value = this.data.hp;
        var str = this.data.hp + "%";
        this.labelDisplay.text = str;
    };
    //BOSS复活判断，进入等级判断
    VipBossItem.prototype.stateJuge = function () {
        var conf = this.data.conf;
        var time = Math.floor((this.data.reviveTime - GameCache.server.serverTime) / 1000);
        // let time = conf.time - Math.floor((GameCache.server.serverTime - this.data.killTime) / 1000);
        this.rTime.visible = false;
        var vipLvl = GameCache.vip.realValue();
        var roleLvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
        // this.lLvl.visible = false;
        // this.lImg.visible = false;
        this.lG.visible = false;
        this.enterBtn.visible = true;
        this.check.visible = true;
        if (vipLvl < this.data.conf.conds || roleLvl < this.data.conf.levelConds) {
            this.rTime.visible = false;
            this.enterBtn.visible = false;
            // this.lLvl.visible = true;
            // this.lImg.visible = true;
            this.lG.visible = true;
            this.check.visible = false;
            this.lLvl.text = StringUtils.substitute(Language.lang.vipBoss_1, this.data.conf.levelConds, this.data.conf.conds);
        }
        else if (time > 0 && this.data.killTime != 0 && this.data.hp == 0) {
            this.rTime.visible = true;
            this.enterBtn.visible = false;
            this.time.time = time;
        }
    };
    VipBossItem.prototype.initTime = function (t) {
        if (t <= 0) {
            App.TimerManager.remove(this.initTime, this);
            GameCache.boss.refleshWorldBossData();
            return;
        }
    };
    VipBossItem.prototype.enterFunc = function () {
        GameCache.boss.currentBossId = this.data.id;
        Proxy.boss.sendBossFubenOpt(1, this.data.id);
        App.ViewManager.close(ViewConst.BOSS);
    };
    VipBossItem.prototype.autoHint = function () {
        var roleLvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
        var result = GameCache.boss.getRemindSet(this.data["index"]);
        if (roleLvl < this.data.conf.conds) {
            if (result) {
                this.check.selected = false;
            }
        }
        else {
            this.check.selected = GameCache.boss.getRemindSet(this.data["index"]);
        }
    };
    VipBossItem.prototype.onCheck = function () {
        GameCache.boss.setRemindSet(this.data["index"], this.check.selected, SettingType.VIP_BOSS_REMIND);
    };
    return VipBossItem;
}(BaseCustComponent));
__reflect(VipBossItem.prototype, "VipBossItem");
//# sourceMappingURL=VipBossItem.js.map