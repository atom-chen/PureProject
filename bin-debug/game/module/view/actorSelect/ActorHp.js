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
 * create by junwei on 07/15/2019
 * 选中血条
 */
var ActorHp = (function (_super) {
    __extends(ActorHp, _super);
    function ActorHp() {
        var _this = _super.call(this) || this;
        _this.barNum = 5;
        _this.hpArr = [];
        //血条宽度区间
        _this.hpInterval = [20, 284];
        //血条数量
        _this.hpCounts = 1;
        _this.skinName = "ActorHpSkin";
        return _this;
    }
    ActorHp.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // App.MessageCenter.addListener(MsgConst.ENTER_SCENE, this.changeScene, this);
        // App.MessageCenter.addListener(MsgConst.BOSS_RANK_INFO, this.onBossRankChange, this);
    };
    ActorHp.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data instanceof BaseThing) {
            this.initData();
            App.MessageCenter.removeListener(MsgConst.ENTER_SCENE, this);
            App.MessageCenter.addListener(MsgConst.ENTER_SCENE, this.changeScene, this);
            App.MessageCenter.removeListener(MsgConst.BOSS_RANK_INFO, this);
            App.MessageCenter.addListener(MsgConst.BOSS_RANK_INFO, this.onBossRankChange, this);
        }
    };
    ActorHp.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    ActorHp.prototype.initData = function () {
        this.thing = this.data;
        this.maxHP = this.data.pro.pro(PropId.AP_MAX_HP);
        this.hp = this.data.pro.pro(PropId.AP_HP);
        var mstCfg = GameConfig.monster[this.data.pro.pro(PropId.AP_ACTOR_ID)];
        if (mstCfg) {
            this.mName.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.bossHpName, mstCfg.level.toString(), this.data.pro.charName));
            mstCfg.icon && (this.headIcon.source = "" + RES_DIR_MONSTERICON + mstCfg.icon + ".png");
            this.og.visible = false;
            this.headIcon.x = 103;
            this.headIcon.y = -34;
            this.hpCounts = mstCfg.hpCounts ? mstCfg.hpCounts : 1;
        }
        else {
            var job = this.data.pro.pro(PropId.AP_JOB);
            var sex = this.data.pro.pro(PropId.AP_SEX);
            this.mName.text = this.data.pro.charName;
            this.headIcon.source = GlobalFun.getRoleIcon(job, sex);
            this.og.visible = false;
            this.headIcon.x = 143;
            this.headIcon.y = 9;
            this.hpCounts = 1;
        }
        this.perHp = this.maxHP / this.hpCounts;
        this.hpChange(this.hp);
    };
    // private initHpBar(): void {
    //     this.each = this.maxHP / this.barNum;
    //     let circle = this.barNum > 5 ? 5 : this.barNum;
    //     for (let i = 0; i < circle; i++) {
    //         let img: eui.Image;
    //         if (!this.hpArr[i]) {
    //             img = ObjectPool.get(eui.Image);
    //             this.hpG.addChild(img);
    //             this.hpArr.push(img);
    //         } else {
    //             img = this.hpArr[i];
    //         }
    //         img.left = 0;
    //         img.top = 0;
    //         let rect: egret.Rectangle = new egret.Rectangle(6, 2, 233, 13);
    //         img.scale9Grid = rect;
    //         img.source = "hp_json.hp_" + (i + 1) + "_png";
    //         img.width = this.hpInterval[1];
    //     }
    //     let mark = circle;
    //     while (circle < this.hpArr.length) {
    //         this.hpArr[circle].scale9Grid = null;
    //         this.hpArr[circle].source = null;
    //         App.DisplayUtils.removeFromParent(this.hpArr[circle]);
    //         ObjectPool.push(this.hpArr[circle]);
    //         mark++
    //     }
    //     if (mark < this.hpArr.length) this.hpArr = this.hpArr.slice(0, mark);
    // }
    ActorHp.prototype.hpChange = function (value) {
        // let delta = (this.hpInterval[1] - this.hpInterval[0]);
        // value = value <= 0 ? 0 : value;
        // this.hp_0.width = Math.floor((value / this.maxHP) * delta) + this.hpInterval[0];
        // if (value <= 0) {
        //     this.visible = false;
        // }
        if (value <= 0) {
            this.visible = false;
        }
        else {
            var index = Math.ceil(value / this.perHp);
            var color = index % 5;
            color = color == 0 ? 5 : color;
            this.hp_0.source = "hp_json.hp_" + color + "_png";
            if (index == 1 || index == 0) {
                this.hp_1.visible = false;
            }
            else {
                color--;
                color = color == 0 ? 5 : color;
                this.hp_1.source = "hp_json.hp_" + color + "_png";
                this.hp_1.visible = true;
            }
            var curValue = this.perHp - (index * this.perHp - value);
            var delta = (this.hpInterval[1] - this.hpInterval[0]);
            curValue = curValue <= 0 ? 0 : curValue;
            this.hp_0.width = Math.floor((curValue / this.perHp) * delta) + this.hpInterval[0];
            this.hpLab.text = this.hpCounts <= 0 ? "" : "x" + index;
        }
    };
    ActorHp.prototype.changeScene = function () {
        App.MessageCenter.removeListener(MsgConst.ENTER_SCENE, this);
        App.MessageCenter.removeListener(MsgConst.BOSS_RANK_INFO, this);
        ActorSeleMgr.offSele();
    };
    // public change(): void {
    //     let value;// 残余HP
    //     let barNum = Math.ceil(value / this.each); //剩余血条数
    //     let residue = value % this.each; //余数
    //     let cSrc = "hp_json.hp_" + (barNum % 5) + "_png";  //当前血条颜色
    //     let nSrc = "hp_json.hp_" + ((barNum + 1) % 5) + "_png"; // 下一血条颜色
    //     nSrc = barNum == 1 ? "" : nSrc;
    //     let lost = this.barNum - barNum; //已失去的血条
    // }
    /** boss排行信息更新 */
    ActorHp.prototype.onBossRankChange = function (_a) {
        var arr = _a[0];
        if (!arr || arr.length == 0) {
            this.og.visible = false;
            return;
        }
        if (!this.data || !this.data.pro || this.data.pro.pro(PropId.AP_ACTOR_ID) != arr[0].bossid) {
            return;
        }
        this.og.visible = true;
        var gsName = arr[0].roleName;
        this.owner.text = StringUtils.substitute(Language.lang.gsName, gsName);
    };
    return ActorHp;
}(BaseCustComponent));
__reflect(ActorHp.prototype, "ActorHp");
//# sourceMappingURL=ActorHp.js.map