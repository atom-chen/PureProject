/*
 * @Description: 转职数据体
 * @Author: liangzhaowei
 * @Date: 2019-10-29 19:17:42
 */

class TransferItem {
    /**角色id 0/1/2*/
    public roldId: number;
    /**职业*/
    public job: number;
    /**性别*/
    public sex: number;
    /**转生转数 */
    public turnNum: number;
    /**转生等级 */
    public turnLv: number;
    /**转生经验 */
    public exp: number;
    /**道具使用次数 */
    public itemUseIime = {};



    public constructor() {
    }

    public init(bytes: GameByteArray): void {
        if (!bytes) return;
        this.roldId = GameCache.hero.transIdFromeServer(bytes.readInt());
        this.job = bytes.readByte();
        this.sex = bytes.readByte();
        this.turnNum = bytes.readUnsignedShort();
        this.turnLv = bytes.readUnsignedShort();
        this.exp = bytes.readUnsignedInt();
        this.itemUseIime[0] = bytes.readByte();
        this.itemUseIime[1] = bytes.readByte();
        this.itemUseIime[2] = bytes.readByte();


    }






}