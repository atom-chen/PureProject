/*
 * @Description: 杂项脚本协议
 * @Author: xiejunwei
 * @Date: 2019-08-01 15:44:05
 * @LastEditTime: 2019-10-21 15:42:26
 */
class ScriptProxy extends BaseProxy {
    public constructor() {
        super(PacketTypes.SCRIPT);

        this.regNetMsg(13, this.doRankData);
        this.regNetMsg(1, this.doRevive);
        this.regNetMsg(26, this.doRankInfo);
        this.regNetMsg(3, this.doInitXSYh); //限时优惠信息
        this.regNetMsg(2, this.doXSYHBuyDone); //限时优惠购买成功
        this.regNetMsg(4, this.doInitXSLB);  //限时礼包信息
        this.regNetMsg(5, this.doXSLBBuyDone); //限时礼包购买
        // this.regNetMsg(27, this.doRankSelf);
    }

    private doRankData(bytes: GameByteArray): void {

    }


    /**复活消息 */
    public doRevive(bytes: GameByteArray) {
        let bOpen = bytes.readByte();/**是否打开界面 */
        let time = bytes.readUnsignedInt();/**复活时间 */
        let count = bytes.readByte();
        let roleList = []
        for (let i = 0; i < count; i++) {
            let obj = { job: 0, sex: 0 }
            obj.job = bytes.readByte();
            obj.sex = bytes.readByte();
            roleList.push(obj);
        }

        /**记录复活数据 */
        GameCache.revive.leftTime = time;
        GameCache.revive.reveiveList = roleList;


        if (bOpen) {
            /**性别需要后期加进去的 */
            let viewData = new ViewProp();
            viewData.exData1 = roleList;
            viewData.exData2 = time;
            App.ViewManager.open(ViewConst.REVIVE, viewData);
        }
    }

    private doRankInfo(bytes: GameByteArray): void {
        let bossid = bytes.readUnsignedShort();
        let len = bytes.readUnsignedShort();
        let arr = [];
        for (let i = 0; i < len; i++) {
            let rank = bytes.readUnsignedShort();
            let roleId = bytes.readUnsignedInt();
            let roleName = bytes.readCustomBytes();
            let value = bytes.readUnsignedInt();
            let obj = {
                bossid: bossid,
                rank: rank + 1,
                roleId: roleId,
                roleName: roleName,
                value: value
            }
            arr.push(obj);
        }
        let myRank = bytes.readShort() + 1;
        let myValue = bytes.readUnsignedInt();
        App.MessageCenter.dispatch(MsgConst.BOSS_RANK_INFO, [arr, myRank, myValue]);
    }

    private doRankSelf(bytes: GameByteArray): void {
        let bossId = bytes.readUnsignedShort();
        let roleId = bytes.readUnsignedInt();
        let rank = bytes.readShort();
        let value = bytes.readUnsignedInt();
        let obj = {
            bossid: bossId,
            rank: rank + 1,
            roleId: roleId,
            value: value,
            roleName: GameCache.hero.mainPro.charName
        }
        App.MessageCenter.dispatch(MsgConst.BOSS_MYRANK, obj);
    }

    //限时优惠初始化
    private doInitXSYh(bytes: GameByteArray): void {
        let day = bytes.readInt();  //开服天数
        let len = bytes.readUnsignedShort();
        let arr = {};
        for (let i = 0; i < len; i++) {
            let idx = bytes.readUnsignedShort();
            let count = bytes.readByte();
            arr[idx] = count;
        }
        GameCache.activity.xsyhData[day] = arr;
        GameCache.activity.serverOpen = day;
        App.MessageCenter.dispatch(MsgConst.XSYH_INFO);
    }

    //限时优惠购买信息
    private doXSYHBuyDone(bytes: GameByteArray): void {
        let idx = bytes.readUnsignedShort();
        GameCache.activity.XSYHBough(idx);
        App.MessageCenter.dispatch(MsgConst.XSYH_BUY_SUCCESS, idx);
    }

    //限时礼包初始化
    private doInitXSLB(bytes: GameByteArray): void {
        let day = bytes.readInt();
        let len = bytes.readUnsignedShort();
        let arr = {};
        for (let i = 0; i < len; i++) {
            let idx = bytes.readUnsignedShort();
            let count = bytes.readByte();
            arr[idx] = count;
        }
        GameCache.activity.xslbData[day] = arr;
        GameCache.activity.serverOpen = day;
        App.MessageCenter.dispatch(MsgConst.XSYH_INFO);
    }

    //限时礼包购买信息
    private doXSLBBuyDone(bytes: GameByteArray): void {
        let idx = bytes.readUnsignedShort();
        GameCache.activity.XSLBBough(idx);
        App.MessageCenter.dispatch(MsgConst.XSYH_BUY_SUCCESS, idx);
    }

    /////////////////////////////////////////////////////////////////////////////////

    /**
     * 发送复活消息
     * @param type 1为原地复活，2为安全区复活
     */
    public sendRevive(type): void {
        let byte: GameByteArray = this.getBytes(1);
        byte.writeByte(type);
        this.sendToServer(byte);
    }

    /**
     * 限时优惠购买
     * @param idx 索引
     */
    public sendXSYHBuy(idx: number): void {
        let byte: GameByteArray = this.getBytes(2);
        byte.writeUnsignedShort(idx);
        this.sendToServer(byte);
    }

    /**
     * 限时礼包购买
     * @param idx 索引
     */
    public sendXSLBBuy(idx: number): void {
        let byte: GameByteArray = this.getBytes(3);
        byte.writeUnsignedShort(idx);
        this.sendToServer(byte);
    }
}