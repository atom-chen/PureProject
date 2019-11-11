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
 * @Description: BUFFITEM
 * @Author: guolinsen
 * @Date: 2019-09-03 10:57:50
 * @LastEditTime: 2019-09-03 20:07:25
 */
var BuffItem = (function (_super) {
    __extends(BuffItem, _super);
    function BuffItem() {
        return _super.call(this) || this;
    }
    //用于子类继承
    BuffItem.prototype.init = function () {
    };
    BuffItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var buff = this.data;
        this.icon.source = RES_DIR_BUFF_ICON + buff.icon + ".png";
        this.nameTx.text = buff.name;
        App.TimerManager.removeAll(this);
        if (buff.restTime > 0) {
            App.TimerManager.add(1000, this.onTimer, this);
            this.onTimer();
        }
        else {
            this.timeTx.text = "";
        }
        this.showAttr();
    };
    BuffItem.prototype.showAttr = function () {
        var attrs = this.data.attr;
        var i = 0;
        var a = attrs.length;
        var strs = [];
        for (; i < a; i++) {
            var attr = attrs[i];
            var obj = GameConfig.buffId[attr.type];
            if (!obj)
                continue;
            var str = void 0;
            var valueStr = void 0;
            if (!isNaN(attr.value)) {
                valueStr = AttrBufId.formatValue(obj.buffShowType, attr.value);
            }
            if (obj.specialBuff) {
                strs.push(StringUtils.substitute(obj.specialBuff, TextFlowUtils.color(valueStr, ColorUtil.C_BLUE), TextFlowUtils.color(attr.interval, ColorUtil.C_BLUE)));
            }
            else {
                strs.push(obj.attname + TextFlowUtils.color("+" + valueStr, ColorUtil.C_BLUE));
            }
        }
        this.attrTx.textFlow = TextFlowUtils.generateTextFlow(strs.join(", "));
    };
    BuffItem.prototype.onTimer = function () {
        var rest = this.data.restTime - App.TimerManager.getSyncTime();
        rest < 0 && (rest = 0);
        this.timeTx.text = StringUtils.substitute(Language.lang.restTime, App.DateUtils.getFormatBySecond(rest / 1000, DateUtils.TIME_FORMAT_1));
    };
    BuffItem.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        App.TimerManager.removeAll(this);
    };
    return BuffItem;
}(BaseCustComponent));
__reflect(BuffItem.prototype, "BuffItem");
//# sourceMappingURL=BuffItem.js.map