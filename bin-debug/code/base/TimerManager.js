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
 * Created by yangsong on 2014/11/23.
 * Timer管理器
 */
var TimerManager = (function (_super) {
    __extends(TimerManager, _super);
    /**
     * 构造函数
     */
    function TimerManager() {
        var _this = _super.call(this) || this;
        //this._handlers = [];
        _this._handlerDic = {};
        _this._currTime = egret.getTimer();
        _this._currFrame = 0;
        egret.startTick(_this.onEnterFrame, _this);
        return _this;
    }
    TimerManager.prototype.getFrameId = function () {
        return this._currFrame;
    };
    /**获取当前运行时间egret.getTimer() */
    TimerManager.prototype.getSyncTime = function () {
        return this._currTime;
    };
    TimerManager.DeleteHandle = function (handler) {
        handler.clear();
        ObjectPool.push(handler);
    };
    /**
     * 每帧执行函数
     * @param frameTime
     */
    TimerManager.prototype.onEnterFrame = function (time) {
        this._currTime = time; //egret.getTimer();
        this._currFrame++;
        this.doTime();
        App.FrameHandler.onFrame();
        return false;
    };
    // private onTimer(): void {
    // 	this.doTime(this._currTime);
    // }
    TimerManager.prototype.doTime = function () {
        var time = this._currTime;
        var frame = this._currFrame;
        for (var code in this._handlerDic) {
            var _handlers = this._handlerDic[code];
            var len = _handlers.length;
            if (len <= 0) {
                delete this._handlerDic[code];
                continue;
            }
            var i = 0;
            var handler = void 0;
            var flag = false;
            for (; i < len; i++) {
                handler = _handlers[i];
                if (!handler) {
                    return;
                }
                if (handler.needDelete) {
                    _handlers.splice(i, 1);
                    i--;
                    len--;
                    TimerManager.DeleteHandle(handler);
                    continue;
                }
                flag = false;
                if (handler.exeTime > 0 && handler.exeTime <= time) {
                    handler.exeTime = time + handler.delay;
                    flag = true;
                }
                else if (handler.exeFrame > 0 && handler.exeFrame <= frame) {
                    handler.exeFrame = frame + handler.delay;
                    flag = true;
                }
                if (flag) {
                    handler.method.apply(handler.methodObj, handler.methodParam);
                    var repeat = handler.forever;
                    if (!repeat) {
                        if (handler.repeatCount > 1) {
                            handler.repeatCount--;
                            repeat = true;
                        }
                        else {
                            if (handler.repeatCount == 1 && handler.onFinish) {
                                handler.onFinish.apply(handler.finishObj);
                            }
                        }
                    }
                    if (!repeat) {
                        _handlers.splice(i, 1);
                        i--;
                        len--;
                        TimerManager.DeleteHandle(handler);
                    }
                }
            }
        }
    };
    TimerManager.prototype.create = function (startTime, delay, repeat, method, methodObj, onFinish, fobj, onTime) {
        if (onTime === void 0) { onTime = true; }
        var methodParam = [];
        for (var _i = 8; _i < arguments.length; _i++) {
            methodParam[_i - 8] = arguments[_i];
        }
        if (delay < 0 || repeat < 0 || method == null) {
            return;
        }
        if (!methodObj.hashCode) {
            throw (new Error("计时器对象必须是HashObject"));
        }
        var handler = ObjectPool.get(TimerHandler);
        handler.forever = repeat == 0;
        handler.repeatCount = repeat;
        handler.delay = delay;
        handler.method = method;
        handler.methodObj = methodObj;
        handler.methodParam = methodParam;
        handler.onFinish = onFinish;
        handler.finishObj = fobj;
        handler.exeTime = startTime + this._currTime;
        handler.exeFrame = 0;
        var arr = this._handlerDic[methodObj.hashCode];
        if (!arr)
            arr = this._handlerDic[methodObj.hashCode] = [];
        arr.push(handler);
    };
    /**
     *
     * 定时执行
     * @param delay 执行间隔:毫秒
     * @param repeat 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param onFinish 完成执行函数
     * @param fobj 完成执行函数所属对象
     * @param remove 是否删除已经存在的
     *
     */
    TimerManager.prototype.add = function (delay, method, methodObj, repeat, onFinish, fobj) {
        if (repeat === void 0) { repeat = 0; }
        if (onFinish === void 0) { onFinish = null; }
        if (fobj === void 0) { fobj = null; }
        this.create(delay, delay, repeat, method, methodObj, onFinish, fobj);
    };
    /**
     *
     * 定时执行,首次延时
     * @param startTime 延迟多久第一次执行
     * @param delay 执行间隔:毫秒
     * @param repeat 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param onFinish 完成执行函数
     * @param fobj 完成执行函数所属对象
     * @param remove 是否删除已经存在的
     *
     */
    TimerManager.prototype.addDelay = function (startTime, delay, repeat, method, methodObj, onFinish, fobj) {
        if (onFinish === void 0) { onFinish = null; }
        if (fobj === void 0) { fobj = null; }
        var methodParam = [];
        for (var _i = 7; _i < arguments.length; _i++) {
            methodParam[_i - 7] = arguments[_i];
        }
        this.create.apply(this, [startTime, delay, repeat, method, methodObj, onFinish, fobj, true].concat(methodParam));
    };
    /**
     *
     * 定帧执行
     * @param frame 执行间隔:多少帧执行一次
     * @param repeat 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     *
     */
    TimerManager.prototype.addFrame = function (frame, method, methodObj, repeat) {
        if (repeat === void 0) { repeat = 0; }
        if (frame < 0 || repeat < 0 || method == null) {
            return;
        }
        var handler = ObjectPool.get(TimerHandler);
        handler.forever = repeat == 0;
        handler.repeatCount = repeat;
        handler.delay = frame;
        handler.method = method;
        handler.methodObj = methodObj;
        handler.exeTime = 0;
        handler.exeFrame = frame + this._currFrame;
        var arr = this._handlerDic[methodObj.hashCode];
        if (!arr)
            arr = this._handlerDic[methodObj.hashCode] = [];
        arr.push(handler);
    };
    /**
     * 清理
     * @param method 要移除的函数
     * @param methodObj 要移除的函数对应的对象
     */
    TimerManager.prototype.remove = function (method, methodObj) {
        var handlers = this._handlerDic[methodObj.hashCode];
        if (!handlers)
            return;
        for (var i = handlers.length - 1; i >= 0; i--) {
            var handler = handlers[i];
            if (handler.method == method) {
                handler.needDelete = true;
            }
        }
        (handlers.length == 0) && (delete this._handlerDic[methodObj.hashCode]);
    };
    /**
     * 清理
     * @param methodObj 要移除的函数对应的对象
     */
    TimerManager.prototype.removeAll = function (methodObj) {
        var handlers = this._handlerDic[methodObj.hashCode];
        if (!handlers)
            return;
        for (var i = handlers.length - 1; i >= 0; i--) {
            var handler = handlers[i];
            handler.needDelete = true;
        }
        delete this._handlerDic[methodObj.hashCode];
    };
    /**
     * 检测是否已经存在
     * @param method
     * @param methodObj
     *
     */
    TimerManager.prototype.isExists = function (method, methodObj) {
        var handlers = this._handlerDic[methodObj.hashCode];
        if (!handlers)
            return;
        for (var i = handlers.length - 1; i >= 0; i--) {
            var handler = handlers[i];
            if (handler.method == method) {
                return true;
            }
        }
        return false;
    };
    return TimerManager;
}(BaseClass));
__reflect(TimerManager.prototype, "TimerManager");
var TimerHandler = (function () {
    function TimerHandler() {
        /**执行间隔*/
        this.delay = 0;
        /**是否重复执行*/
        this.forever = false;
        /**重复执行次数*/
        this.repeatCount = 0;
        /**执行时间*/
        this.exeTime = 0;
        /**执行帧*/
        this.exeFrame = 0;
        this.needDelete = false;
    }
    /**清理*/
    TimerHandler.prototype.clear = function () {
        this.method = null;
        this.methodObj = null;
        this.methodParam = null;
        this.onFinish = null;
        this.finishObj = null;
        this.forever = false;
        this.needDelete = false;
    };
    return TimerHandler;
}());
__reflect(TimerHandler.prototype, "TimerHandler");
//# sourceMappingURL=TimerManager.js.map