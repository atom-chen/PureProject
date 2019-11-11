var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 宠物交互道具结构
 * @Author: liangzhaowei
 * @Date: 2019-08-01 20:23:04
 * @LastEditTime: 2019-08-12 19:34:33
 */
var PetItem = (function () {
    function PetItem() {
        // this.init(bytes);
    }
    PetItem.prototype.init = function (bytes) {
        if (!bytes)
            return;
        this.wid = bytes.readUnsignedShort();
        this.state = bytes.readByte();
        this.wStep = bytes.readUnsignedShort();
        this.wLevel = bytes.readUnsignedShort(); //WORD
        this.nExp = bytes.readUnsignedInt(); //UINT
        this.btSkillNum = bytes.readByte();
        this.fGrowRate = bytes.readInt() / 100;
        this.name = bytes.readCustomBytes();
    };
    PetItem.prototype.update = function (bytes) {
        this.state = bytes.readByte();
        this.wStep = bytes.readUnsignedShort();
        this.wLevel = bytes.readUnsignedShort(); //WORD
        this.nExp = bytes.readUnsignedInt(); //UINT
        this.btSkillNum = bytes.readByte();
        this.fGrowRate = bytes.readInt() / 100;
        this.name = bytes.readCustomBytes();
    };
    return PetItem;
}());
__reflect(PetItem.prototype, "PetItem");
//# sourceMappingURL=PetItem.js.map