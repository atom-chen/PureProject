var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Saco on 2014/12/1.
 */
var LocationProperty = (function () {
    function LocationProperty() {
    }
    LocationProperty.init = function () {
        this.urlParam = {};
        var str = window['paraUrl'] || location.href;
        if (str) {
            var whIndex = str.indexOf("?");
            if (whIndex != -1) {
                var param = str.slice(whIndex + 1).split("&");
                var strArr = void 0;
                for (var i = 0; i < param.length; i++) {
                    strArr = param[i].split("=");
                    this.urlParam[strArr[0]] = strArr[1];
                }
            }
        }
    };
    Object.defineProperty(LocationProperty, "resAdd", {
        /**资源路径 */
        get: function () {
            return this.urlParam['hosts'] || "http://192.168.1.114:5479/client/";
        },
        /**资源路径 */
        set: function (str) {
            this.urlParam['hosts'] = str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "user", {
        /**账号 */
        get: function () {
            // return this.urlParam['user'] || "weixin";
            return "fgafddff";
        },
        /**账号 */
        set: function (str) {
            this.urlParam['user'] = str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "srvid", {
        /**服务器ID */
        get: function () {
            return 1;
            // return parseInt(this.urlParam['srvid']);
        },
        /**服务器ID */
        set: function (v) {
            this.urlParam['srvid'] = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "srvName", {
        get: function () {
            return this.urlParam['srvName'];
        },
        set: function (v) {
            this.urlParam['srvName'] = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "serverIP", {
        /**服务器IP */
        get: function () {
            return "152.136.19.57";
            // return this.urlParam['srvaddr'];
        },
        /**服务器IP */
        set: function (str) {
            this.urlParam['srvaddr'] = str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "serverPort", {
        /**服务器端口 */
        get: function () {
            return 13001;
            // return this.urlParam['srvport'];
        },
        /**服务器端口 */
        set: function (v) {
            this.urlParam['srvport'] = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "pfid", {
        get: function () {
            return this.urlParam['pfid'] || "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationProperty, "appid", {
        get: function () {
            return this.urlParam['appid'] || "";
        },
        enumerable: true,
        configurable: true
    });
    LocationProperty.isCanLogin = function () {
        return this.user != null &&
            this.srvid != null &&
            this.serverIP != null &&
            this.serverPort != null;
    };
    /**
     * 设置加载进度 & 描述
     */
    LocationProperty.setLoadProgress = function (n, str) {
        console.log(n, str);
        if (window['showLoadProgress']) {
            window['showLoadProgress'](n, str);
        }
    };
    LocationProperty.enterGame = function () {
        if (this.isEnter)
            return;
        this.isEnter = true;
        if (window['showGame']) {
            window['showGame']();
        }
    };
    LocationProperty.isEnter = false;
    return LocationProperty;
}());
__reflect(LocationProperty.prototype, "LocationProperty");
//# sourceMappingURL=LocationProperty.js.map