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
 * @Description: Buff数据
 * @Author: guolinsen
 * @Date: 2019-09-02 20:47:59
 * @LastEditTime: 2019-09-05 19:50:20
 */
var BuffCache = (function (_super) {
    __extends(BuffCache, _super);
    function BuffCache() {
        var _this = _super.call(this) || this;
        _this.data = {};
        App.TimerManager.add(1000, _this.onTime, _this);
        return _this;
    }
    BuffCache.prototype.clear = function () {
        this.data = {};
    };
    BuffCache.prototype.getBuffList = function (recog) {
        return this.data[recog] ? this.data[recog] : [];
    };
    BuffCache.prototype.onTime = function () {
        var t = App.TimerManager.getSyncTime();
        var update = false;
        for (var recog in this.data) {
            var list = this.data[recog];
            var i = 0;
            var a = list.length;
            var find = false;
            for (; i < a; i++) {
                var buff = list[i];
                if (buff.restTime > 0 && buff.restTime <= t) {
                    list.splice(i, 1);
                    i--;
                    a--;
                    update = true;
                }
            }
        }
        update && App.MessageCenter.dispatch(MsgConst.BUFF_UPDATE);
    };
    BuffCache.prototype.addBuff = function (recog, id, type, group, restTime, name, value, interval, icon) {
        var list = this.data[recog];
        if (!list)
            list = this.data[recog] = [];
        var i = 0;
        var a = list.length;
        var find = false;
        for (; i < a; i++) {
            var buff = list[i];
            if (group != buff.group) {
                continue;
            }
            if (icon && icon != buff.icon) {
                continue;
            }
            var j = 0;
            var b = buff.attr.length;
            for (; j < b; j++) {
                var attr = buff.attr[j];
                if (attr.type == type) {
                    attr.value = value;
                    find = true;
                    break;
                }
            }
            if (!find && icon) {
                var attr = new BuffValue();
                attr.type = type;
                attr.value = value;
                attr.interval = interval;
                buff.attr.push(attr);
                find = true;
            }
            if (find)
                break;
        }
        if (!find) {
            var buff = new BuffVo();
            buff.id = id;
            buff.group = group;
            buff.name = name;
            buff.restTime = restTime;
            buff.interval = interval;
            buff.icon = icon;
            var attr = new BuffValue();
            attr.type = type;
            attr.value = value;
            attr.interval = interval;
            buff.attr.push(attr);
            list.push(buff);
        }
        App.MessageCenter.dispatch(MsgConst.BUFF_UPDATE, recog);
    };
    BuffCache.prototype.delteBuff1 = function (recog, type, group) {
        var list = this.data[recog];
        if (!list)
            return;
        var i = 0;
        var a = list.length;
        var find = false;
        for (; i < a; i++) {
            var buff = list[i];
            if (buff.group == group) {
                var j = 0;
                var b = buff.attr.length;
                for (; j < b; j++) {
                    var attr = buff.attr[j];
                    if (attr.type == type) {
                        list.splice(i, 1);
                        find = true;
                        break;
                    }
                }
            }
            if (find)
                break;
        }
        App.MessageCenter.dispatch(MsgConst.BUFF_UPDATE, recog);
    };
    BuffCache.prototype.delteBuff2 = function (recog, id) {
        var list = this.data[recog];
        if (!list)
            return;
        var i = 0;
        var a = list.length;
        for (; i < a; i++) {
            var buff = list[i];
            if (buff.id == id) {
                list.splice(i, 1);
                break;
            }
        }
        App.MessageCenter.dispatch(MsgConst.BUFF_UPDATE, recog);
    };
    BuffCache.prototype.updateBuff = function (recog, id, value) {
        var list = this.data[recog];
        if (!list)
            return;
        var i = 0;
        var a = list.length;
        for (; i < a; i++) {
            var buff = list[i];
            if (buff.id == id) {
                break;
            }
        }
        App.MessageCenter.dispatch(MsgConst.BUFF_UPDATE, recog);
    };
    return BuffCache;
}(BaseCache));
__reflect(BuffCache.prototype, "BuffCache");
//# sourceMappingURL=BuffCache.js.map