var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description:
 * @Author: guolinsen
 * @Date: 2019-06-04 11:05:04
 * @LastEditTime: 2019-08-20 19:28:28
 */
var SelectRoleData = (function () {
    function SelectRoleData(bytes) {
        this.id = bytes.readUnsignedInt();
        this.name = bytes.readCustomBytes();
        bytes.readUnsignedByte(); //头像
        this.sex = bytes.readByte();
        this.level = bytes.readInt();
        this.zsLevel = bytes.readByte();
        this.roleClass = bytes.readByte(); //职业
        bytes.readByte(); //阵营
        bytes.readByte(); //isBan
        //this.vipLevel = bytes.readInt();
    }
    return SelectRoleData;
}());
__reflect(SelectRoleData.prototype, "SelectRoleData");
//# sourceMappingURL=SelectRoleData.js.map