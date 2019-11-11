/*
 * @Description: 转职内容
 * @Author: liangzhaowei
 * @Date: 2019-10-28 17:37:54
 */

class TransferPannel extends BaseSpriteView {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "TransferPannelSkin";
    }


    public roleSelect: RoleSelect;
    public imgRole: eui.Image;
    public progressBar: eui.ProgressBar;
    public job: eui.Image;
    public step: eui.Image;
    public show: eui.Image;
    public icon0: eui.Image;
    public icon1: eui.Image;
    public iconEx: eui.Image;
    public btn: eui.Button;
    public lbGo: eui.Label;
    public propList: PropPart;
    public gAttr: eui.Group;
    public gSkill: eui.Group;




    public cfg;//配表
    public skillList = [];


    //初始化
    public init() {
        this.roleSelect.setHandler(this, this.roleClick);
        this.cfg = GameConfig.transfer;
    }

    /**模块红点函数 不需要计算的写在前面 */
    static red() {


        let bUp = GameCache.transfer.enoughUpRed();
        if (bUp) {
            return true;
        }

        for (let index in GameCache.hero.list) {
            let roleData: HeroThing = GameCache.hero.list[index];
            if (GameCache.transfer.enoughExpRed(roleData.id)) {
                return true
            }
        }

        return false;
    }

    /** roleId 为角色id*/
    public roleRed(roleId) {
        return GameCache.transfer.enoughUpRed() || GameCache.transfer.enoughExpRed(roleId);
    }

    /**需要刷新是红点消息列表 */
    static changeMsg() {
        return [MsgConst.TRANSFER_INFO];
    }


    /**界面内循环刷新红点函数 */
    public refreshRed() {
        super.refreshRed();

        // if (!GameCache.suit) {
        //     return;
        // }

    }

    public open(param: ViewProp = null) {
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
    }

    /**更新列表内容 */
    public upCn() {
        this.imgRole.source = `res/images/bg/transferRole0${this.roleSelect.job}.png`

        let transferItem: TransferItem = GameCache.transfer.syData[this.roleSelect.roleId];
        if (!transferItem) {
            return
        }


        /**都是拿下一级的去显示 */
        let cfgOr: StdTransfer = this.cfg[GameCache.transfer.truanChange(this.roleSelect.job, transferItem.turnNum, transferItem.turnLv)];

        let cfgtr: StdTransfer = this.cfg[cfgOr?cfgOr.next:null];

        if (!cfgOr) {
            return
        }

        this.btn.visible = cfgtr ? true : false;
        this.lbGo.visible = cfgtr ? true : false;
        this.step.visible = cfgtr ? true : false;
        this.gAttr.visible = cfgtr ? true : false;
        this.gSkill.visible = cfgtr ? true : false;
        this.progressBar.visible = cfgtr ? true : false;

        this.skillList = [];
        if (cfgtr) {
            this.step.source = cfgtr.level ? `transfer_json.transfer_step_${cfgtr.level}_png` : null
            this.job.source = cfgtr.stepImg ? cfgtr.stepImg : null
            if (cfgtr.ZXCID) {
                let skillIdEx = cfgtr.ZXCID ? cfgtr.ZXCID[0] : 0
                let skillEx: StdSkill = GameConfig.skill[skillIdEx];
                if (skillEx) {
                    this.iconEx.source = RES_DIR_SKILL + skillEx.icon + ".png";
                }
                this.skillList.push(skillIdEx)
            }
            if (cfgtr.skillID) {
                for (let index in cfgtr.skillID) {
                    let skillCfg: StdSkill = GameConfig.skill[cfgtr.skillID[index]];
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



    }



    public onClick(e: egret.TouchEvent) {
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
    }



    /**角色选择回调 */
    public roleClick(param) {
        this.upCn();
    }



}




