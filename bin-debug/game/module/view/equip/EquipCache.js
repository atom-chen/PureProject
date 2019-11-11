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
 * effect: 装备数据
 * author :lzw
 * data :2019.6.20
 */
var EquipCache = (function (_super) {
    __extends(EquipCache, _super);
    function EquipCache() {
        var _this = _super.call(this) || this;
        //角色装备
        _this.roleEquipList = {};
        //角色装备强化信息
        _this.roleStrengthList = {};
        //角色精炼信息
        _this.roleRefineList = {};
        /**角色红点列表 */
        _this.roleRed = [];
        return _this;
    }
    EquipCache.prototype.clear = function () {
        this.roleEquipList = {};
        this.roleStrengthList = {};
        this.roleRefineList = {};
    };
    /**初始化装备内容 */
    EquipCache.prototype.initEqList = function (roleId, list) {
        if (list) {
            this.roleEquipList[roleId] = list;
        }
    };
    /**穿戴装备 */
    EquipCache.prototype.wearEq = function (roleId, equipSeries) {
        var item = GameCache.bag.getUserItemBySeries(equipSeries);
        if (item) {
            var list = this.roleEquipList[roleId];
            if (!list) {
                list = this.roleEquipList[roleId] = [];
            }
            item.sourceType = ItemSourceType.ROLEEQUIP;
            list[item.stdItem.part] = item;
        }
    };
    /**卸下装备 */
    EquipCache.prototype.dropEquip = function (roleId, equipSeries) {
        var list = this.roleEquipList[roleId];
        for (var index in list) {
            var userItem = list[index];
            if (userItem && userItem.series.isEquals(equipSeries)) {
                list[index] = null;
            }
        }
    };
    /**
     * 比较人物身上的装备战力
     * 返回 当前item - 人物身上对应部位战力
    */
    EquipCache.prototype.compartPower = function (item) {
        var job = ItemUtils.getEquipJob(item);
        var hero = GameCache.hero.getProByJob(job);
        if (!hero)
            return 0;
        var part = item.part;
        var list = GameCache.hero.getDataByJob(job, this.roleEquipList);
        if (!list)
            return 1;
        var equip = list[part];
        if (!equip)
            return 1;
        return ItemUtils.getItemZDL(item) - ItemUtils.getItemZDL(equip.stdItem);
    };
    /**
     * 获取神圣是否有这个装备
    */
    EquipCache.prototype.bEquip = function (item) {
        var job = ItemUtils.getEquipJob(item);
        var hero = GameCache.hero.getProByJob(job);
        if (!hero)
            return false;
        var part = item.part;
        var list = GameCache.hero.getDataByJob(job, this.roleEquipList);
        if (!list)
            return false;
        var equip = list[part];
        if (!equip)
            return false;
        return true;
    };
    /**获取角色战力 */
    EquipCache.prototype.getRolePower = function (roleId) {
        var power = 0;
        for (var index in this.roleEquipList[roleId]) {
            power = power + ItemUtils.getItemZDL(this.roleEquipList[roleId][index]);
        }
        return power;
    };
    /**执行一键穿戴
     * @param role 为0时，为全角色一键穿戴
     */
    EquipCache.prototype.quickWear = function (job) {
        if (job === void 0) { job = 0; }
        if (job == 0) {
            for (var i = 1; i <= 3; i++) {
                this.quickWear(i);
            }
            return;
        }
        var suggestBag = GameCache.bag.roleSuggestBag[job];
        if (!suggestBag)
            return;
        var roleId = GameCache.hero.getServerIdByJob(job);
        if (roleId == -1)
            return;
        var arr = [];
        for (var i in suggestBag) {
            // Proxy.equip.sendWearEquip(suggestBag[i].series, 2, roleId);
            arr.push(suggestBag[i]);
        }
        Proxy.equip.sendQuickEquip(roleId, arr);
        //清空推荐列表
        GameCache.bag.roleSuggestBag[job] = {};
    };
    return EquipCache;
}(BaseCache));
__reflect(EquipCache.prototype, "EquipCache");
//# sourceMappingURL=EquipCache.js.map