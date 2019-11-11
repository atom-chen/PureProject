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
/*
 * @Description: 图腾协议
 * @Author: xiejunwei
 * @Date: 2019-08-27 20:03:54
 * @LastEditTime: 2019-08-29 16:58:09
 */
var TotemsProxy = (function (_super) {
    __extends(TotemsProxy, _super);
    function TotemsProxy() {
        var _this = _super.call(this, PacketTypes.TOTEMS) || this;
        _this.regNetMsg(1, _this.doSingleTotemsInfo); //单个图腾信息
        _this.regNetMsg(2, _this.doTotemsInfo); //所有图腾信息
        _this.regNetMsg(3, _this.doSingleResonanInfo); //单个图腾共鸣信息
        _this.regNetMsg(4, _this.doResonanInfo); //所有图腾共鸣信息
        return _this;
    }
    TotemsProxy.prototype.doSingleTotemsInfo = function (bytes) {
        var tId = bytes.readByte();
        var tJ = bytes.readUnsignedShort();
        var tStar = bytes.readByte();
        GameCache.totems.initTotemsData(tId, tJ, tStar);
        App.MessageCenter.dispatch(MsgConst.TOTEMS_INFO);
    };
    TotemsProxy.prototype.doTotemsInfo = function (bytes) {
        var len = bytes.readInt();
        for (var i = 0; i < len; i++) {
            var tId = bytes.readByte();
            var tJ = bytes.readUnsignedShort();
            var tStar = bytes.readByte();
            GameCache.totems.initTotemsData(tId, tJ, tStar);
        }
        App.MessageCenter.dispatch(MsgConst.TOTEMS_INFO);
    };
    TotemsProxy.prototype.doSingleResonanInfo = function (bytes) {
        var cId = bytes.readUnsignedShort();
        var lvl = bytes.readUnsignedShort();
        GameCache.totems.initResonanData(cId, lvl);
        App.MessageCenter.dispatch(MsgConst.TOTEMS_RESONANCE);
    };
    TotemsProxy.prototype.doResonanInfo = function (bytes) {
        var len = bytes.readInt();
        for (var i = 0; i < len; i++) {
            var cId = bytes.readUnsignedShort();
            var lvl = bytes.readUnsignedShort();
            GameCache.totems.initResonanData(cId, lvl);
        }
        App.MessageCenter.dispatch(MsgConst.TOTEMS_RESONANCE);
    };
    //////////////////////////////////////////////////////////
    /**请求图腾信息 */
    TotemsProxy.prototype.sendTotemsInfo = function () {
        var bytes = this.getBytes(1);
        this.sendToServer(bytes);
    };
    /**升级图腾 */
    TotemsProxy.prototype.sendUpGrade = function (id) {
        var bytes = this.getBytes(2);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    /**共鸣升级 */
    TotemsProxy.prototype.sendResonanceUpGrade = function (id) {
        var bytes = this.getBytes(3);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    return TotemsProxy;
}(BaseProxy));
__reflect(TotemsProxy.prototype, "TotemsProxy");
//# sourceMappingURL=TotemsProxy.js.map