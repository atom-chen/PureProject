var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 宠物交互道具结构
 * @Author: liangzhaowei
 * @Date: 2019-08-01 20:23:04
 * @LastEditTime: 2019-08-21 15:21:31
 */
var CopyTowerItem = (function () {
    function CopyTowerItem() {
    }
    CopyTowerItem.prototype.init = function (bytes) {
        if (!bytes)
            return;
        this.layer = bytes.readUnsignedShort();
        this.getState = bytes.readByte();
        this.luckHaveTime = bytes.readUnsignedShort();
        this.luckLeftTime = bytes.readUnsignedShort();
        var count = bytes.readByte();
        this.dailList = {};
        for (var i = 0; i < count; i++) {
            this.dailList[bytes.readByte()] = bytes.readByte();
        }
    };
    return CopyTowerItem;
}());
__reflect(CopyTowerItem.prototype, "CopyTowerItem");
//# sourceMappingURL=CopyTowerItem.js.map