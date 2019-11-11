/*
 * @Description: 宠物交互道具结构
 * @Author: liangzhaowei
 * @Date: 2019-08-01 20:23:04
 * @LastEditTime: 2019-08-21 15:21:31
 */
class CopyTowerItem {
    /**爬塔当前层数 */
    layer: number;
    /**每日奖励是否领取 0未领取 1领取*/
    getState: number;
    /**已抽奖次数 */
    luckHaveTime: number;
    /**剩余抽奖次数 */
    luckLeftTime: number;
    /**幸运转盘数据 */
    dailList: any;


    public constructor() {
    }

    public init(bytes: GameByteArray): void {
        if (!bytes) return;
        this.layer = bytes.readUnsignedShort();
        this.getState = bytes.readByte();
        this.luckHaveTime = bytes.readUnsignedShort();
        this.luckLeftTime = bytes.readUnsignedShort();
        let count = bytes.readByte();
        this.dailList = {};
        for (let i = 0; i < count; i++) {
            this.dailList[bytes.readByte()] = bytes.readByte();
        }
    }






}