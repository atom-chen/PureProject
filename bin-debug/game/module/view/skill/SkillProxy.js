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
 * @Description: 技能系统
 * @Author: guolinsen
 * @Date: 2019-08-21 19:44:11
 * @LastEditTime: 2019-11-04 20:36:45
 */
var SkillProxy = (function (_super) {
    __extends(SkillProxy, _super);
    function SkillProxy() {
        var _this = _super.call(this, PacketTypes.SKILL) || this;
        _this.regNetMsg(1, _this.doQueryMySkill); //玩家拥有的技能
        _this.regNetMsg(2, _this.doHitTarget); //主角集中目标
        _this.regNetMsg(3, _this.doUpdateSkill); //升级或学习技能 返回
        _this.regNetMsg(4, _this.doSkillSort); //下发技能栏数据
        _this.regNetMsg(5, _this.doSkillCd); //下发技能栏cd
        return _this;
    }
    SkillProxy.prototype.doQueryMySkill = function (bytes) {
        // let temp: UserSkill[] = [];
        var skillList = {};
        var id = GameCache.hero.transIdFromeServer(bytes.readUnsignedInt());
        var count = bytes.readByte(); //技能数量
        for (var i = 0; i < count; i++) {
            var data = new UserSkill();
            data.readAttr(bytes);
            skillList[data.nSkillId] = data;
        }
        GameCache.skill.addSKill(id, skillList);
        App.MessageCenter.dispatch(MsgConst.SKILL_INFO);
    };
    /**
     * 升级或学习技能 返回
     * @param pBytes
     *
     */
    SkillProxy.prototype.doUpdateSkill = function (pBytes) {
        var id = GameCache.hero.transIdFromeServer(pBytes.readUnsignedInt()); //角色id
        var skillId = pBytes.readUnsignedShort();
        var newLevel = pBytes.readByte();
        GameCache.skill.updataSkill(id, skillId, newLevel);
        App.MessageCenter.dispatch(MsgConst.SKILL_INFO);
    };
    /**更新技能顺序列表 */
    SkillProxy.prototype.doSkillSort = function (pBytes) {
        var temp = {};
        var id = GameCache.hero.transIdFromeServer(pBytes.readUnsignedInt());
        var count = pBytes.readByte(); //技能数量
        for (var i = 0; i < count; i++) {
            var index = pBytes.readByte();
            var skillId = pBytes.readUnsignedShort();
            temp[index] = skillId;
        }
        GameCache.skill.initSortSKill(id, temp);
        App.MessageCenter.dispatch(MsgConst.SKILL_SORT);
    };
    /**刷新技能CD */
    SkillProxy.prototype.doSkillCd = function (pBytes) {
        var id = GameCache.hero.transIdFromeServer(pBytes.readUnsignedInt());
        var skillId = pBytes.readUnsignedShort();
        var cd = pBytes.readUnsignedInt();
        // let cd = pBytes.readInt();
        // let temp = {};
        // let id = GameCache.hero.transIdFromeServer(pBytes.readUnsignedInt());
        // let count: number = pBytes.readByte();    //技能数量
        // for (let i: number = 0; i < count; i++) {
        // 	let index = pBytes.readByte();
        // 	let skillId = pBytes.readUnsignedShort();
        // 	temp[index] = skillId;
        // }
        // GameCache.skill.initSortSKill(id, temp);
        // App.MessageCenter.dispatch(MsgConst.SKILL_SORT);
    };
    SkillProxy.prototype.doHitTarget = function (bytes) {
        var recog = bytes.readDouble();
        var actor = App.ThingManager.getThing(recog);
        var damage = bytes.readInt();
        var soundId = bytes.readInt();
        var isBong = (bytes.readUnsignedByte() == 1);
        App.HurtTxtManager.play(recog, damage, isBong, bytes.readByte(), actor);
        return true;
    };
    /**查询我的技能列表*/
    SkillProxy.prototype.sendGetMySkill = function () {
        this.sendMsgId(1);
    };
    /**使用技能*/
    SkillProxy.prototype.sendUseSkill = function (id, skillId, target, x, y, dir) {
        var bytes = this.getBytes(2);
        bytes.writeUnsignedInt(id);
        bytes.writeShort(skillId);
        bytes.writeDouble(target);
        bytes.writeShort(x);
        bytes.writeShort(y);
        bytes.writeByte(dir);
        this.sendToServer(bytes);
        //console.log(`使用技能, 角色${id}, 技能${skillId}, x:${x}, y${y}, dir${dir}`);
    };
    /**升级技能*/
    SkillProxy.prototype.sendUpSkillLv = function (roleId, skillId) {
        var bytes = this.getBytes(3);
        bytes.writeUnsignedInt(roleId);
        bytes.writeShort(skillId);
        this.sendToServer(bytes);
    };
    /**获取技能栏数据*/
    SkillProxy.prototype.getSkillSort = function (roleId) {
        var bytes = this.getBytes(4);
        bytes.writeUnsignedInt(roleId);
        this.sendToServer(bytes);
    };
    /**技能栏数据修改*/
    SkillProxy.prototype.chanegeSkillSort = function (roleId, newSortList) {
        var bytes = this.getBytes(5);
        bytes.writeUnsignedInt(roleId);
        bytes.writeByte(newSortList.length);
        for (var i = 0; i < newSortList.length; i++) {
            bytes.writeByte(i);
            bytes.writeUnsignedShort(newSortList[i]);
        }
        this.sendToServer(bytes);
    };
    /**请求一键升级*/
    SkillProxy.prototype.setSkillAllUp = function (roleId) {
        var bytes = this.getBytes(6);
        bytes.writeUnsignedInt(roleId);
        this.sendToServer(bytes);
    };
    /**升级技能*/
    SkillProxy.prototype.sendUpExSkillLv = function (roleId, skillId) {
        var bytes = this.getBytes(7);
        bytes.writeUnsignedInt(roleId);
        bytes.writeShort(skillId);
        this.sendToServer(bytes);
    };
    return SkillProxy;
}(BaseProxy));
__reflect(SkillProxy.prototype, "SkillProxy");
//# sourceMappingURL=SkillProxy.js.map