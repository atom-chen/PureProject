/*
 * @Description: 日常数据集
 * @Author: liangzhaowei
 * @Date: 2019-08-14 16:16:15
 * @LastEditTime: 2019-08-15 10:54:16
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
var DailyProxy = (function (_super) {
    __extends(DailyProxy, _super);
    function DailyProxy() {
        var _this = _super.call(this, PacketTypes.DAILY) || this;
        _this.regNetMsg(1, _this.doInit); //初始化数据
        _this.regNetMsg(2, _this.doRefreshPet); //刷新数据
        return _this;
    }
    DailyProxy.prototype.doInit = function (pBytes) {
        var count = pBytes.readByte();
        var list = {};
        for (var i = 0; i < count; i++) {
            var item = new DailyItem();
            item.init(pBytes);
            list[item.id] = item;
        }
        GameCache.daily.initServer(list);
        App.MessageCenter.dispatch(MsgConst.DAILY);
    };
    DailyProxy.prototype.doRefreshPet = function (pBytes) {
        GameCache.daily.upData(pBytes);
        App.MessageCenter.dispatch(MsgConst.DAILY);
    };
    /**请求单个日常任务信息*/
    DailyProxy.prototype.askTaskInfo = function (id) {
        var bytes = this.getBytes(2);
        bytes.writeByte(id);
        this.sendToServer(bytes);
    };
    /**领取日常奖励*/
    DailyProxy.prototype.getTaskRw = function (id) {
        var bytes = this.getBytes(3);
        bytes.writeByte(id); //任务id
        this.sendToServer(bytes);
    };
    /**领取活跃度奖励*/
    DailyProxy.prototype.getActRw = function (id) {
        var bytes = this.getBytes(4);
        bytes.writeByte(id); //奖励索引
        this.sendToServer(bytes);
    };
    return DailyProxy;
}(BaseProxy));
__reflect(DailyProxy.prototype, "DailyProxy");
//# sourceMappingURL=DailyProxy.js.map