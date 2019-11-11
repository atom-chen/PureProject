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
 * 分帧执行函数，只执行一次
 * 所有添加到这里的函数，都会放进队列，每帧执行一个
*/
var FrameHandler = (function (_super) {
    __extends(FrameHandler, _super);
    function FrameHandler() {
        var _this = _super.call(this) || this;
        _this._handler = [];
        return _this;
    }
    FrameHandler.prototype.add = function (call, thisC, checkHas) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        if (checkHas) {
            var i = 0, a = this._handler.length;
            for (; i < a; i++) {
                if (this._handler[i].method == call && this._handler[i].caller == thisC) {
                    this._handler[i].args = args;
                    return;
                }
            }
        }
        var h = Handler.create(thisC, call, args);
        this._handler.push(h);
    };
    FrameHandler.prototype.remove = function (call, thisC) {
        var i = 0;
        var list = this._handler;
        var l = list.length;
        for (; i < l; i++) {
            var h = list[i];
            if (h.method == call && h.caller == thisC) {
                h.dispose();
                list.splice(i, 1);
                break;
            }
        }
    };
    FrameHandler.prototype.has = function (call, thisC) {
        var i = 0;
        var list = this._handler;
        var l = list.length;
        for (; i < l; i++) {
            var h = list[i];
            if (h.method == call && h.caller == thisC) {
                return true;
            }
        }
        return false;
    };
    FrameHandler.prototype.onFrame = function () {
        var h = this._handler.shift();
        if (h) {
            h.run();
        }
    };
    return FrameHandler;
}(BaseClass));
__reflect(FrameHandler.prototype, "FrameHandler");
//# sourceMappingURL=FrameHandler.js.map