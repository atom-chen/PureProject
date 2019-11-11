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
 * 伤害飘血
*/
var HurtTxtManager = (function (_super) {
    __extends(HurtTxtManager, _super);
    function HurtTxtManager() {
        var _this = _super.call(this) || this;
        _this.hurtDic = {};
        _this.volist = [];
        App.TimerManager.addFrame(10, _this.onTimer, _this);
        return _this;
    }
    HurtTxtManager.prototype.onTimer = function () {
        var i = 0;
        var a = this.volist.length;
        if (a > 10) {
            this.volist.splice(0, a - 10);
            a = 10;
        }
        if (a == 0)
            return;
        var dic = {};
        for (; i < a; i++) {
            var vo = this.volist[i];
            if (!vo.actor || !vo.actor.pro)
                continue;
            var cy = vo.actor.cellXY.y * 1000 + Math.floor(vo.actor.cellXY.x / 5);
            var arr = void 0;
            if (vo.type != HurtType.SELF) {
                arr = dic[cy];
                if (!arr) {
                    arr = dic[cy] = [];
                }
                arr.push(vo);
                vo.y = vo.actor.y - 120; //- arr.length * 20;
                vo.x = vo.actor.x + (arr.length & 1) * 40;
                vo.delay = arr.length - 1;
            }
            else {
                vo.y = vo.actor.y - 120;
                vo.x = vo.actor.x;
                this.playSingle(vo, 1);
            }
            //this.playSingle(vo);
        }
        this.volist.length = 0;
        for (var key in dic) {
            var arr = dic[key];
            var i_1 = 0, a_1 = arr.length;
            for (; i_1 < a_1; i_1++) {
                this.playSingle(arr[i_1], a_1 - 1);
            }
        }
        dic = null;
    };
    HurtTxtManager.prototype.playSingle = function (vo, len) {
        var txt = ObjectPool.get(HurtTxt);
        App.ThingManager.titleLayer.addChild(txt);
        txt.y = vo.y;
        txt.x = vo.x;
        txt.setData(vo.recog, vo.value, vo.type, vo.bon, vo.delay, len);
        var arr = this.hurtDic[vo.recog];
        if (!arr) {
            arr = this.hurtDic[vo.recog] = [];
        }
        arr.push(txt);
        vo.dispose();
        ObjectPool.push(vo);
    };
    /**
     * recog 玩家句柄
     * value 伤害值
     * bon 是否暴击
     * type 类型
     *
    */
    HurtTxtManager.prototype.play = function (recog, value, bon, type, actor) {
        if (!actor || !actor.isInView)
            return;
        var vo = ObjectPool.get(HurtVo);
        vo.recog = recog;
        vo.value = value;
        vo.bon = bon;
        vo.type = type;
        vo.actor = actor;
        this.volist.push(vo);
        // vo.y = vo.actor.y - 120;
        // vo.x = vo.actor.x;
        // this.playSingle(vo);
    };
    HurtTxtManager.prototype.remove = function (txt, needDelete) {
        if (needDelete === void 0) { needDelete = true; }
        egret.Tween.removeTweens(txt);
        App.DisplayUtils.removeFromParent(txt);
        ObjectPool.push(txt);
        if (needDelete) {
            var arr = this.hurtDic[txt.recog];
            if (arr) {
                var i = 0;
                var a = arr.length;
                var em = true;
                for (; i < a; i++) {
                    if (arr[i] == txt) {
                        arr.splice(i, 1);
                        i--;
                        a--;
                        break;
                    }
                }
                if (a == 0)
                    delete this.hurtDic[txt.recog];
            }
        }
    };
    HurtTxtManager.prototype.removeAll = function () {
        for (var recog in this.hurtDic) {
            var arr = this.hurtDic[recog];
            if (arr) {
                var i = 0;
                var a = arr.length;
                for (; i < a; i++) {
                    this.remove(arr[i], false);
                }
            }
        }
        this.hurtDic = {};
    };
    return HurtTxtManager;
}(BaseClass));
__reflect(HurtTxtManager.prototype, "HurtTxtManager");
var HurtTxt = (function (_super) {
    __extends(HurtTxt, _super);
    function HurtTxt() {
        var _this = _super.call(this) || this;
        _this._value = 0;
        _this._type = "0";
        _this.touchEnabled = _this.touchChildren = false;
        _this._gap = -16;
        _this._numCon = new egret.DisplayObjectContainer();
        _this.addChild(_this._numCon);
        _this.touchEnabled = _this.touchChildren = false;
        return _this;
        //this.filters = [new egret.GlowFilter(0x000000, 1, 3, 3, 12)];
    }
    HurtTxt.prototype.setData = function (recog, value, type, bon, delay, len) {
        this.recog = recog;
        this._type = this.getType(type, bon);
        this._value = value != 0 ? value : SpecialHurtBm.MISS;
        this.upNumber();
        this.scaleX = this.scaleY = 1;
        this.alpha = 1;
        this.x = this.x - (this.width >> 1);
        var t = egret.Tween.get(this);
        if (delay) {
            this.visible = false;
            t = t.wait(delay * 50).call(this.onAdd, this);
        }
        if (type == HurtType.NORMAL) {
            this.scaleX = this.scaleY = 1;
            var sc = 1.2;
            t.to({ scaleX: sc, scaleY: sc, y: this.y - 60 }, 50, egret.Ease.cubicOut);
            if (len != delay) {
                //t.wait(50);
                //t.to({ scaleX: 0.8, scaleY: 0.8 }, 50, egret.Ease.cubicOut);
            }
            else {
                //t.wait(100);
            }
            t.to({ scaleX: 0.6, scaleY: 0.6, alpha: 0, y: this.y - 280 }, 1000, egret.Ease.cubicInOut).call(this.dispose, this);
        }
        else if (type == HurtType.SELF) {
            t.to({ y: this.y - 120, alpha: 0 }, 1500).call(this.dispose, this);
        }
    };
    HurtTxt.prototype.upNumber = function () {
        var numStr = this._value + "";
        var tempBm;
        var lastX = 0;
        var num = this._numCon.numChildren;
        var len = numStr.length;
        var i = 0;
        for (; i < len; i++) {
            if (i < num) {
                tempBm = this._numCon.getChildAt(i);
            }
            else {
                tempBm = ObjectPool.get(egret.Bitmap);
                this._numCon.addChild(tempBm);
            }
            if (i == 0) {
                tempBm.scaleX = tempBm.scaleY = 1;
                tempBm.y = 0;
            }
            else {
                tempBm.scaleX = tempBm.scaleY = MathUtils.limit(0.9, 0.95);
                tempBm.y = (i & 1) == 1 ? 5 : 3;
            }
            tempBm.texture = this.getSingleNumPic(numStr.charAt(i), this._type);
            tempBm.x = lastX;
            lastX = tempBm.x + tempBm.width + this._gap;
        }
        while (len < num) {
            var bit = this._numCon.removeChildAt(i);
            this.poolBit(bit);
            len++;
        }
        if (!tempBm) {
            return;
        }
        this.width = tempBm.x + tempBm.width;
        this.height = tempBm.height;
    };
    HurtTxt.prototype.onAdd = function () {
        this.visible = true;
    };
    HurtTxt.prototype.getType = function (t, bon) {
        if (t == HurtType.SELF) {
            return "sel";
        }
        if (t == HurtType.NORMAL) {
            return bon ? "bon" : "nor";
        }
    };
    //获得单个数字Bitmap
    HurtTxt.prototype.getSingleNumPic = function (num, type) {
        if (num == ".")
            num = "dot";
        return RES.getRes(type + "_" + num + "_png");
    };
    HurtTxt.prototype.poolBit = function (bit) {
        bit.scaleX = bit.scaleY = 1;
        bit.x = bit.y = 0;
        ObjectPool.push(bit);
    };
    HurtTxt.prototype.dispose = function () {
        App.HurtTxtManager.remove(this);
    };
    return HurtTxt;
}(egret.DisplayObjectContainer));
__reflect(HurtTxt.prototype, "HurtTxt");
var HurtVo = (function () {
    function HurtVo() {
    }
    HurtVo.prototype.dispose = function () {
        this.recog = null;
        this.value = null;
        this.bon = false;
        this.type = null;
        this.actor = null;
        this.x = null;
        this.y = null;
        this.delay = null;
    };
    return HurtVo;
}());
__reflect(HurtVo.prototype, "HurtVo");
var HurtType = (function () {
    function HurtType() {
    }
    HurtType.SELF = -1;
    HurtType.NORMAL = 0;
    HurtType.CRIT = 1;
    return HurtType;
}());
__reflect(HurtType.prototype, "HurtType");
var SpecialHurtBm = (function () {
    function SpecialHurtBm() {
    }
    SpecialHurtBm.MISS = "m";
    return SpecialHurtBm;
}());
__reflect(SpecialHurtBm.prototype, "SpecialHurtBm");
//# sourceMappingURL=HurtTxtManager.js.map