/*
 * @Description: 宝石协议
 * @Author: xiejunwei
 * @Date: 2019-09-10 17:19:19
 * @LastEditTime: 2019-09-11 21:41:01
 */
class JewelProxy extends BaseProxy {
    public constructor() {
        super(PacketTypes.JEWEL);

        this.regNetMsg(1, this.doInitJewelBag);     //初始化宝石背包
        this.regNetMsg(2, this.doRoleJewelList);    //初始化人物宝石列表
        this.regNetMsg(3, this.doAddJewel);         //宝石背包添加
        this.regNetMsg(4, this.doDeleteJewel);      //宝石背包删除
        this.regNetMsg(5, this.doJewelOption);      //宝石数据操作
    }

    private doInitJewelBag(bytes: GameByteArray): void {
        let len = bytes.readUnsignedShort();
        for (let i = 0; i < len; i++) {
            let id = bytes.readInt();
            GameCache.jewel.initJewelBag(id);
        }
        App.MessageCenter.dispatch(MsgConst.JEWEL_BAG);
    }

    private doRoleJewelList(bytes: GameByteArray): void {
        let roleId = GameCache.hero.transIdFromeServer(bytes.readInt());
        let len = bytes.readByte();
        let arr = {};
        for (let i = 0; i < len; i++) {
            let obj = {};
            obj["part"] = bytes.readByte();
            obj["id"] = bytes.readInt();
            obj["lvl"] = bytes.readUnsignedShort();
            arr[obj["part"]] = obj;
        }
        GameCache.jewel.roleJewelList[roleId] = arr;
        App.MessageCenter.dispatch(MsgConst.JEWEL_LIST);
    }

    private doAddJewel(bytes: GameByteArray): void {
        let id = bytes.readInt();
        GameCache.jewel.initJewelBag(id);
        let item = GameConfig.item[id];
        let mes: string = ItemUtils.getItemNamewithColor(item) + " x1";
        GlobalFun.SysMsg(StringUtils.substitute(Language.lang.huode, mes), SysMessageType.CHAT_PANEL_RIGHT);
        App.MessageCenter.dispatch(MsgConst.JEWEL_BAG);
    }

    private doDeleteJewel(bytes: GameByteArray): void {
        let id = bytes.readInt();
        GameCache.jewel.deleteJewel(id);
        App.MessageCenter.dispatch(MsgConst.JEWEL_BAG);
    }

    private doJewelOption(bytes: GameByteArray): void {
        let roleId = GameCache.hero.transIdFromeServer(bytes.readInt());
        let part = bytes.readByte();
        let id = bytes.readInt();
        let lvl = bytes.readUnsignedShort();
        let obj = {
            part: part,
            id: id,
            lvl: lvl
        }
        let arr = GameCache.jewel.roleJewelList[roleId];
        if (!arr) {
            arr = GameCache.jewel.roleJewelList[roleId] = {};
        }
        arr[part] = obj;
        App.MessageCenter.dispatch(MsgConst.JEWEL_LIST);
    }


    ///////////////////////////////////////////////////////////////

    /**
     * 镶嵌宝石
     * @param role角色下标，part部位，宝石ID
     */
    public sendSetJewel(role, part, id): void {
        let roleId = GameCache.hero.getServerIdByIndex(role);
        let bytes: GameByteArray = this.getBytes(1);
        bytes.writeInt(roleId);
        bytes.writeByte(part);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    }

    /**
     * 脱下宝石
     * @param role角色下标，part部位
     */
    public sendOffJewel(role, part): void {
        let roleId = GameCache.hero.getServerIdByIndex(role);
        let bytes: GameByteArray = this.getBytes(2);
        bytes.writeInt(roleId);
        bytes.writeByte(part);
        this.sendToServer(bytes);
    }

    /**
     * 升级宝石
     * @param role角色下标，part部位
     */
    public sendUpGrade(role, part): void {
        let roleId = GameCache.hero.getServerIdByIndex(role);
        let bytes: GameByteArray = this.getBytes(3);
        bytes.writeInt(roleId);
        bytes.writeByte(part);
        this.sendToServer(bytes);
    }

    /**
     * 分解宝石
     * @param arr 宝石ID数组
     */
    public sendDecomposition(arr: any[]): void {
        if (!arr) return;
        let len = arr.length;
        let bytes: GameByteArray = this.getBytes(4);
        bytes.writeUnsignedShort(len);
        for (let i of arr) {
            bytes.writeInt(i);
        }
        this.sendToServer(bytes);
    }

    /**
     * 替换宝石
     * @param role角色下标，part部位，宝石ID
     */
    public sendReplace(role, part, id): void {
        let roleId = GameCache.hero.getServerIdByIndex(role);
        let bytes: GameByteArray = this.getBytes(5);
        bytes.writeInt(roleId);
        bytes.writeByte(part);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    }

}