var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 实体属性集
 * @Author: guolinsen
 * @Date: 2019-08-13 10:06:31
 * @LastEditTime: 2019-09-26 20:23:00
 */
var PropertySet = (function () {
    function PropertySet() {
        this.aiCamp = 0;
        /**是否开启战斗ai*/
        this.fightAi = false;
        this.isMainPlayer = null;
        this.isFlow = null;
        /**宠物 */
        this.petId = [];
        this.petStar = [];
        this.petName = [];
    }
    PropertySet.prototype.setRoleName = function (str) {
        this.parseName(str);
    };
    /**
     * 从服务器发来的名称字符串中解析各个名称
     * @param NameStr 解码后的名称字符串
     *
     */
    PropertySet.prototype.parseName = function (str) {
        /**
         * 名称字符串的格式为：
         * "角色名称\主人名称"
         */
        var strings = str.split("\\");
        this.charName = strings[0];
        this.masterName = strings.length > 1 ? strings[1] : null;
    };
    PropertySet.prototype.clone = function () {
        var pro = new PropertySet();
        for (var type in this) {
            //console.log("clone", type);
            pro.pro(type, this.pro(type));
        }
        // pro.recog = this.recog;
        // pro.kind = this.kind;
        // pro.aiCamp = this.aiCamp;
        // pro.charName = this.charName;
        // pro.masterName = this.masterName;
        // pro.fightAi = this.fightAi;
        // pro.gsName = this.gsName;
        // pro.petId = this.petId;
        // pro.petName = this.petName;
        pro.isMainPlayer = null;
        return pro;
    };
    /**
     * 设置属性并返回新值，如果不设置新值则直接返回原来值
     * @param name
     * @param value
     * @param thing 有传这个则马上更新
     * @return 当前属性值
     */
    PropertySet.prototype.pro = function (name, value, thing) {
        value != undefined && (this[name] = value);
        if (thing)
            thing.updateProperty(name, value);
        return this[name] || 0;
    };
    /**
     * 从字节流中读取指定ID的属性，并保存到属性集
     * @param propId
     * @param bytes
     *
     */
    PropertySet.prototype.readProperty = function (propId, bytes) {
        var propValue;
        var dt = PropertySet.getDataType(propId);
        switch (dt) {
            case enDt.DT_UNSIGNED_INT:
                propValue = bytes.readUnsignedInt();
                break;
            case enDt.DT_FLOAT:
                propValue = bytes.readFloat();
                break;
            case enDt.DT_DOUBLE:
                propValue = bytes.readDouble();
                break;
            default:
                propValue = bytes.readInt();
                break;
        }
        this[propId] = propValue;
    };
    /**
     * 从字节流中读取指定数量的属性，并保存到属性集
     * @param count
     * @param bytes
     *
     */
    PropertySet.prototype.readMultiProperty = function (count, bytes) {
        for (var i = 0; i < count; i++)
            this.readProperty(bytes.readUnsignedByte(), bytes);
    };
    Object.defineProperty(PropertySet.prototype, "moveSpeed", {
        get: function () {
            return this.pro(PropId.AP_MOVE_SPEED) || 150;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertySet.prototype, "job", {
        get: function () {
            return this.pro(PropId.AP_JOB);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 根据属性获取相关的金钱类型  -1代表不是
     * @param pro
     * @return
     *
     */
    PropertySet.getGameMoneyType = function (pro) {
        switch (pro) {
            case PropId.AP_COIN:
                return MoneyType.NON_BIND_COIN;
            case PropId.AP_YUANBAO:
                return MoneyType.NON_BIND_YUANBAO;
            case PropId.AP_BIND_YUANBAO:
                return MoneyType.BIND_YUANBAO;
            case PropId.AP_BIND_COIN:
                return MoneyType.BIND_COIN;
        }
        return -1;
    };
    /**
     * 获取属性数据类型
     * @param value
     * @return
     *
     */
    PropertySet.getDataType = function (value) {
        switch (value) {
            case PropId.AP_X:
            case PropId.AP_Y:
            case PropId.AP_BODY_ID:
            case PropId.AP_DIR:
            case PropId.AP_WEAPON:
            case PropId.AP_MOUNT:
            case PropId.AP_SWING:
            case PropId.AP_PK_VALUE:
                //case PropId.AP_ZHAN_HUN_VALUE:
                //case PropId.AP_ACHIEVE_VALUE:
                //				case AP_TITLE_ID:
                // case PropId.AP_MOUNT_RIDE_TYPE:
                // case PropId.AP_ZY_ID:
                //case PropId.AP_ACTOR_SIGNIN:
                //case PropId.AP_CRIT_RATE:
                //case PropId.AP_CRIT_VALUE:
                // case PropId.AP_CRIT_RATE_DESC:
                return enDt.DT_INT;
            // case PropId.AP_MAGIC_HIT_RATE:
            // case PropId.AP_MAGIC_DOGERATE:
            // case PropId.AP_TOXIC_DOGERATE:
            // case PropId.AP_HP_RENEW:
            // case PropId.AP_MP_RENEW:
            // case PropId.AP_TOXIC_RENEW:
            //     return enDt.DT_FLOAT;
            default:
                return enDt.DT_UNSIGNED_INT;
        }
    };
    return PropertySet;
}());
__reflect(PropertySet.prototype, "PropertySet");
var enDt;
(function (enDt) {
    enDt[enDt["DT_BOOLEAN"] = 1] = "DT_BOOLEAN";
    enDt[enDt["DT_BYTE"] = 2] = "DT_BYTE";
    enDt[enDt["DT_DOUBLE"] = 3] = "DT_DOUBLE";
    enDt[enDt["DT_FLOAT"] = 4] = "DT_FLOAT";
    enDt[enDt["DT_INT"] = 5] = "DT_INT";
    enDt[enDt["DT_SHORT"] = 6] = "DT_SHORT";
    enDt[enDt["DT_UNSIGNED_BYTE"] = 7] = "DT_UNSIGNED_BYTE";
    enDt[enDt["DT_UNSIGNED_INT"] = 8] = "DT_UNSIGNED_INT";
    enDt[enDt["DT_UNSIGNED_SHORT"] = 9] = "DT_UNSIGNED_SHORT";
    enDt[enDt["DT_STRING"] = 10] = "DT_STRING";
})(enDt || (enDt = {}));
//# sourceMappingURL=PropertySet.js.map