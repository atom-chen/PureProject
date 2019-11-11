/**
 * 聊天系统
 */
class ChatProxy extends BaseProxy {
    public constructor() {
        super(PacketTypes.CHAT);

        this.regNetMsg(1, this.doGetChatMessage);
        this.regNetMsg(8, this.doErrorMessage);
        this.regNetMsg(2, this.doSysInfo);
        this.regNetMsg(9, this.doSysNotice);
    }

    private doGetChatMessage(bytes: GameByteArray): void {
        let channelId = bytes.readByte();
        let playerName = bytes.readCustomBytes();
        let playerId = bytes.readUnsignedInt();
        let sexual = bytes.readByte();
        let job = bytes.readByte();
        let lvl = bytes.readInt();
        let vipLvl = bytes.readByte();
        let message = bytes.readCustomBytes();
        GameCache.chat.initChatData(channelId, playerName, playerId, sexual, job, lvl, vipLvl, message);
    }

    /**错误提示 */
    private doErrorMessage(bytes: GameByteArray): void {
        let errorId = bytes.readInt();
        if (errorId && GameConfig.errotips[errorId]) {
            GlobalFun.SysMsg(GameConfig.errotips[errorId].dec);
        }
    }

    private doSysInfo(bytes: GameByteArray): void {
        let msg = bytes.readCustomBytes();
        // GameCache.chat.addSysMsg(msg);
    }

    private doSysNotice(bytes: GameByteArray) {
        let tipsId = bytes.readUnsignedShort();
        let type = bytes.readUnsignedShort();
        let con = GameConfig.brocast[tipsId];
        if (!con) return;
        //let type = con["type"];
        let des = con["desc"];
        let param: any[] = [];
        if (type == 0) { //不需要额外读数据

        } else if (type == 1) {//玩家数据
            param.push(this.getNoticeRoleInfo(bytes));
        } else if (type == 2) { //玩家、boss
            param.push(this.getNoticeRoleInfo(bytes));
            param.push(this.getNoticeBossInfo(bytes));
        } else if (type == 3) { //玩家、道具
            param.push(this.getNoticeRoleInfo(bytes));
            param.push(this.getNoticeItemInfo(bytes));
        } else if (type == 4) { //玩家、boss、道具
            param.push(this.getNoticeRoleInfo(bytes));
            param.push(this.getNoticeBossInfo(bytes));
            param.push(this.getNoticeItemInfo(bytes));
        } else if (type == 5) { //boss
            param.push(this.getNoticeBossInfo(bytes));
        }
        let msg = StringUtils.substitute(des, param)
        GlobalFun.SysMsg(msg, SysMessageType.SYSTEM_BARRAGE);
    }

    private getNoticeRoleInfo(bytes: GameByteArray): string {
        let actorId = bytes.readUnsignedInt();
        let sex = bytes.readUnsignedByte();
        let name = bytes.readCustomBytes();
        return GameCache.chat.createRoleLink(actorId, name, sex);
    }

    private getNoticeBossInfo(bytes: GameByteArray): string {
        let monsterId = bytes.readUnsignedShort();
        let std: StdMonster = GameConfig.monster[monsterId];
        return std ? std.name : "";
    }

    private getNoticeItemInfo(bytes: GameByteArray): string {
        let len = bytes.readUnsignedShort();
        let arr: string[] = [];
        while (len > 0) {
            arr.push(GameCache.chat.createItemLink(bytes.readUnsignedShort()));
            len--;
        }
        return arr.join(",");
    }



    public sendChatMessage(channelId: number = 1, message: string = "", filter: boolean = true): void {
        if (message == "") return;
        let bytes: GameByteArray = this.getBytes(1);
        bytes.writeByte(channelId);
        bytes.writeString(message);
        this.sendToServer(bytes);
    }
}