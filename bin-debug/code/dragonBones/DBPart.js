var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 角色龙骨部位
 * @Author: guolinsen
 * @Date: 2019-08-13 16:46:35
 * @LastEditTime: 2019-09-26 11:23:09
 */
var DBPart = (function () {
    function DBPart() {
    }
    Object.defineProperty(DBPart, "PartId", {
        get: function () {
            var part = this._partId;
            if (!part) {
                part = {};
                part[this.ARMOUR] = PropId.AP_BODY_ID;
                part[this.HAT] = PropId.AP_HAT;
                part[this.EYE] = PropId.AP_EYE;
                part[this.PANTS] = PropId.AP_PANTS;
                part[this.WEAPON] = PropId.AP_WEAPON;
                part[this.ASSIST] = PropId.AP_ASSIST;
                part[this.GLASSES] = PropId.AP_GLASSES;
                part[this.HAIR] = PropId.AP_HAIR;
                part[this.BACK] = PropId.AP_BACK;
                part[this.WING] = PropId.AP_SWING;
                this._partId = part;
            }
            return part;
        },
        enumerable: true,
        configurable: true
    });
    DBPart.getDefault = function (job, sex, k) {
        if (k == this.WEAPON)
            return 0;
        if (k == this.ASSIST)
            return 0;
        if (k == this.GLASSES)
            return 0;
        if (k == this.BACK)
            return 0;
        if (k == this.HAT)
            return 0;
        if (k == this.WING)
            return 0;
        return job + "_" + sex + "_" + k;
    };
    DBPart.getPartNameList = function (k) {
        var part = this._partNameList;
        if (!part) {
            part = {};
            part[this.ARMOUR] = ["1", "2"];
            part[this.HAT] = [""];
            part[this.EYE] = [""];
            part[this.PANTS] = [""];
            part[this.WEAPON] = [""];
            part[this.ASSIST] = [""];
            part[this.GLASSES] = [""];
            part[this.HAIR] = ["1", "2"];
            part[this.BACK] = [""];
            part[this.WING] = [""];
            this._partNameList = part;
        }
        return part[k];
    };
    /**裸模*/
    DBPart.NUDE = "nude";
    /**头发*/
    DBPart.HAIR = "hair";
    /**头盔*/
    DBPart.HAT = "hat";
    /**眼睛*/
    DBPart.EYE = "eye";
    /**眼镜*/
    DBPart.GLASSES = "glasses";
    /**衣服*/
    DBPart.ARMOUR = "armour";
    /**裤子*/
    DBPart.PANTS = "pants";
    /**主武器*/
    DBPart.WEAPON = "weapon";
    /**副武器*/
    DBPart.ASSIST = "assist";
    /**翅膀*/
    DBPart.WING = "wing";
    /**背部*/
    DBPart.BACK = "back";
    /**怪物*/
    DBPart.MONSTER = "monster";
    DBPart.CACHE = 0;
    return DBPart;
}());
__reflect(DBPart.prototype, "DBPart");
//# sourceMappingURL=DBPart.js.map