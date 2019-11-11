/*
 * @Description: 徽章协议
 * @Author: xiejunwei
 * @Date: 2019-08-27 20:24:54
 * @LastEditTime: 2019-08-28 10:43:51
 */
class BadgeProxy extends BaseProxy {
    public constructor() {
        super(PacketTypes.BADGE);

    }


    public sendBadgeUpGrade(): void {
        let bytes: GameByteArray = this.getBytes(2);
        this.sendToServer(bytes);
    }

}