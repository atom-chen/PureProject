var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 宠物交互道具结构
 * @Author: liangzhaowei
 * @Date: 2019-08-01 20:23:04
 * @LastEditTime: 2019-09-25 14:58:10
 */
var RankItemData = (function () {
    function RankItemData() {
    }
    RankItemData.prototype.init = function (bytes) {
        if (!bytes)
            return;
        this.rank = bytes.readInt();
        this.wid = bytes.readUnsignedInt();
        this.name = bytes.readCustomBytes();
        this.job = bytes.readByte();
        this.sex = bytes.readByte();
        this.vipLv = bytes.readByte();
        this.badgeLv = bytes.readByte();
        this.rankValue = bytes.readUnsignedInt();
    };
    return RankItemData;
}());
__reflect(RankItemData.prototype, "RankItemData");
//# sourceMappingURL=RankItemData.js.map