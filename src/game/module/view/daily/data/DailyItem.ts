/*
 * @Description: 宠物交互道具结构
 * @Author: liangzhaowei
 * @Date: 2019-08-01 20:23:04
 * @LastEditTime: 2019-08-14 16:30:20
 */
class DailyItem {
    // /**任务id */
    id: number;//BYTE
    /**任务状态0表示不可用 1表示有效但是未完成 2表示完成但是未领奖 3表示领奖完*/
    state: number;//BYTE
    /**当前次数 */
    val: number;//WORD
    /**表示已经领奖的次数 后面活动日常使用 */
    useVal: number;//WORD


    public constructor() {
        // this.init(bytes);
    }

    public init(bytes: GameByteArray): void {
        if (!bytes) return;
        this.id = bytes.readByte();
        this.update(bytes);

    }


    public update(bytes: GameByteArray): void {
        this.state = bytes.readByte();
        this.val = bytes.readUnsignedShort();
        this.useVal = bytes.readUnsignedShort();//
    }




}