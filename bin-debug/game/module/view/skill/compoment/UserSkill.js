var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 一个可使用的技能结构
 * @Author: guolinsen
 * @Date: 2019-06-11 20:13:47
 * @LastEditTime: 2019-08-27 16:36:41
 */
var UserSkill = (function () {
    function UserSkill() {
        this.active = true; //此技能是否能用
    }
    /**
     * 读取数据
     * @param pBytes
     *
     */
    UserSkill.prototype.readAttr = function (pBytes) {
        this.nSkillId = pBytes.readUnsignedShort();
        this.nLevel = pBytes.readUnsignedByte();
        //	this.mjs = pBytes.readUnsignedShort();
        this.dwResumeTick = App.TimerManager.getSyncTime() + pBytes.readUnsignedInt();
        this.exp = pBytes.readUnsignedInt();
        //	this.mjOutTime = pBytes.readUnsignedInt();
        pBytes.readByte();
        //this.active = pBytes.readByte() == 0 ? true : false;   //0能用
    };
    Object.defineProperty(UserSkill.prototype, "canUse", {
        get: function () {
            return this.active && this.dwResumeTick <= App.TimerManager.getSyncTime();
        },
        enumerable: true,
        configurable: true
    });
    UserSkill.prototype.dispose = function () {
        UserSkill._pool.push(this);
    };
    UserSkill.create = function (id, lv) {
        var skill = this._pool.shift();
        (!skill) && (skill = new UserSkill());
        skill.nSkillId = id;
        skill.nLevel = lv;
        skill.dwResumeTick = 0;
        return skill;
    };
    UserSkill._pool = [];
    return UserSkill;
}());
__reflect(UserSkill.prototype, "UserSkill");
//# sourceMappingURL=UserSkill.js.map