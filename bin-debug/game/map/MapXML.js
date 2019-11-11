var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapXML = (function () {
    function MapXML() {
        /**配置数据列表 */
        this.configDataList = {};
    }
    MapXML.prototype.read = function (data) {
        if (!this.configZip)
            this.configZip = new JSZip(data);
    };
    MapXML.prototype.getConfig = function ($fileName) {
        if (!this.configZip)
            return null;
        $fileName = $fileName + ".xml";
        if (!this.configDataList[$fileName]) {
            var file = this.configZip.file($fileName);
            if (!file) {
                console.log($fileName + "\u914D\u7F6E\u4E0D\u5B58\u5728");
            }
            this.configDataList[$fileName] = file.asText();
        }
        return this.configDataList[$fileName];
    };
    return MapXML;
}());
__reflect(MapXML.prototype, "MapXML");
//# sourceMappingURL=MapXML.js.map