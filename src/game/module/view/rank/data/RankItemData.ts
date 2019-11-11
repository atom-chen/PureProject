/*
 * @Description: 宠物交互道具结构
 * @Author: liangzhaowei
 * @Date: 2019-08-01 20:23:04
 * @LastEditTime: 2019-09-25 14:58:10
 */
class RankItemData {

    //   int:  玩家排名
    rank: number;
    //   unsigned int : 玩家id
    wid: number;
    //   string: 玩家名
    name: string
    //   unsigned char: 玩家职业
    job: number;
    //   unsigned char: 玩家性别
    sex: number;
    //   unsigned char: vip等级
    vipLv: number;
    //   unsigned char: 徽章等级
    badgeLv: number;
    //   unsigned int : 排行榜数值
    rankValue: number;
    /**排行榜类型 */
    rankType: number;
    public constructor() {
    }

    public init(bytes: GameByteArray): void {
        if (!bytes) return;
        this.rank = bytes.readInt();
        this.wid = bytes.readUnsignedInt();
        this.name = bytes.readCustomBytes();
        this.job = bytes.readByte();
        this.sex = bytes.readByte();
        this.vipLv = bytes.readByte();
        this.badgeLv = bytes.readByte();
        this.rankValue = bytes.readUnsignedInt();
    }

}