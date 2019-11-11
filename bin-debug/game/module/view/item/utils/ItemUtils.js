var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: In User Settings Edit
 * @Author: xiejunwei
 * @Date: 2019-08-20 15:12:43
 * @LastEditTime: 2019-11-01 17:04:36
 */
var ItemUtils = (function () {
    function ItemUtils() {
    }
    /**
     * 获得物品品质对于的颜色
     * @param value 为品质
    */
    ItemUtils.getItemColor = function (value) {
        return this.colorArr[value - 1] || 0xd6d6d6;
    };
    /**
     * 返回附带品质颜色的物品名称，富文本字符串
     * @param item 物品
     */
    ItemUtils.getItemNamewithColor = function (item) {
        var str = "<(c" + this.getItemColor(item.showQuality) + ")" + item.name + ">";
        return str;
    };
    /**
     * 返回附带品质颜色的物品名称，富文本字符串
     * @param id 物品id
     */
    ItemUtils.getItemNamewithColorById = function (id) {
        var qua = 1;
        var name = "";
        if (id && GameConfig.item[id]) {
            qua = GameConfig.item[id].showQuality || 1;
            name = GameConfig.item[id].name || "";
        }
        var str = "<(c" + this.getItemColor(qua) + ")" + name + ">";
        return str;
    };
    /**
     * 获得职业文字
     * @param job
     */
    ItemUtils.getJobString = function (job) {
        var language = Language.lang;
        return language.jobName[job];
    };
    /**
     * 获取装备使用职业
     * @param item
     */
    ItemUtils.getEquipJob = function (item) {
        var conds = item.conds;
        var job = 0;
        if (!conds) {
            return this.currencyEquip(item);
        }
        for (var i = 0; i < conds.length; i++) {
            if (conds[i].cond == StdItemCondition.ucJob) {
                if (conds[i].cond != 0) {
                    job = conds[i].value;
                }
                else {
                    job = this.currencyEquip(item);
                }
                return job;
            }
        }
    };
    /**
     * 获取使用登记
     * @param item
     */
    ItemUtils.getUsLv = function (item) {
        var conds = item.conds;
        if (!conds) {
            return 0;
        }
        for (var i = 0; i < conds.length; i++) {
            if (conds[i].cond == StdItemCondition.ucLevel) {
                return conds[i].value;
            }
        }
    };
    //通用装备处理：遍历已有人物，检查身上部位空位并对比战力
    ItemUtils.currencyEquip = function (item) {
        for (var i = 0; i < GameCache.hero.list.length; i++) {
            var eqArr = GameCache.hero.getDataByIndex(i, GameCache.equip.roleEquipList);
            var eqItem = eqArr && eqArr[item.part] ? eqArr[item.part] : null;
            var power = this.getItemZDL(item);
            if (eqItem) {
                if (this.getItemZDL(eqItem.stdItem) < power)
                    return GameCache.hero.list[i].pro.pro(PropId.AP_JOB);
            }
            else {
                return GameCache.hero.list[i].pro.pro(PropId.AP_JOB);
            }
        }
        return 1;
    };
    /**
     * 根据属性集获取战斗力和
     * @param propArr
     */
    ItemUtils.getZdlByProp = function (propArr) {
        var num = 0;
        if (!propArr)
            return 0;
        for (var _i = 0, propArr_1 = propArr; _i < propArr_1.length; _i++) {
            var i = propArr_1[_i];
            var conf = GameConfig.buffId[i.type];
            conf && (num += conf.power * i.value);
        }
        return Math.floor(num);
    };
    /**
     * 是否是装备
    */
    ItemUtils.isEquip = function (std) {
        return std.type > 0 && std.type < ItemType.itEquipMax;
    };
    /** 是否属于普通道具
     * @param  {StdItem} std
     * @returns boolean
     */
    ItemUtils.isNormalItem = function (std) {
        return std.type >= ItemType.itNormal;
    };
    /**
     * 获取物品战斗力
     * @param item
     */
    ItemUtils.getItemZDL = function (item) {
        var zdl = GameCache.bag.itemZDL[item.id];
        if (!zdl) {
            zdl = this.getZdlByProp(item.staitcAttrs);
            GameCache.bag.itemZDL[item.id] = zdl;
        }
        return zdl;
    };
    /**
     * 检查人物是否能使用
     * @param item
     */
    ItemUtils.itemCanUse = function (item) {
        // let bagtype = GameCache.bag.getItemBagType(item);
        var bagtype = item.bagType;
        switch (bagtype) {
            case BagType.BAG_TYPE_EQUIP:
                var cond = item.stdItem.conds;
                var result = true;
                for (var i in cond) {
                    if (cond[i].cond == StdItemCondition.ucLevel) {
                        var lvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
                        if (lvl < cond[i].value)
                            return false;
                    }
                    if (cond[i].cond == StdItemCondition.ucJob) {
                        var roleData = GameCache.hero.getProByJob(cond[i].value);
                        if (!roleData)
                            return false;
                    }
                }
                return true;
            default:
                break;
        }
        return true;
    };
    /**
     * 推荐使用
     * @param item
     */
    ItemUtils.itemSuggestUse = function (uItem) {
        var item = uItem.stdItem;
        // let bagtype = GameCache.bag.getItemBagType(item);
        var bagtype = uItem.bagType;
        if (!item.useremind)
            return false;
        switch (bagtype) {
            case BagType.BAG_TYPE_EQUIP:
                var job = ItemUtils.getEquipJob(item);
                // 为开启该角色时
                if (!GameCache.hero.getHeroByJob(job)) {
                    this.isItemRecycle(uItem, 7, (item.showQuality >= 6));
                    return false;
                }
                //利用物品回收机制，不回收的为大于身上装备战力，进行推荐，低于侧不推荐同时回收;若品质大于等于6，就强制不进入回收组。
                var show = (!this.isItemRecycle(uItem, 7, (item.showQuality >= 6)));
                var enable = ItemUtils.itemCanUse(uItem);
                return show && enable;
            default:
                return true;
        }
    };
    /**
     * 物品是否回收
     * @param uItem：装备；color：大于等于该品质跳过回收检查；force：为跳过收纳到回收组的步骤； seleJob为当装备为通用装备时，指定某个职业判断
     */
    ItemUtils.isItemRecycle = function (uItem, color, force, seleJob) {
        if (color === void 0) { color = 6; }
        if (force === void 0) { force = false; }
        if (seleJob === void 0) { seleJob = 0; }
        var item = uItem.stdItem;
        if (item.showQuality >= color)
            return false;
        var power = ItemUtils.getItemZDL(item);
        var eqJob = ItemUtils.getEquipJob(item);
        var job = eqJob ? eqJob : 1;
        if (seleJob != 0)
            job = seleJob;
        var roleID = 0;
        var role = GameCache.hero.getProByJob(job);
        if (role)
            roleID = role.pro(PropId.AP_ACTOR_ID);
        var eqArr = GameCache.equip.roleEquipList[roleID];
        var eqItem = eqArr && eqArr[item.part] ? eqArr[item.part] : null;
        if (eqItem) {
            if (eqItem.series.isEquals(uItem.series))
                return true;
            var eqPower = ItemUtils.getItemZDL(eqItem.stdItem); //当前人物装备战力
            if (eqPower >= power) {
                //当前装备战力低于人物已装备，回收
                !force && (GameCache.bag.recycleArr[uItem.series.toString()] = uItem);
                //检查该装备是否在推荐列表里，有则剔除
                if (GameCache.bag.roleSuggestBag[job] && GameCache.bag.roleSuggestBag[job][item.part] == uItem) {
                    delete GameCache.bag.roleSuggestBag[job][item.part];
                }
                return true;
            }
            else {
                //检查进入推荐，判断当前装备是否为推荐装备，是则中断回收，并且进入推荐队列
                var suggest = this.initSuggest(uItem, job, power, force);
                if (suggest === "same") {
                    return true;
                }
                !force && !suggest && (GameCache.bag.recycleArr[uItem.series.toString()] = uItem);
                return !suggest;
            }
        }
        else {
            //角色未创建时或角色该部位没有装备时，筛选对应职业部位最高战力装备
            var keepBag = GameCache.bag.roleKeepBag["" + job];
            if (!keepBag) {
                keepBag = GameCache.bag.roleKeepBag["" + job] = {};
            }
            var rItem = keepBag["" + item.part] ? keepBag["" + item.part] : null;
            //检查推荐
            var suggest = this.initSuggest(uItem, job, power, force);
            if (!rItem) {
                keepBag["" + item.part] = uItem;
                return false;
            }
            var oldPower = ItemUtils.getItemZDL(rItem.stdItem);
            if (uItem.series.isEquals(rItem.series)) {
                return false;
            }
            if (power > oldPower) {
                keepBag["" + item.part] = uItem;
                !force && (GameCache.bag.recycleArr[rItem.series.toString()] = rItem);
            }
            else {
                //该情况为 uItem不是最高战力装备，检查是否属于角色目前能穿著的最高战力装备，假若是，跳过回收
                !force && !suggest && (GameCache.bag.recycleArr[uItem.series.toString()] = uItem);
                return true;
            }
        }
    };
    /**
     * 推荐穿著,假若为推荐穿著，中断回收 true为中断回收
     */
    ItemUtils.initSuggest = function (uItem, job, newPower, force) {
        if (force === void 0) { force = false; }
        var sItem = uItem.stdItem;
        var roleBag = GameCache.bag.roleSuggestBag[job];
        if (!ItemUtils.itemCanUse(uItem))
            return true;
        if (!roleBag)
            roleBag = GameCache.bag.roleSuggestBag[job] = {};
        var oldItem = roleBag[sItem.part];
        if (oldItem) {
            var oldPower = ItemUtils.getItemZDL(sItem);
            if (uItem.series.isEquals(oldItem.series))
                return "same";
            if (newPower > oldPower) {
                //新道具战力大于旧时，回收旧道具
                !force && (GameCache.bag.recycleArr[oldItem.series.toString()] = oldItem);
                roleBag[sItem.part] = uItem;
                return true;
            }
            else {
                return false;
            }
        }
        else {
            roleBag[sItem.part] = uItem;
            return true;
        }
    };
    ItemUtils.deleSuggest = function (uItem) {
        var job = this.getEquipJob(uItem.stdItem);
        var bag = GameCache.bag.roleSuggestBag[job];
        if (!bag)
            return;
        for (var i in bag) {
            var item = bag[i];
            if (item.series.isEquals(uItem.series))
                delete bag[i];
        }
    };
    ItemUtils.colorArr = [0xd6d6d6, 0x2aff00, 0x00b4ff, 0xff00de, 0xffea00, 0xff0000];
    return ItemUtils;
}());
__reflect(ItemUtils.prototype, "ItemUtils");
//# sourceMappingURL=ItemUtils.js.map