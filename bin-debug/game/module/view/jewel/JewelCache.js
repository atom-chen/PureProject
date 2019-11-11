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
 * @Description: 宝石数据
 * @Author: xiejunwei
 * @Date: 2019-09-09 15:11:58
 * @LastEditTime: 2019-10-29 14:07:53
 */
var JewelCache = (function (_super) {
    __extends(JewelCache, _super);
    function JewelCache() {
        var _this = _super.call(this) || this;
        _this.jewelBag = {};
        _this.roleJewelList = {};
        return _this;
    }
    JewelCache.prototype.clear = function () {
        this.jewelBag = {};
        this.roleJewelList = {};
    };
    JewelCache.prototype.initJewelBag = function (id) {
        var gem = GameConfig.jewel[id];
        var item = GameConfig.item[id];
        if (!gem || !item)
            return;
        var typeobj = this.jewelBag[gem.part];
        if (!typeobj)
            typeobj = this.jewelBag[gem.part] = {};
        if (typeobj[item.showQuality]) {
            typeobj[item.showQuality].push(id);
        }
        else {
            typeobj[item.showQuality] = [id];
        }
    };
    JewelCache.prototype.deleteJewel = function (id) {
        var gem = GameConfig.jewel[id];
        var item = GameConfig.item[id];
        var typeobj = this.jewelBag[gem.part];
        if (!typeobj)
            return;
        if (!typeobj[item.showQuality] || typeobj[item.showQuality].length == 0)
            return;
        typeobj[item.showQuality].shift();
    };
    /**
     * 检查宝石穿戴
     */
    JewelCache.prototype.checkJewelInsert = function (roleId, part) {
        if (!roleId) {
            var list = GameCache.hero.list;
            for (var i = 0; i < list.length; i++) {
                for (var j = 0; j < 8; j++) {
                    if (this.checkJewelInsert(list[i].id, j))
                        return true;
                }
            }
            return false;
        }
        if (!part && typeof (part) != "number") {
            for (var i = 0; i < 8; i++) {
                if (this.checkJewelInsert(roleId, i))
                    return true;
            }
            return false;
        }
        var data = this.roleJewelList[roleId];
        var condi = GameConfig.jewel[0].condition;
        var towerLvl = GameCache.copytower.copyTowerLayer;
        //槽位未开启
        if (towerLvl < condi[part])
            return false;
        //获取当前穿著宝石
        var curItem = data && data[part] ? data[part] : null;
        //装着有宝石时,检查背包是否有上级宝石
        if (curItem) {
            var item = GameConfig.item[curItem.id];
            var gemItem = GameConfig.jewel[curItem.id];
            var color = item.showQuality; //品质
            var type = gemItem.part; //类型
            var bag = this.jewelBag[type];
            for (var i in bag) {
                var c = parseInt(i);
                if (c > color)
                    return true;
            }
        }
        else {
            //无宝石装着时，检查存在能镶嵌的宝石
            var toggle = false;
            for (var i in this.jewelBag) {
                var type = parseInt(i);
                var check = false;
                for (var j in data) {
                    var gemItem = GameConfig.jewel[data[j].id];
                    if (gemItem.part == type) {
                        check = true;
                        break;
                    }
                    ;
                }
                if (check)
                    continue;
                toggle = true;
            }
            return toggle;
        }
        return false;
    };
    /**
     * 检查宝石升级
     */
    JewelCache.prototype.checkJewelUpGrade = function (roleId, part) {
        if (!roleId) {
            var list = GameCache.hero.list;
            for (var i = 0; i < list.length; i++) {
                for (var j = 0; j < 8; j++) {
                    if (this.checkJewelUpGrade(list[i].id, j))
                        return true;
                }
            }
            return false;
        }
        if (!part && typeof (part) != "number") {
            for (var i = 0; i < 8; i++) {
                if (this.checkJewelUpGrade(roleId, i))
                    return true;
            }
            return false;
        }
        var data = this.roleJewelList[roleId];
        var curItem = data && data[part] ? data[part] : null;
        if (!curItem)
            return false;
        var gem = GameConfig.jewel[curItem.id];
        var count = GameCache.bag.itemCount(gem.consume[0].id);
        var tarCount = gem.consume[0].count * (1 + curItem.lvl * gem.lvlConsume);
        return count >= tarCount;
    };
    return JewelCache;
}(BaseCache));
__reflect(JewelCache.prototype, "JewelCache");
//# sourceMappingURL=JewelCache.js.map