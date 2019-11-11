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
 * 通用信息通道
*/
var MessageCenter = (function (_super) {
    __extends(MessageCenter, _super);
    function MessageCenter() {
        var _this = _super.call(this) || this;
        _this._dic = {};
        /**存储变化的消息列表 */
        _this.changeDic = {};
        _this._targetDic = {};
        _this._type = 1;
        _this._msgVo = [];
        _this._msgPool = [];
        if (_this._type == 0) {
            //App.TimerManager.add(1, this.onRun, this);
            egret.startTick(_this.onRun, _this);
        }
        return _this;
    }
    /**添加一个事件侦听，type事件类型, call回调函数, thisc回调函数所属, once只侦听一次 **/
    MessageCenter.prototype.addListener = function (type, call, thisc, once) {
        if (once === void 0) { once = false; }
        var arr = this._dic[type];
        if (arr == null) {
            arr = [];
            this._dic[type] = arr;
        }
        var hashCode = thisc && thisc["hashCode"];
        if (hashCode) {
            var typeArr = this._targetDic[hashCode];
            if (typeArr == null) {
                typeArr = [];
                this._targetDic[hashCode] = typeArr;
            }
            typeArr.push(type);
        }
        var han = Handler.create(thisc, call, null, once);
        arr.push(han);
    };
    /**移除一个侦听 type事件类型 thisc回调函数所属**/
    MessageCenter.prototype.removeListener = function (type, thisc) {
        var arr = this._dic[type];
        if (arr) {
            var i = 0;
            var len = arr.length;
            for (; i < len; i++) {
                var han = arr[i];
                if (han.caller === thisc) {
                    han.dispose();
                    arr.splice(i, 1);
                    if (arr.length == 0) {
                        delete this._dic[type];
                    }
                    return;
                }
            }
        }
    };
    /**移除该对象所有侦听**/
    MessageCenter.prototype.removeAll = function (thisc) {
        var hashCode = thisc && thisc["hashCode"];
        if (hashCode) {
            var typeArr = this._targetDic[hashCode];
            if (typeArr) {
                for (var _i = 0, typeArr_1 = typeArr; _i < typeArr_1.length; _i++) {
                    var type = typeArr_1[_i];
                    this.removeListener(type, thisc);
                }
                delete this._targetDic[hashCode];
            }
        }
        else {
            for (var key in this._dic) {
                this.removeListener(key, thisc);
            }
        }
    };
    /**派发事件,type事件类型 data可选参数**/
    MessageCenter.prototype.dispatch = function (type) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        if (this._type == 0) {
            this._msgVo.push(this.getMessageVo(type, data));
        }
        else {
            this.doMsg(type, data);
        }
    };
    MessageCenter.prototype.doMsg = function (type, data) {
        var arr = this._dic[type];
        if (arr && arr.length) {
            var i = arr.length - 1;
            // let len: number = arr.length;
            var han = void 0;
            for (; i >= 0; i--) {
                han = arr[i];
                if (!han) {
                    arr.splice(i, 1);
                    continue;
                }
                if (data == null) {
                    han.run();
                }
                else {
                    han.args = data;
                    han.run();
                    han.args = null;
                }
                if (han.once) {
                    arr.splice(i, 1);
                }
            }
        }
        this.changeDic[type] = type;
    };
    MessageCenter.prototype.onRun = function () {
        var currTime = App.TimerManager.getSyncTime();
        var list = this._msgVo;
        while (list.length > 0) {
            var vo = list.shift();
            this.doMsg(vo.type, vo.param);
            this._msgPool.push(vo);
            var t = egret.getTimer() - currTime;
            if (t > 5) {
                break;
            }
        }
        return true;
    };
    /**属性变更回调*/
    MessageCenter.prototype.addProperty = function (call, thisc) {
        var pros = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            pros[_i - 2] = arguments[_i];
        }
        var len = pros.length;
        for (var i = 0; i < len; i++) {
            this.addListener(MsgConst.PROPERTY + pros[i], call, thisc);
        }
    };
    MessageCenter.prototype.getMessageVo = function (type, param) {
        var vo = this._msgPool.pop();
        if (!vo) {
            vo = new MessageVo();
        }
        vo.type = type;
        vo.param = param;
        return vo;
    };
    /**获取协议变化 */
    MessageCenter.prototype.getMsgList = function () {
        return this._dic;
    };
    return MessageCenter;
}(BaseClass));
__reflect(MessageCenter.prototype, "MessageCenter");
var MessageVo = (function () {
    function MessageVo() {
    }
    MessageVo.prototype.dispose = function () {
        this.type = null;
        this.param = null;
    };
    return MessageVo;
}());
__reflect(MessageVo.prototype, "MessageVo");
//# sourceMappingURL=MessageCenter.js.map