/*
 * @Description: 签到协议
 * @Author: guolinsen
 * @Date: 2019-09-10 20:09:37
 * @LastEditTime: 2019-09-10 20:11:17
 */
class SignProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.GETGIFTOL);
	}
	public sendPrize(id: number): void {
		let bytes = this.getBytes(3);
		bytes.writeUnsignedShort(id);
		this.sendToServer(bytes);
	}
}