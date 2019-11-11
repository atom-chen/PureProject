/*
 * @Description: 其它角色内容
 * @Author: liangzhaowei
 * @Date: 2019-09-27 19:25:26
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
var RoleOtherPannelInfo = (function (_super) {
    __extends(RoleOtherPannelInfo, _super);
    function RoleOtherPannelInfo($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.roleData = {};
        _this.skinName = "RoleOtherPannelInfoSkin";
        return _this;
    }
    //初始化
    RoleOtherPannelInfo.prototype.init = function () {
        this.roleSelect.setHeroList(GameCache.rank.otherRoleData.roleList);
        this.roleSelect.setHandler(this, this.roleClick);
        this.title = new ThingTitle();
        this.title.scaleX = 1.2;
        this.title.scaleY = 1.2;
        this.gNe.addChild(this.title);
    };
    /**角色选择回调 */
    RoleOtherPannelInfo.prototype.roleClick = function (param) {
        this.upRolePart();
    };
    RoleOtherPannelInfo.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        if (!this.roleData) {
            return;
        }
        this.roleData = GameCache.rank.otherRoleData;
        this.upRolePart();
        /**显示名称 */
        this.title.setName(this.roleData.name);
        this.title.setBadge(this.roleData.badgeLv);
    };
    /**更新角色部位 */
    RoleOtherPannelInfo.prototype.upRolePart = function () {
        var sigleRoleData = this.roleData.roleList[this.roleSelect.nSlRole];
        if (!sigleRoleData) {
            return;
        }
        //战力显示
        this.zdl.value = sigleRoleData.power;
        var eqList = sigleRoleData.qe;
        var eqLvl = sigleRoleData.strent;
        for (var index in this.gPart.$children) {
            var item = this.gPart.$children[index];
            item.touchEnabled = false; /**其它玩家不可以点击 */
            var eq = eqList ? eqList[item.name] : null;
            if (eq) {
                item.data = eq;
                if (eqLvl && eqLvl[eq.stdItem.part])
                    item.strengthLvl = [eqLvl[eq.stdItem.part]];
            }
            else {
                item.strengthLvl = [0];
                if (item.data) {
                    item.reSet();
                    item.setColorImg();
                    item.setIconImg("role_json.role_part_" + item.name + "_png");
                }
            }
        }
        /**模型 */
        if (sigleRoleData.propSet) {
            this.role.setData(sigleRoleData.propSet);
        }
    };
    return RoleOtherPannelInfo;
}(BaseSpriteView));
__reflect(RoleOtherPannelInfo.prototype, "RoleOtherPannelInfo");
//# sourceMappingURL=RoleOtherPannelInfo.js.map