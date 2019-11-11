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
 * @Description: 战力数字滚动
 * @Author: guolinsen
 * @Date: 2019-08-21 14:32:46
 * @LastEditTime: 2019-08-28 19:17:28
 */
var FightPowerRoll = (function (_super) {
    __extends(FightPowerRoll, _super);
    function FightPowerRoll() {
        return _super.call(this) || this;
    }
    FightPowerRoll.prototype.playData = function (oldValue, newValue) {
        if (oldValue == newValue)
            return;
        var old = oldValue + "";
        var cur = newValue + "";
        var a = old.length;
        var b = cur.length;
        var c = Math.max(a, b);
        while (a < c) {
            old = "0" + old;
            a++;
        }
        while (b < c) {
            cur = "0" + cur;
            b++;
        }
        this.oldValue = old;
        this.newValue = cur;
        var num = this.numChildren;
        var i = 0;
        var tempBm;
        var lastX = 0;
        for (; i < c; i++) {
            if (i < num) {
                tempBm = this.getChildAt(i);
            }
            else {
                tempBm = ObjectPool.get(egret.Bitmap);
                this.addChild(tempBm);
            }
            tempBm.texture = this.getSingleNumPic(old.charAt(i));
            tempBm.x = lastX;
            lastX = tempBm.x + tempBm.width + 1;
        }
        while (c < num) {
            var bit = this.removeChildAt(i);
            this.poolBit(bit);
            c++;
        }
        this.width = tempBm.x + tempBm.width;
        this.height = tempBm.height;
        this.startRoll();
    };
    FightPowerRoll.prototype.startRoll = function () {
        this.roollIndex = this.numChildren - 1;
        this.roollStartNum = parseInt(this.oldValue.charAt(this.roollIndex));
        this.roollEndNum = parseInt(this.newValue.charAt(this.roollIndex));
        if (this.roollStartNum == this.roollEndNum) {
            this.roollNext();
        }
        App.TimerManager.removeAll(this);
        App.TimerManager.addFrame(4, this.onRoll, this);
    };
    FightPowerRoll.prototype.roollNext = function () {
        this.roollIndex--;
        if (this.roollIndex < 0) {
            this.complete();
            return;
        }
        this.roollStartNum = parseInt(this.oldValue.charAt(this.roollIndex));
        this.roollEndNum = parseInt(this.newValue.charAt(this.roollIndex));
        if (this.roollStartNum == this.roollEndNum) {
            this.roollNext();
        }
    };
    FightPowerRoll.prototype.onRoll = function () {
        this.roollStartNum++;
        if (this.roollStartNum > 9)
            this.roollStartNum = 0;
        var bit = this.getChildAt(this.roollIndex);
        if (bit) {
            bit.texture = this.getSingleNumPic(this.roollStartNum + "");
        }
        if (this.roollStartNum == this.roollEndNum) {
            this.roollNext();
        }
    };
    FightPowerRoll.prototype.complete = function () {
        if (this.handler) {
            this.handler.run();
        }
        App.TimerManager.removeAll(this);
    };
    FightPowerRoll.prototype.poolBit = function (bit) {
        ObjectPool.push(bit);
    };
    //获得单个数字Bitmap
    FightPowerRoll.prototype.getSingleNumPic = function (num) {
        if (num == ".")
            num = "dot";
        return RES.getRes("num_json.pro_zl_" + num + "_png");
    };
    return FightPowerRoll;
}(BaseEuiComponent));
__reflect(FightPowerRoll.prototype, "FightPowerRoll");
//# sourceMappingURL=FightPowerRoll.js.map