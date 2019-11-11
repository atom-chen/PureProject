/**
 * 掉落系统
*/
class DropProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.DROP);

		this.regNetMsg(10, this.doCreateDropPacket);
		this.regNetMsg(11, this.doDelPacket);
	}

	private doCreateDropPacket(bytes: GameByteArray) {
		let packetId: number = bytes.readUnsignedInt();
		let id: number = bytes.readUnsignedShort();    //物品id,0为金币  65535表示元宝
		let x: number = bytes.readUnsignedShort();
		let y: number = bytes.readUnsignedShort();

		let icon: number = bytes.readUnsignedShort();
		let needTip: boolean = bytes.readByte() == 1;      //是否需要物品提示
		let dropActor: number = bytes.readInt();			//丢弃人的id
		let canPick: boolean = bytes.readByte() == 1;

		App.ThingManager.addDrop(packetId, id, x, y, false);
	}

	/**
	 * 删除掉落物品包 
	 * @param recog
	 * 
	 */
	private doDelPacket(bytes: GameByteArray): void {
		let packetId: number = bytes.readUnsignedInt();
		App.ThingManager.removeDrop(packetId);
	}

	/**********************************************************************************/
	public sendPickupDropItem(packetId: number): void {
		var bytes = this.getBytes(9);
		bytes.writeInt(packetId);
		this.sendToServer(bytes);
	}
}