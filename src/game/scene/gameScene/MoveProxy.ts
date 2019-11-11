/**
 * 移动子系统
*/
class MoveProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.MOVE);
	}

	/**通知后端当前坐标*/
	sendMoveto(x: number, y: number, id:number) {
		let bytes: GameByteArray = this.getBytes(1);
		bytes.writeUnsignedInt(id);
		bytes.writeUnsignedShort(x);
		bytes.writeUnsignedShort(y);
		bytes.writeUnsignedInt(0); //服务器时间
		bytes.writeUnsignedShort(GameCache.map.mapId);
		this.sendToServer(bytes);
		//traceDebug("上发坐标", x, y);
	}
}