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
 * @Description:
 * @Author: moyusheng
 * @Date: 2019-10-08 11:31:51
 * @LastEditTime: 2019-10-30 19:29:21
 */
/**
 * create by junwei on 7/11/2019
 * 闯关面板
 */
var ChuangguanPannel = (function (_super) {
    __extends(ChuangguanPannel, _super);
    function ChuangguanPannel() {
        var _this = _super.call(this) || this;
        _this.level = 1;
        _this.skinName = "ChuangguanPannelSkin";
        return _this;
    }
    ChuangguanPannel.prototype.init = function () {
        _super.prototype.init.call(this);
        this.num.type = "num_num_";
    };
    ChuangguanPannel.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.addTouchEvent(this.enterBtn, this.enterFunc);
        this.addTouchEvent(this.rankWin, this.openRank);
        // this.addTouchEvent(this.recvBtn, this.recvFunc);
        this.message(MsgConst.PROPERTY + PropId.AP_CHKPOINT_AWARD_LV, this.initData);
        this.message(MsgConst.PROPERTY + PropId.AP_CHKPOINT_LV, this.initData);
        this.message(MsgConst.PASS_RANK_INFO, this.initRank);
        this.level = GameCache.pass.level ? GameCache.pass.level : 1;
        // this.level = 1;
        this.initData();
        Proxy.copy.sendPassRank(1);
    };
    ChuangguanPannel.prototype.close = function (param) {
        _super.prototype.close.call(this);
    };
    ChuangguanPannel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.itemList.dispose();
        this.itemEff && this.itemEff.dispose();
        this.itemEff = null;
    };
    ChuangguanPannel.prototype.initData = function () {
        this.num.value = this.level;
        // let bossConfig = GameConfig.passBOSS[this.level];
        var bossid = PassMgr.getPassBossData();
        var bossCfg = PassMgr.getPassBossCfg();
        if (bossid) {
            var boss = GameConfig.monster[bossid];
            if (boss)
                this.mModel.showMonster(boss.modelid);
            this.bossBg.source = RES_DIR_BG + "passBg" + bossCfg.backpic + ".jpg";
        }
        this.initAw();
        this.initProgress();
    };
    ChuangguanPannel.prototype.initAw = function () {
        var awArr = PassMgr.getPassAward(true);
        if (!this.itemList) {
            this.itemList = ObjectPool.get(ItemList);
        }
        this.itemList.setData(awArr, this.awGroup);
    };
    ChuangguanPannel.prototype.initProgress = function () {
        var proMax = 0;
        var conf = GameConfig.passSpAw;
        var spID = GameCache.hero.mainPro.pro(PropId.AP_CHKPOINT_AWARD_LV);
        var spLvl = conf[spID] && conf[spID].barrier ? conf[spID].barrier : 0;
        for (var i in conf) {
            if (spLvl < conf[i].barrier) {
                proMax = conf[i].barrier;
                this.item.data = conf[i].showAwards[0];
                break;
            }
        }
        this.progress.maximum = proMax;
        this.progress.value = this.level - 1 <= 0 ? 0 : this.level - 1;
        this.initSpAw();
        //预留未领取处理
    };
    ChuangguanPannel.prototype.initSpAw = function () {
        var conf = GameConfig.passSpAw;
        var maxLen = Object.getOwnPropertyNames(conf).length;
        var spID = GameCache.hero.mainPro.pro(PropId.AP_CHKPOINT_AWARD_LV);
        var spLvl = conf[spID] && conf[spID].barrier ? conf[spID].barrier : 0;
        this.passDone.visible = false;
        this.spG.visible = true;
        for (var i in conf) {
            var spConfig = conf[i];
            if (this.progress.value >= spConfig.barrier) {
                if (spLvl < spConfig.barrier) {
                    this.progress.visible = false;
                    if (!this.itemEff) {
                        this.itemEff = MovieClip.create();
                        this.item.addChild(this.itemEff);
                        this.itemEff.x = 40;
                        this.itemEff.y = 40;
                    }
                    this.itemEff.loadFile(RES_DIR_EFF + "petselect_0_1", -1);
                    this.revLb.visible = true;
                    this.item.setHandler(this, this.recvFunc);
                    return;
                }
            }
        }
        this.progress.visible = true;
        this.revLb.visible = false;
        this.itemEff && this.itemEff.dispose();
        this.itemEff = null;
        this.item.disposeHandler();
        if (conf["" + maxLen].barrier <= spLvl) {
            this.spG.visible = false;
            this.passDone.visible = true;
        }
    };
    ChuangguanPannel.prototype.initRank = function (arr) {
        this.fName.text = arr && arr[0] ? arr[0].roleName : "";
    };
    ChuangguanPannel.prototype.enterFunc = function () {
        var delta = PassMgr.isComplete();
        if (delta <= 0 && GameCache.map.mapId == GlobalVar.GUAJI_SCENE) {
            Proxy.copy.sendPassEnter();
        }
        else {
            GlobalFun.SysMsg("还需击杀" + delta + "只怪");
            return;
        }
        //进入BOSS场景
        App.ViewManager.close(ViewConst.CHUANGGUAN);
    };
    ChuangguanPannel.prototype.recvFunc = function () {
        Proxy.copy.sendGetAward(GlobalVar.GUAJI_SCENE, 1);
    };
    ChuangguanPannel.prototype.openRank = function () {
        GameCache.copy.openPassRank(0, []);
        Proxy.copy.sendPassRank();
    };
    return ChuangguanPannel;
}(BaseEuiWindow));
__reflect(ChuangguanPannel.prototype, "ChuangguanPannel");
//# sourceMappingURL=ChuanguanPannel.js.map