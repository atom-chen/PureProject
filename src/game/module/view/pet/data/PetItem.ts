/*
 * @Description: 宠物交互道具结构
 * @Author: liangzhaowei
 * @Date: 2019-08-01 20:23:04
 * @LastEditTime: 2019-08-12 19:34:33
 */
class PetItem {
    // /**宠物id */
    wid: number;
    /**状态 0未携带 1携带*/
    state: number;
    /**宠物阶数 */
    wStep: number;
    /**宠物等级 */
    wLevel: number;//WORD
    /**经验 */
    nExp: number;//UINT
    /**技能数量 */
    btSkillNum: number;
    /**成长值 */
    fGrowRate: number;
    /**改名后的名字 */
    name: string;


    public constructor() {
        // this.init(bytes);
    }

    public init(bytes: GameByteArray): void {
        if (!bytes) return;
        this.wid = bytes.readUnsignedShort();
        this.state = bytes.readByte();
        this.wStep = bytes.readUnsignedShort();
        this.wLevel = bytes.readUnsignedShort();//WORD
        this.nExp = bytes.readUnsignedInt();//UINT
        this.btSkillNum = bytes.readByte();
        this.fGrowRate = bytes.readInt()/100;
        this.name = bytes.readCustomBytes();
    }


    public update(bytes: GameByteArray): void {
        this.state = bytes.readByte();
        this.wStep = bytes.readUnsignedShort();
        this.wLevel = bytes.readUnsignedShort();//WORD
        this.nExp = bytes.readUnsignedInt();//UINT
        this.btSkillNum = bytes.readByte();
        this.fGrowRate = bytes.readInt()/100;
        this.name = bytes.readCustomBytes();
    }




}