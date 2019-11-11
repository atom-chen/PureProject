var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 配置资源解析
 * @Author: guolinsen
 * @Date: 2019-06-04 20:23:14
 * @LastEditTime: 2019-08-28 10:40:19
 */
var ConfigCache = (function () {
    function ConfigCache() {
    }
    ConfigCache.read = function (data) {
        if (!this.configZip)
            this.configZip = new JSZip(data);
    };
    ConfigCache.clear = function () {
        this.configZip = null;
    };
    ConfigCache.getConfig = function ($fileName) {
        if (!this.configZip)
            return null;
        $fileName = $fileName + ".json";
        // if (!this.configDataList[$fileName]) {
        // 	let file = this.configZip.file($fileName);
        // 	if (!file) {
        // 		console.log(`${$fileName}配置不存在`);
        // 	}
        // 	this.configDataList[$fileName] = this.isJSON(file.asText());
        // 	if (!this.configDataList[$fileName]) {
        // 		console.log(`${$fileName}配置不存在`);
        // 	}
        // }
        return this.configDataList[$fileName];
    };
    ConfigCache.getFileList = function () {
        var list = [];
        var obj = this.configZip.files;
        for (var k in obj) {
            list.push(k);
        }
        return list;
    };
    ConfigCache.parseFile = function ($fileName) {
        if (!this.configDataList[$fileName]) {
            var file = this.configZip.file($fileName);
            if (!file) {
                console.log($fileName + "\u914D\u7F6E\u4E0D\u5B58\u5728");
            }
            this.configDataList[$fileName] = this.isJSON(file.asText());
            if (!this.configDataList[$fileName]) {
                console.log($fileName + "\u914D\u7F6E\u4E0D\u5B58\u5728");
            }
        }
    };
    ConfigCache.isJSON = function (str) {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return obj;
            }
            else {
                return null;
            }
        }
        catch (e) {
            return null;
        }
    };
    /**配置数据列表 */
    ConfigCache.configDataList = {};
    /* 系统开启映射表*/
    ConfigCache.openCopySyObj = {};
    return ConfigCache;
}());
__reflect(ConfigCache.prototype, "ConfigCache");
//# sourceMappingURL=ConfigCache.js.map