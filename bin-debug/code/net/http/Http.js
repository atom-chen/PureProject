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
 * Created by luoy on 2016/12/20.
 * Http请求处理
 */
var Http = (function (_super) {
    __extends(Http, _super);
    /**
     * 构造函数
     */
    function Http() {
        return _super.call(this) || this;
    }
    Http.ins = function () {
        return _super.ins.call(this);
    };
    /**
     * 请求数据
     * @param	paramUrl								请求地址
     * @param	resType									返回的数据格式	true文本数据	false二进制数据
     * @param	method									数据请求类型	true：GET	false：POST
     * @param	onComplete(event: egret.Event)			请求完成
     * @param	onError(event: egret.IOErrorEvent)		请求错误
     * @param	onProgress(event: egret.ProgressEvent)	请求进度
     */
    Http.prototype.send = function (paramUrl, resType, method, onComplete, onError, onProgress) {
        var request = new egret.HttpRequest();
        request.responseType = resType ? egret.HttpResponseType.TEXT : egret.HttpResponseType.ARRAY_BUFFER;
        request.open(paramUrl, method ? egret.HttpMethod.GET : egret.HttpMethod.POST);
        request.once(egret.Event.COMPLETE, onComplete, this);
        request.once(egret.IOErrorEvent.IO_ERROR, onError ? onError : function () { }, this);
        request.once(egret.ProgressEvent.PROGRESS, onProgress ? onProgress : function () { }, this);
        request.send();
    };
    return Http;
}(BaseClass));
__reflect(Http.prototype, "Http");
//# sourceMappingURL=Http.js.map