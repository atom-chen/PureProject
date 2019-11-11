/*
 * @Description: 符碑协议
 * @Author: xiejunwei
 * @Date: 2019-09-18 19:40:41
 */
class RuneProxy extends BaseProxy {
    public constructor() {
        super(PacketTypes.RUNE);

        this.regNetMsg(2, this.doInitRuneData);         //初始化所有符碑信息
        this.regNetMsg(1, this.doInitSingleRune);       //初始化单个符碑信息
    }

    private doInitRuneData(bytes: GameByteArray): void {
        let len = bytes.readInt();
        for (let i = 0; i < len; i++) {
            let idx = bytes.readByte();
            let lvl = bytes.readUnsignedShort();
            let star = bytes.readByte();
            let exp = bytes.readInt();
            GameCache.rune.initRuneData(idx - 1, lvl, star, exp);
        }
        App.MessageCenter.dispatch(MsgConst.RUNE_INFO);
    }

    private doInitSingleRune(bytes: GameByteArray): void {
        let idx = bytes.readByte();
        let lvl = bytes.readUnsignedShort();
        let star = bytes.readByte();
        let exp = bytes.readInt();
        GameCache.rune.initRuneData(idx - 1, lvl, star, exp);
        App.MessageCenter.dispatch(MsgConst.RUNE_INFO);
    }

    //////////////////////////////////////////////////////

    /**
     * 请求升级符碑
     * @param roleIdx角色下标,itemNum升级需要物品数量，itemId升级需要物品ID
     */
    public sendRuneLvlUp(roleIdx, itemNum, itemId): void {
        let bytes: GameByteArray = this.getBytes(1);
        let serId = GameCache.hero.getServerIdByIndex(roleIdx);
        bytes.writeInt(serId);
        bytes.writeUnsignedShort(roleIdx + 1);
        bytes.writeUnsignedShort(itemNum);
        bytes.writeInt(itemId);
        this.sendToServer(bytes);
    }
}