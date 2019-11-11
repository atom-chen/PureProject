/*
 * @Description: 扭蛋协议内容
 * @Author: liangzhaowei
 * @Date: 2019-10-08 14:04:38
 */
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
var GashaponProxy = (function (_super) {
    __extends(GashaponProxy, _super);
    function GashaponProxy() {
        var _this = _super.call(this, PacketTypes.GASHAPON) || this;
        _this.regNetMsg(1, _this.doBag); //仓库
        _this.regNetMsg(2, _this.doAddBag); //仓库
        _this.regNetMsg(3, _this.doRemoveBag); //仓库
        _this.regNetMsg(4, _this.doShow); //展示获得物品
        _this.regNetMsg(5, _this.doStack); //堆叠物品
        return _this;
    }
    GashaponProxy.prototype.doBag = function (pBytes) {
        var type = pBytes.readByte();
        var count = pBytes.readUnsignedShort();
        for (var i = 0; i < count; i++) {
            var item = new UserItem(pBytes);
            GameCache.gashapon.addBagItems(type, item);
        }
        //派送更新界面信息
        App.MessageCenter.dispatch(MsgConst.GASHAPON_BAG);
    };
    GashaponProxy.prototype.doAddBag = function (pBytes) {
        var type = pBytes.readByte();
        var item = new UserItem(pBytes);
        GameCache.gashapon.addBagItems(type, item);
        //派送更新界面信息
        App.MessageCenter.dispatch(MsgConst.GASHAPON_BAG);
    };
    GashaponProxy.prototype.doStack = function (pBytes) {
        var type = pBytes.readByte();
        var item = new UserItem(pBytes);
        GameCache.gashapon.addBagItems(type, item);
        //派送更新界面信息
        App.MessageCenter.dispatch(MsgConst.GASHAPON_BAG);
    };
    GashaponProxy.prototype.doRemoveBag = function (pBytes) {
        var type = pBytes.readByte();
        var count = pBytes.readShort();
        for (var i = 0; i < count; i++) {
            var sceId = new ItemSeries(pBytes).toString();
            GameCache.gashapon.removeBagItems(type, sceId);
        }
        //派送更新界面信息
        App.MessageCenter.dispatch(MsgConst.GASHAPON_BAG);
    };
    GashaponProxy.prototype.doShow = function (pBytes) {
        var type = pBytes.readByte();
        var count = pBytes.readByte();
        var list = [];
        for (var i = 0; i < count; i++) {
            var item = new UseCondition();
            item.id = pBytes.readInt();
            item.count = pBytes.readUnsignedShort();
            list.push(item);
        }
        if (list.length > 1) {
            /**打开十连 */
            if (type) {
                var viewData = new ViewProp();
                viewData.exData1 = type;
                viewData.exData2 = list;
                App.ViewManager.open(ViewConst.GASHAPONRW, viewData);
            }
            App.MessageCenter.dispatch(MsgConst.GASHAPON_TEN_GET, list);
        }
        else {
            App.MessageCenter.dispatch(MsgConst.GASHAPON_ONE_GET, list[0]);
        }
    };
    /**请求扭蛋(连抽)*/
    GashaponProxy.prototype.askGashapon = function (time, type) {
        var bytes = this.getBytes(1);
        bytes.writeByte(type);
        bytes.writeByte(time);
        this.sendToServer(bytes);
    };
    /**一键领取扭蛋仓库*/
    GashaponProxy.prototype.getAllRw = function (type) {
        var bytes = this.getBytes(2);
        bytes.writeInt(type);
        this.sendToServer(bytes);
    };
    /**请求扭蛋仓库*/
    GashaponProxy.prototype.getBag = function (type) {
        var bytes = this.getBytes(3);
        bytes.writeInt(type);
        this.sendToServer(bytes);
    };
    return GashaponProxy;
}(BaseProxy));
__reflect(GashaponProxy.prototype, "GashaponProxy");
//# sourceMappingURL=GashaponProxy.js.map