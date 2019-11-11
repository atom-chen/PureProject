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
 * Created by yangsong on 15-4-21.
 * 单一资源通过版本号加载管理类
 */
var ResVersionManager = (function (_super) {
    __extends(ResVersionManager, _super);
    // public hasVer(): boolean {
    // 	return !isNaN(LocationProperty.v);
    // }
    /**
     * 构造函数
     */
    function ResVersionManager() {
        var _this = _super.call(this) || this;
        // this.res_loadByVersion();
        _this.resVersionData = window["verData"];
        return _this;
    }
    ResVersionManager.ins = function () {
        return _super.ins.call(this);
    };
    ResVersionManager.prototype.has = function (url) {
        return this.resVersionData.hasOwnProperty(url);
    };
    // public getDir(url: string): number {
    // 	return this.resVersionData[url] & 0xff;
    // }
    ResVersionManager.prototype.getVer = function (url) {
        return this.resVersionData ? this.resVersionData[url] : null;
    };
    ResVersionManager.prototype.getVer2 = function (url) {
        return this.resVersionData2 ? this.resVersionData2[url] : null;
    };
    // /**
    //  * Res加载使用版本号的形式
    //  */
    // private res_loadByVersion(): void {
    // 	RES.web.Html5VersionController.prototype.getVirtualUrl = function (url) {
    // 		if (url.lastIndexOf("http") == -1) {
    // 			let manager = ResVersionManager.ins();
    // 			if (manager.hasVer()) {
    // 				if (manager.has(url)) {
    // 					let dir: number = manager.getDir(url);
    // 					let v: number = manager.getVer(url);
    // 					url = `${LocationProperty.resAdd}${dir}/${url}?v=${v}`;
    // 				}
    // 				else
    // 					url = `${LocationProperty.resAdd}0/${url}`;
    // 			}
    // 			else
    // 				url = `${LocationProperty.resAdd}${url}`;
    // 		}
    // 		return url;
    // 	}
    // }
    /**
     * 加载资源版本号配置文件
     * @param url 配置文件路径
     * @param complateFunc 加载完成执行函数
     * @param complateFuncTarget 加载完成执行函数所属对象
     */
    ResVersionManager.prototype.loadConfig = function (url, complateFunc, complateFuncTarget) {
        var _this = this;
        this.complateFunc = complateFunc;
        this.complateFuncTarget = complateFuncTarget;
        RES.getResByUrl(url, function (data) {
            _this.resVersionData = data;
            _this.complateFunc.call(_this.complateFuncTarget);
        }, this, RES.ResourceItem.TYPE_JSON);
    };
    /**
     * 加载资源版本号配置文件2
     * @param url 配置文件路径
     * @param complateFunc 加载完成执行函数
     * @param complateFuncTarget 加载完成执行函数所属对象
     */
    ResVersionManager.prototype.loadConfig2 = function (url, complateFunc, complateFuncTarget) {
        var _this = this;
        this.complateFunc = complateFunc;
        this.complateFuncTarget = complateFuncTarget;
        RES.getResByUrl(url, function (data) {
            _this.resVersionData2 = data;
            _this.complateFunc.call(_this.complateFuncTarget);
        }, this, RES.ResourceItem.TYPE_JSON);
    };
    return ResVersionManager;
}(BaseClass));
__reflect(ResVersionManager.prototype, "ResVersionManager");
//# sourceMappingURL=ResVersionManager.js.map