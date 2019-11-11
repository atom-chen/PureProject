var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Handler = (function () {
    function Handler(caller, method, args, once) {
        if (args === void 0) { args = []; }
        if (once === void 0) { once = false; }
        this.isDispose = false;
        this.setData(caller, method, args, once);
    }
    Handler.prototype.setData = function (caller, method, args, once) {
        this.caller = caller;
        this.method = method;
        this.args = args;
        this.once = once;
        return this;
    };
    Handler.prototype.run = function () {
        if (this.method) {
            this.method.apply(this.caller, this.args);
        }
        if (this.once) {
            this.dispose();
        }
    };
    Handler.prototype.dispose = function () {
        if (this.isDispose) {
            return;
        }
        this.isDispose = true;
        this.caller = null;
        this.method = null;
        this.args = null;
        Handler.pool.push(this);
    };
    /**
    * 从对象池内创建一个Handler，默认会执行一次并立即回收，如果不需要自动回收，设置once参数为false。
    * @param	caller 执行域(this)。
    * @param	method 回调方法。
    * @param	args 携带的参数。
    * @param	once 是否只执行一次，如果为true，回调后执行recover()进行回收，默认为true。
    * @return  返回创建的handler实例。
    */
    Handler.create = function (caller, method, args, once) {
        if (args === void 0) { args = []; }
        if (once === void 0) { once = true; }
        var han;
        if (this.pool.length > 0) {
            han = this.pool.pop();
            han.isDispose = false;
            han.setData(caller, method, args, once);
            han.hashCode = Handler.hashCode++;
            return han;
        }
        han = new Handler(caller, method, args, once);
        han.hashCode = Handler.hashCode++;
        return han;
    };
    Handler.pool = [];
    Handler.hashCode = 0;
    return Handler;
}());
__reflect(Handler.prototype, "Handler");
//# sourceMappingURL=Handler.js.map