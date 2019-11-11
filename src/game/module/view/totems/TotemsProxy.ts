/*
 * @Description: 图腾协议
 * @Author: xiejunwei
 * @Date: 2019-08-27 20:03:54
 * @LastEditTime: 2019-08-29 16:58:09
 */
class TotemsProxy extends BaseProxy {
    public constructor() {
        super(PacketTypes.TOTEMS);

        this.regNetMsg(1, this.doSingleTotemsInfo); //单个图腾信息
        this.regNetMsg(2, this.doTotemsInfo); //所有图腾信息
        this.regNetMsg(3, this.doSingleResonanInfo); //单个图腾共鸣信息
        this.regNetMsg(4, this.doResonanInfo); //所有图腾共鸣信息
    }

    private doSingleTotemsInfo(bytes: GameByteArray): void {
        let tId = bytes.readByte();
        let tJ = bytes.readUnsignedShort();
        let tStar = bytes.readByte();
        GameCache.totems.initTotemsData(tId, tJ, tStar);
        App.MessageCenter.dispatch(MsgConst.TOTEMS_INFO);
    }

    private doTotemsInfo(bytes: GameByteArray): void {
        let len = bytes.readInt();
        for (let i = 0; i < len; i++) {
            let tId = bytes.readByte();
            let tJ = bytes.readUnsignedShort();
            let tStar = bytes.readByte();
            GameCache.totems.initTotemsData(tId, tJ, tStar);
        }
        App.MessageCenter.dispatch(MsgConst.TOTEMS_INFO);
    }

    private doSingleResonanInfo(bytes: GameByteArray): void {
        let cId = bytes.readUnsignedShort();
        let lvl = bytes.readUnsignedShort();
        GameCache.totems.initResonanData(cId, lvl);
        App.MessageCenter.dispatch(MsgConst.TOTEMS_RESONANCE);
    }

    private doResonanInfo(bytes: GameByteArray): void {
        let len = bytes.readInt();
        for (let i = 0; i < len; i++) {
            let cId = bytes.readUnsignedShort();
            let lvl = bytes.readUnsignedShort();
            GameCache.totems.initResonanData(cId, lvl);
        }
        App.MessageCenter.dispatch(MsgConst.TOTEMS_RESONANCE);
    }

    //////////////////////////////////////////////////////////

    /**请求图腾信息 */
    public sendTotemsInfo(): void {
        let bytes: GameByteArray = this.getBytes(1);
        this.sendToServer(bytes);
    }

    /**升级图腾 */
    public sendUpGrade(id): void {
        let bytes: GameByteArray = this.getBytes(2);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    }

    /**共鸣升级 */
    public sendResonanceUpGrade(id): void {
        let bytes: GameByteArray = this.getBytes(3);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    }
}