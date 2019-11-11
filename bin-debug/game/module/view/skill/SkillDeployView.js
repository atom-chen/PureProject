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
 * @Description: 技能排序配置
 * @Author: liangzhaowei
 * @Date: 2019-08-21 19:44:11
 * @LastEditTime: 2019-10-24 19:50:05
 * @LastEditTime: 2019-11-01 15:32:22
 */
var SkillDeployView = (function (_super) {
    __extends(SkillDeployView, _super);
    function SkillDeployView($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.nSlRole = 0; //当前选择角色
        _this.nSlSkill = 0; //当前选择技能
        _this.changeSkillIndex = -1; //当前需要切换技能下标
        _this.skillSort = []; //技能排序列表
        _this.sortList = []; /**技能id 排序列表 */
        _this.skinName = "SkillDeployViewSkin";
        return _this;
    }
    /**模块红点函数 不需要计算的写在前面 */
    SkillDeployView.red = function () {
        if (!GameCache.skill) {
            return false;
        }
        for (var index in GameCache.hero.list) {
            var roleData = GameCache.hero.list[index];
            if (GameCache.skill.skillDeployRed(roleData.id)) {
                return true;
            }
        }
        return false;
    };
    /** roleId 为角色id*/
    SkillDeployView.prototype.roleRed = function (roleId) {
        if (GameCache.skill.skillDeployRed(roleId)) {
            return true;
        }
        return false;
    };
    /**需要刷新是红点消息列表 */
    SkillDeployView.changeMsg = function () {
        return [MsgConst.SKILL_SORT];
    };
    //初始化
    SkillDeployView.prototype.init = function () {
        this.list.itemRenderer = SkillInfo;
        this.listHave.itemRenderer = SkillInfoSort;
        this.roleSelect.setHandler(this, this.roleClick);
    };
    SkillDeployView.prototype.open = function (param) {
        if (param === void 0) { param = null; }
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
    };
    SkillDeployView.prototype.close = function () {
        _super.prototype.close.call(this);
        this.endGuide();
    };
    /**初始化技能顺序 */
    SkillDeployView.prototype.initSkillList = function () {
        var sortList = GameCache.skill.sortSkill[this.roleSelect.roleId];
        this.skillSort = [];
        for (var index in sortList) {
            if (GameCache.skill.learnSkill && GameCache.skill.learnSkill[this.roleSelect.roleId]) {
                this.skillSort.push(GameCache.skill.learnSkill[this.roleSelect.roleId][sortList[index]]);
            }
        }
    };
    SkillDeployView.prototype.itemClick = function (e) {
        if (e.itemIndex != this.nSlSkill) {
            this.nSlSkill = e.itemIndex;
            this.upRoleSkill();
        }
    };
    /**点击移动 */
    SkillDeployView.prototype.onMove = function (e) {
        var pos = this.globalToLocal(e.stageX, e.stageY);
        this.moveIcon.x = pos.x - this.moveIcon.width / 2;
        this.moveIcon.y = pos.y - this.moveIcon.height / 2;
        var moveX = pos.x - this.moveIcon.width / 2;
        var moveY = pos.y - this.moveIcon.height / 2;
        this.moveIcon.x = moveX;
        this.moveIcon.y = moveY;
    };
    /** 按下点击获取内容 */
    SkillDeployView.prototype.onBeginList = function (e) {
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
                this.userMoveSkill = e.target.data.skill;
            }
            /**当前所选技能切换下标 */
            if ((e.target instanceof SkillInfoSort) && e.target.data.skill) {
                this.changeSkillIndex = e.target.itemIndex;
            }
            //技能顺序 获取技能id
        }
    };
    /** 按下点击获取内容 */
    SkillDeployView.prototype.onEndList = function (e) {
        var view = e;
        this.moveIcon.visible = false;
        //技能列表item 获取 技能顺序
        if (e.target instanceof SkillInfoSort) {
            var skillBar = GameConfig.skillBar[e.target.itemIndex + 1];
            if (skillBar && GlobalFun.getRoleLv() < skillBar.level) {
                this.userMoveSkill = null; //初始化数据
                GlobalFun.SysMsg("暂未开放");
                return;
            }
            /**遍历当前技能是不是列表共有的 */
            if (this.changeSkillIndex > -1) {
                /**交换数据 */
                this.skillSort[this.changeSkillIndex] = this.skillSort[e.target.itemIndex];
                this.skillSort[e.target.itemIndex] = this.userMoveSkill;
                this.changeSkillIndex = -1; //初始化
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
                this.changeSkillIndex = -1; //初始化
                this.upRoleSortSkill();
                Proxy.skill.chanegeSkillSort(this.roleSelect.serverId, this.sortList);
            }
        }
        this.userMoveSkill = null; //初始化数据
    };
    /**点击取消 */
    SkillDeployView.prototype.onOutside = function (e) {
        this.moveIcon.visible = false;
    };
    /**角色选择回调 */
    SkillDeployView.prototype.roleClick = function (param) {
        this.nSlRole = param;
        this.changeSkillIndex = -1; //初始化
        this.initSkillList();
        this.upRoleSkill();
    };
    /**更新角色技能 */
    SkillDeployView.prototype.upRoleSkill = function () {
        var listSkill = GameCache.skill.getSkillByActorId(GameCache.hero.transIdFromeServer(this.nSlRole));
        var tList = [];
        var allSkill = GameCache.skill.roleSkilList[this.roleSelect.job];
        for (var i in allSkill) {
            var std = allSkill[i];
            var obj = { sl: 1, skill: null, cfg: null };
            obj.sl = this.nSlSkill;
            obj.skill = listSkill[std.id];
            obj.cfg = std;
            if (std && std.skillsort != 1) {
                continue;
            }
            //记录当前所选技能
            if (parseInt(i) == (this.nSlSkill) && obj.skill) {
                this.slSkill = obj.skill;
                var skillCfg = std;
                if (skillCfg) {
                    this.skillName.text = skillCfg.name;
                    var valueList = [];
                    for (var index in std.valuedec) {
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
    };
    SkillDeployView.prototype.sort = function (a, b) {
        return a.cfg.id - b.cfg.id;
    };
    /**更新角色技能顺序 */
    SkillDeployView.prototype.upRoleSortSkill = function () {
        var listdata = [];
        var has = false;
        this.sortList = [];
        for (var i = 0; i < 4; i++) {
            var obj = { skill: null };
            obj.skill = this.skillSort[i];
            listdata.push(obj);
            var skillId = 0;
            if (this.skillSort[i] && this.skillSort[i].nSkillId) {
                skillId = this.skillSort[i].nSkillId;
            }
            this.sortList.push(skillId);
            if (skillId)
                has = true;
        }
        this.setListData(this.listHave, listdata);
        if (has) {
            this.endGuide(has);
        }
        else if (GameConfig.clientGlobal.skillGuideID && GameCache.novice.guidId == GameConfig.clientGlobal.skillGuideID) {
            this.playGuide();
        }
    };
    SkillDeployView.prototype.playGuide = function () {
        if (this.guideImage)
            return;
        var img = this.guideImage = new eui.Image();
        img.alpha = 0.8;
        var arr = this.list.dataProvider && this.list.dataProvider.source;
        if (!arr)
            return;
        var data = arr[0];
        var skill = data.skill;
        var skillCfg = GameConfig.skill[skill.nSkillId];
        img.source = RES_DIR_SKILL + skillCfg.icon + ".png";
        this.addChild(img);
        var x = img.x = 38;
        var y = img.y = 88;
        egret.Tween.get(img, { loop: true }).to({ x: 38, y: 444 }, 1000).call(function () {
            img.x = x;
            img.y = y;
        }, this);
    };
    SkillDeployView.prototype.endGuide = function (has) {
        if (has === void 0) { has = false; }
        var img = this.guideImage;
        if (img) {
            egret.Tween.removeTweens(img);
            img.source = null;
            App.DisplayUtils.removeFromParent(img);
            this.guideImage = null;
            if (has && (GameCache.novice.guidId == GameConfig.clientGlobal.skillGuideID)) {
                var ns = GameCache.novice.guideView;
                if (ns) {
                    ns.handlerCommand("skill");
                }
            }
        }
    };
    return SkillDeployView;
}(BaseSpriteView));
__reflect(SkillDeployView.prototype, "SkillDeployView");
//# sourceMappingURL=SkillDeployView.js.map