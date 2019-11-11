var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 宠物交互道具结构
 * @Author: liangzhaowei
 * @Date: 2019-08-01 20:23:04
 * @LastEditTime: 2019-08-14 16:30:20
 */
var DailyItem = (function () {
    function DailyItem() {
        // this.init(bytes);
    }
    DailyItem.prototype.init = function (bytes) {
        if (!bytes)
            return;
        this.id = bytes.readByte();
        this.update(bytes);
    };
    DailyItem.prototype.update = function (bytes) {
        this.state = bytes.readByte();
        this.val = bytes.readUnsignedShort();
        this.useVal = bytes.readUnsignedShort(); //
    };
    return DailyItem;
}());
__reflect(DailyItem.prototype, "DailyItem");
//# sourceMappingURL=DailyItem.js.map