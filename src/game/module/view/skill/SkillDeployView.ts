/*
 * @Description: 技能排序配置
 * @Author: liangzhaowei
 * @Date: 2019-08-21 19:44:11
 * @LastEditTime: 2019-10-24 19:50:05
 * @LastEditTime: 2019-11-01 15:32:22
 */
class SkillDeployView extends BaseSpriteView {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "SkillDeployViewSkin";
    }


    public roleSelect: RoleSelect;
    public list: eui.List;
    public listHave: eui.List;
    public imgInfo: eui.Image;
    public imgNum: NumberMC;
    public skillName: eui.Label;
    public skillDsc: eui.Label;
    public moveIcon: eui.Image;//移动的技能图标
    public slSkill: UserSkill;//当前所选技能数据

    public nSlRole = 0;//当前选择角色
    public nSlSkill = 0;//当前选择技能
    public changeSkillIndex = -1;//当前需要切换技能下标
    public userMoveSkill: UserSkill;//技能数据
    public skillSort: UserSkill[] = [];//技能排序列表


    public sortList = [];/**技能id 排序列表 */


    /**模块红点函数 不需要计算的写在前面 */
    static red() {
        if (!GameCache.skill) {
            return false;
        }


        for (let index in GameCache.hero.list) {
            let roleData: HeroThing = GameCache.hero.list[index];
            if (GameCache.skill.skillDeployRed(roleData.id)) {
                return true;
            }

        }

        return false;
    }

    /** roleId 为角色id*/
    public roleRed(roleId) {
        if (GameCache.skill.skillDeployRed(roleId)) {
            return true
        }

        return false;
    }

    /**需要刷新是红点消息列表 */
    static changeMsg() {
        return [MsgConst.SKILL_SORT];
    }



    //初始化
    public init() {
        this.list.itemRenderer = SkillInfo;
        this.listHave.itemRenderer = SkillInfoSort;
        this.roleSelect.setHandler(this, this.roleClick)
    }


    public open(param: ViewProp = null) {

        this.changeSkillIndex = -1; //初始化

        Proxy.skill.getSkillSort(this.roleSelect.serverId);

        this.initSkillList();
        /**更新装备内容 */
        this.message(MsgConst.SKILL_INFO, this.upRoleSkill);
        this.addEvent(egret.TouchEvent.TOUCH_BEGIN, this, this.onBeginList);
        this.addEvent(egret.TouchEvent.TOUCH_END, this, this.onEndList);
        this.addEvent(egret.TouchEvent.TOUCH_MOVE, this, this.onMove);
        this.addEvent(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this, this.onOutside);
        this.upRoleSkill();
    }

    public close() {
        super.close();
        this.endGuide();
    }

    /**初始化技能顺序 */
    public initSkillList() {
        let sortList = GameCache.skill.sortSkill[this.roleSelect.roleId];
        this.skillSort = [];
        for (let index in sortList) {
            if (GameCache.skill.learnSkill && GameCache.skill.learnSkill[this.roleSelect.roleId]) {
                this.skillSort.push(GameCache.skill.learnSkill[this.roleSelect.roleId][sortList[index]])
            }
        }
    }


    public itemClick(e: eui.ItemTapEvent) {
        if (e.itemIndex != this.nSlSkill) {
            this.nSlSkill = e.itemIndex;
            this.upRoleSkill();
        }
    }


    /**点击移动 */
    public onMove(e: egret.TouchEvent) {
        var pos = this.globalToLocal(e.stageX, e.stageY);
        this.moveIcon.x = pos.x - this.moveIcon.width / 2;
        this.moveIcon.y = pos.y - this.moveIcon.height / 2;
        let moveX = pos.x - this.moveIcon.width / 2;
        let moveY = pos.y - this.moveIcon.height / 2;

        this.moveIcon.x = moveX;
        this.moveIcon.y = moveY;

    }

    /** 按下点击获取内容 */
    public onBeginList(e: egret.TouchEvent) {
        this.changeSkillIndex = -1; //初始化
        if ((e.target instanceof SkillInfo) || (e.target instanceof SkillInfoSort)) {
            var pos = e.target.icon.localToGlobal();
            this.globalToLocal(pos.x, pos.y, pos);
            this.moveIcon.x = pos.x;
            this.moveIcon.y = pos.y;
            this.moveIcon.source = e.target.icon.source;

            //获取技能id
            if (e.target.data && e.target.data.skill) {
                this.moveIcon.visible = true;
                this.userMoveSkill = e.target.data.skill
            }

            /**当前所选技能切换下标 */
            if ((e.target instanceof SkillInfoSort) && e.target.data.skill) {
                this.changeSkillIndex = e.target.itemIndex;
            }
            //技能顺序 获取技能id
        }
    }

    /** 按下点击获取内容 */
    public onEndList(e: egret.TouchEvent) {
        let view = e;
        this.moveIcon.visible = false;

        //技能列表item 获取 技能顺序
        if (e.target instanceof SkillInfoSort) {
            let skillBar: StdSkillbar = GameConfig.skillBar[e.target.itemIndex + 1];
            if (skillBar && GlobalFun.getRoleLv() < skillBar.level) {
                this.userMoveSkill = null;//初始化数据
                GlobalFun.SysMsg("暂未开放");
                return;
            }
            /**遍历当前技能是不是列表共有的 */
            if (this.changeSkillIndex > -1) {
                /**交换数据 */
                this.skillSort[this.changeSkillIndex] = this.skillSort[e.target.itemIndex];
                this.skillSort[e.target.itemIndex] = this.userMoveSkill;
                this.changeSkillIndex = -1//初始化
            }
            else {
                if (this.userMoveSkill && this.skillSort.indexOf(this.userMoveSkill) < 0) {
                    this.skillSort[e.target.itemIndex] = this.userMoveSkill;
                }
            }
            this.upRoleSortSkill();
            Proxy.skill.chanegeSkillSort(this.roleSelect.serverId, this.sortList);
        }
        else if ((e.target instanceof SkillInfo) && this.userMoveSkill) {
            /**点击切换技能 */
            this.nSlSkill = e.target.itemIndex;
            this.upRoleSkill();
        }
        else {
            /**移除在技能列表里的技能 */
            if (this.changeSkillIndex > -1) {
                /**交换数据 */
                this.skillSort[this.changeSkillIndex] = null;
                this.changeSkillIndex = -1//初始化
                this.upRoleSortSkill();
                Proxy.skill.chanegeSkillSort(this.roleSelect.serverId, this.sortList);
            }
        }


        this.userMoveSkill = null;//初始化数据
    }

    /**点击取消 */
    public onOutside(e: egret.TouchEvent) {
        this.moveIcon.visible = false;
    }



    /**角色选择回调 */
    public roleClick(param) {
        this.nSlRole = param;
        this.changeSkillIndex = -1; //初始化
        this.initSkillList();
        this.upRoleSkill();
    }



    /**更新角色技能 */
    public upRoleSkill() {

        let listSkill = GameCache.skill.getSkillByActorId(GameCache.hero.transIdFromeServer(this.nSlRole));
        let tList = [];
        let allSkill = GameCache.skill.roleSkilList[this.roleSelect.job];
        for (let i in allSkill) {
            let std: StdSkill = allSkill[i];
            let obj = { sl: 1, skill: null, cfg: null }
            obj.sl = this.nSlSkill;
            obj.skill = listSkill[std.id];
            obj.cfg = std;
            if (std && std.skillsort != 1) {
                continue;
            }
            //记录当前所选技能
            if (parseInt(i) == (this.nSlSkill) && obj.skill) {
                this.slSkill = obj.skill
                let skillCfg: StdSkill = std;
                if (skillCfg) {
                    this.skillName.text = skillCfg.name;
                    let valueList = []
                    for (let index in std.valuedec) {
                        valueList.push(std.valuedec[index] * this.slSkill.nLevel);
                    }
                    this.skillDsc.text = StringUtils.substitute(std.desc, valueList);
                    this.imgNum.value = this.slSkill.nLevel;
                }
            }
            tList.push(obj);
        }

        tList.sort(this.sort);
        this.setListData(this.list, tList);

        this.upRoleSortSkill();

    }

    public sort(a, b) {
        return a.cfg.id - b.cfg.id
    }


    /**更新角色技能顺序 */
    public upRoleSortSkill() {
        let listdata = [];
        let has = false;
        this.sortList = [];
        for (let i = 0; i < 4; i++) {
            let obj = { skill: null }
            obj.skill = this.skillSort[i];
            listdata.push(obj);
            let skillId = 0;
            if (this.skillSort[i] && this.skillSort[i].nSkillId) {
                skillId = this.skillSort[i].nSkillId
            }
            this.sortList.push(skillId);
            if (skillId) has = true;
        }
        this.setListData(this.listHave, listdata);
        if (has) {
            this.endGuide(has);
        } else if (GameConfig.clientGlobal.skillGuideID && GameCache.novice.guidId == GameConfig.clientGlobal.skillGuideID) {
            this.playGuide();
        }
    }

    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    private guideImage: eui.Image;
    private playGuide() {
        if (this.guideImage) return;
        let img = this.guideImage = new eui.Image();
        img.alpha = 0.8;
        let arr = this.list.dataProvider && (this.list.dataProvider as eui.ArrayCollection).source;
        if (!arr) return;
        let data: any = arr[0];
        let skill: UserSkill = data.skill;
        let skillCfg = GameConfig.skill[skill.nSkillId];
        img.source = RES_DIR_SKILL + skillCfg.icon + ".png";
        this.addChild(img);

        let x = img.x = 38;
        let y = img.y = 88;
        egret.Tween.get(img, { loop: true }).to({ x: 38, y: 444 }, 1000).call(
            () => {
                img.x = x;
                img.y = y;
            }, this
        )
    }

    private endGuide(has: boolean = false) {
        let img = this.guideImage;
        if (img) {
            egret.Tween.removeTweens(img);
            img.source = null;
            App.DisplayUtils.removeFromParent(img);
            this.guideImage = null;
            if (has && (GameCache.novice.guidId == GameConfig.clientGlobal.skillGuideID)) {
                let ns = GameCache.novice.guideView;
                if (ns) {
                    ns.handlerCommand("skill");
                }
            }
        }
    }

}




