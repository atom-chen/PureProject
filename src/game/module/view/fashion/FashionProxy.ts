/*
 * @Description: 时装信息
 * @Author: xiejunwei
 * @Date: 2019-08-05 10:39:10
 * @LastEditTime: 2019-10-14 15:40:24
 */
class FashionProxy extends BaseProxy {
    public constructor() {
        super(PacketTypes.FASHION);

        this.regNetMsg(1, this.doFashionBag);
        this.regNetMsg(2, this.doAddFashion);
        this.regNetMsg(3, this.doDelete);
        this.regNetMsg(5, this.doFashionList);
        // this.regNetMsg(4, this.doFashionAchive);
    }

    private doFashionBag(bytes: GameByteArray): void {
        let roleId = GameCache.hero.transIdFromeServer(bytes.readUnsignedInt());
        let type = bytes.readInt();
        let len = bytes.readInt();
        let idArr = [];
        for (let i = 0; i < len; i++) {
            let id = bytes.readInt();
            let time = bytes.readUnsignedInt();
            time && (time = (GlobalFun.formatMiniDateTime(time) / 1000));
            if (time > 0) {
                if (!GameCache.fashion.timeLimitItem[roleId])
                    GameCache.fashion.timeLimitItem[roleId] = {}
                GameCache.fashion.timeLimitItem[roleId][id] = time;
            }
            idArr.push(id);
        }
        if (!GameCache.fashion.fashionBag[roleId]) GameCache.fashion.fashionBag[roleId] = {};
        GameCache.fashion.fashionBag[roleId][type] = idArr;
    }

    private doAddFashion(bytes: GameByteArray): void {
        let roleId = GameCache.hero.transIdFromeServer(bytes.readUnsignedInt());
        let type = bytes.readInt();
        let id = bytes.readInt();
        let count = bytes.readInt();
        let time = (GlobalFun.formatMiniDateTime(bytes.readUnsignedInt()) / 1000);
        if (time > 0) {
            if (!GameCache.fashion.timeLimitItem[roleId])
                GameCache.fashion.timeLimitItem[roleId] = {}
            GameCache.fashion.timeLimitItem[roleId][id] = time;
        }
        GameCache.fashion.addFashionItem(roleId, type, id);
    }

    private doDelete(bytes: GameByteArray): void {
        let roleId = GameCache.hero.transIdFromeServer(bytes.readUnsignedInt());
        let type = bytes.readInt();
        let id = bytes.readInt();
        GameCache.fashion.deleteFashionItem(roleId, type, id);
        App.MessageCenter.dispatch(MsgConst.FASHION_DELETE);
    }

    private doFashionList(bytes: GameByteArray): void {
        let roleId = GameCache.hero.transIdFromeServer(bytes.readInt());
        let len = bytes.readByte();
        GameCache.fashion.cleanRoleFashion(roleId);
        for (let i = 0; i < len; i++) {
            let id = bytes.readInt();
            GameCache.fashion.initRoleFashion(id, roleId);
        }
        App.MessageCenter.dispatch(MsgConst.FASHION_INFO);
    }

    /**
     * 购买时装
     * @param  itemid时装ID ，num数量
     */
    public sendFashionBuy(role, itemId, num = 1): void {
        let bytes: GameByteArray = this.getBytes(1);
        let roleId = GameCache.hero.getServerIdByIndex(role);
        bytes.writeInt(roleId);
        bytes.writeInt(itemId);
        bytes.writeInt(num);
        this.sendToServer(bytes);
    }

    /**
     * 装备时装
     * @param job itemid时装ID
     */
    public sendFashionEquip(role, itemId): void {
        let bytes: GameByteArray = this.getBytes(2);
        let roleId = GameCache.hero.getServerIdByIndex(role);
        bytes.writeInt(roleId);
        bytes.writeInt(itemId);
        this.sendToServer(bytes);
    }

    /**
     * 卸下时装
     * @param job partId部位ID
     */
    public sendTakeOff(role, partId): void {
        let bytes: GameByteArray = this.getBytes(3);
        let roleId = GameCache.hero.getServerIdByIndex(role);
        bytes.writeInt(roleId);
        bytes.writeInt(partId);
        this.sendToServer(bytes);
    }

    /**
     * 一键购买
     * @param job itemArr
     */
    public sendOneBuy(role, itemArr = []): void {
        let bytes: GameByteArray = this.getBytes(4);
        let roleId = GameCache.hero.getServerIdByIndex(role);
        bytes.writeInt(roleId);
        bytes.writeInt(itemArr.length);
        for (let i = 0; i < itemArr.length; i++) {
            bytes.writeInt(itemArr[i].id);
        }
        this.sendToServer(bytes);

    }

    /**
     * 一键穿戴
     */
    public sendOneWear(role, itemArr = []): void {
        let bytes: GameByteArray = this.getBytes(6);
        let roleId = GameCache.hero.getServerIdByIndex(role);
        bytes.writeInt(roleId);
        bytes.writeInt(itemArr.length);
        for (let i = 0; i < itemArr.length; i++) {
            bytes.writeInt(itemArr[i].id);
        }
        this.sendToServer(bytes);
    }

    /**
     * 一键卸下
     */
    public sendOneTakeOff(role): void {
        let bytes: GameByteArray = this.getBytes(5);
        let roleId = GameCache.hero.getServerIdByIndex(role);
        bytes.writeInt(roleId);
        this.sendToServer(bytes);
    }
}