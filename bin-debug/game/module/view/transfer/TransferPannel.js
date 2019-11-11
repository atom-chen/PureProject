/*
 * @Description: 转职内容
 * @Author: liangzhaowei
 * @Date: 2019-10-28 17:37:54
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
var TransferPannel = (function (_super) {
    __extends(TransferPannel, _super);
    function TransferPannel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.skillList = [];
        _this.skinName = "TransferPannelSkin";
        return _this;
    }
    //初始化
    TransferPannel.prototype.init = function () {
        this.roleSelect.setHandler(this, this.roleClick);
        this.cfg = GameConfig.transfer;
    };
    /**模块红点函数 不需要计算的写在前面 */
    TransferPannel.red = function () {
        var bUp = GameCache.transfer.enoughUpRed();
        if (bUp) {
            return true;
        }
        for (var index in GameCache.hero.list) {
            var roleData = GameCache.hero.list[index];
            if (GameCache.transfer.enoughExpRed(roleData.id)) {
                return true;
            }
        }
        return false;
    };
    /** roleId 为角色id*/
    TransferPannel.prototype.roleRed = function (roleId) {
        return GameCache.transfer.enoughUpRed() || GameCache.transfer.enoughExpRed(roleId);
    };
    /**需要刷新是红点消息列表 */
    TransferPannel.changeMsg = function () {
        return [MsgConst.TRANSFER_INFO];
    };
    /**界面内循环刷新红点函数 */
    TransferPannel.prototype.refreshRed = function () {
        _super.prototype.refreshRed.call(this);
        // if (!GameCache.suit) {
        //     return;
        // }
    };
    TransferPannel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        this.addTouchEvent(this.btn, this.onClick);
        this.addTouchEvent(this.lbGo, this.onClick);
        this.addTouchEvent(this.show, this.onClick);
        this.addTouchEvent(this.iconEx, this.onClick);
        this.addTouchEvent(this.icon0, this.onClick);
        this.addTouchEvent(this.icon1, this.onClick);
        this.addTouchEvent(this.show, this.onClick);
        this.addTouchEvent(this.show, this.onClick);
        this.message(MsgConst.TRANSFER_INFO, this.upCn);
        this.upCn();
    };
    /**更新列表内容 */
    TransferPannel.prototype.upCn = function () {
        this.imgRole.source = "res/images/bg/transferRole0" + this.roleSelect.job + ".png";
        var transferItem = GameCache.transfer.syData[this.roleSelect.roleId];
        if (!transferItem) {
            return;
        }
        /**都是拿下一级的去显示 */
        var cfgOr = this.cfg[GameCache.transfer.truanChange(this.roleSelect.job, transferItem.turnNum, transferItem.turnLv)];
        var cfgtr = this.cfg[cfgOr ? cfgOr.next : null];
        if (!cfgOr) {
            return;
        }
        this.btn.visible = cfgtr ? true : false;
        this.lbGo.visible = cfgtr ? true : false;
        this.step.visible = cfgtr ? true : false;
        this.gAttr.visible = cfgtr ? true : false;
        this.gSkill.visible = cfgtr ? true : false;
        this.progressBar.visible = cfgtr ? true : false;
        this.skillList = [];
        if (cfgtr) {
            this.step.source = cfgtr.level ? "transfer_json.transfer_step_" + cfgtr.level + "_png" : null;
            this.job.source = cfgtr.stepImg ? cfgtr.stepImg : null;
            if (cfgtr.ZXCID) {
                var skillIdEx = cfgtr.ZXCID ? cfgtr.ZXCID[0] : 0;
                var skillEx = GameConfig.skill[skillIdEx];
                if (skillEx) {
                    this.iconEx.source = RES_DIR_SKILL + skillEx.icon + ".png";
                }
                this.skillList.push(skillIdEx);
            }
            if (cfgtr.skillID) {
                for (var index in cfgtr.skillID) {
                    var skillCfg = GameConfig.skill[cfgtr.skillID[index]];
                    if (skillCfg && this["icon" + index]) {
                        this["icon" + index].source = RES_DIR_SKILL + skillCfg.icon + ".png";
                    }
                    this.skillList.push(cfgtr.skillID[index]);
                }
            }
            else {
                if (cfgtr) {
                    this.propList.setData(cfgOr.attrs, cfgtr.attrs, 0, 0xffc600, 0xffffff, 0xffffff, [], "PropItem2Skin");
                }
            }
            this.gAttr.visible = !cfgtr.skillID ? true : false;
            this.gSkill.visible = cfgtr.skillID ? true : false;
            if (cfgtr && cfgtr.transferExe) {
                this.progressBar.value = transferItem.exp;
                this.progressBar.maximum = cfgtr.transferExe;
            }
        }
    };
    TransferPannel.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.btn:
                Proxy.transfer.sendSuitResolve(this.roleSelect.serverId);
                break;
            case this.lbGo:
                App.ViewManager.openParm(ViewConst.TRANSFERUSE, this.roleSelect.nSlRole);
                break;
            case this.show:
                App.ViewManager.openParm(ViewConst.TRANSFERSHOW, this.roleSelect.job);
                break;
            case this.iconEx:
                App.ViewManager.openParm(ViewConst.SKILLTIPS, this.skillList[0]);
                break;
            case this.icon0:
                App.ViewManager.openParm(ViewConst.SKILLTIPS, this.skillList[1]);
                break;
            case this.icon1:
                App.ViewManager.openParm(ViewConst.SKILLTIPS, this.skillList[2]);
                break;
            default:
                break;
        }
    };
    /**角色选择回调 */
    TransferPannel.prototype.roleClick = function (param) {
        this.upCn();
    };
    return TransferPannel;
}(BaseSpriteView));
__reflect(TransferPannel.prototype, "TransferPannel");
//# sourceMappingURL=TransferPannel.js.map