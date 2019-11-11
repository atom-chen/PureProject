/*
 * @Description: 翅膀协议
 * @Author: xiejunwei
 * @Date: 2019-08-14 18:02:28
 * @LastEditTime: 2019-09-27 15:57:51
 */
class WingProxy extends BaseProxy {
    public constructor() {
        super(PacketTypes.WING);

        this.regNetMsg(1, this.doWingInfo);  //翅膀信息
    }

    private doWingInfo(bytes: GameByteArray): void {
        let roleid = GameCache.hero.transIdFromeServer(bytes.readUnsignedInt());
        let lvl = bytes.readUnsignedShort();
        let exp = bytes.readUnsignedInt();
        let count = bytes.readByte();  //剩余金币培养次数
        GameCache.wing.initWingData(roleid, lvl, exp, count);
    }

    /**
     * 请求翅膀消息
     */
    public sendWingInfo(role): void {
        let roleId = GameCache.hero.getServerIdByIndex(role);
        let bytes = this.getBytes(1);
        bytes.writeByte(roleId);
        this.sendToServer(bytes);
    }

    /**
     * 翅膀升级
     * @param type为升级类型，1为使用道具，0为使用金币 ,2为一键升星
     */
    public sendWingUpgrade(role, type): void {
        let bytes = this.getBytes(2);
        let roleId = GameCache.hero.getServerIdByIndex(role);
        bytes.writeInt(roleId);
        bytes.writeByte(type);
        this.sendToServer(bytes);
    }
}