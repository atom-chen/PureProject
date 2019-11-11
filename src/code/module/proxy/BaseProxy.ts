/**
 * Created by linsen on 2019/5/30.
 * 和服务端通信
*/
class BaseProxy extends egret.HashObject{
	/**系统id*/
	private sysId: number;
	public constructor(sysId) {
		super();
		this.sysId = sysId;
	}
	/**
     * 从对象池获取一个bytes对象
    */
	private getGameByteArray(): GameByteArray {
		return GameByteArray.getBytes();
	}
	/**
	 * 获取一个消息号bytes对象
	*/
	protected getBytes(msgid: number): GameByteArray {
		let bytes = this.getGameByteArray();
		bytes.writeCmd(this.sysId, msgid);
		return bytes;
	}

	/**
	 * 只请求消息号，
	*/
	protected sendMsgId(msgid: number) {
		let bytes = this.getGameByteArray();
		bytes.writeCmd(this.sysId, msgid);
		this.sendToServer(bytes);
	}

	/**
	 * 发送到服务器
	 * @param bytes
	 */
	protected sendToServer(bytes: GameByteArray): void {
		App.Socket.sendToServer(bytes);
	}

	/**侦听收到服务器信息 */
	protected regNetMsg(msgId: number, fun: (...params: any[]) => void): void {
		App.Socket.registerSTCFunc(this.sysId, msgId, fun, this);
	}
}