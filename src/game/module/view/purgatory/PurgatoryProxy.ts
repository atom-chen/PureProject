/*
 * @Description: 炼狱装备代理类
 * @Author: moyusheng
 * @Date: 2019-10-14 16:05:19
 */
class PurgatoryProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.PURGATORY);
		this.regNetMsg(1, this.doUpdateData);
		this.regNetMsg(2, this.doInitData);
	}

	/**
	 * 初始化角色身上的炼狱装备
	 * @param  {GameByteArray} bytes
	 * @returns void
	 */
	private doInitData(bytes: GameByteArray): void {
		let roleId: number = GameCache.hero.transIdFromeServer(bytes.readUnsignedInt());    //角色id
		let len: number = bytes.readByte();    //装备个数
		let eqMap = {}//装备列表
		for (let i = 0; i < len; i++) {
			let pos = bytes.readByte();   //装备的位置
			let lv = bytes.readShort(); // 等级
			eqMap[pos] = lv;
		}
		GameCache.purgatory.updatePurgatory(roleId, eqMap);
		App.MessageCenter.dispatch(MsgConst.EQUIP_PURGATORY);
	}

	/**
	 * 部位数据更新
	 * @param  {GameByteArray} bytes
	 * @returns void
	 */
	private doUpdateData(bytes: GameByteArray): void {
		let roleId: number = GameCache.hero.transIdFromeServer(bytes.readUnsignedInt());    //角色id
		let pos = bytes.readByte();   //装备的位置
		let lv = bytes.readShort(); // 等级
		let map = {};
		map[pos] = lv;
		GameCache.purgatory.updatePurgatory(roleId, map);
		App.MessageCenter.dispatch(MsgConst.EQUIP_PURGATORY);
	}

	/**
	 * 请求升级
	 * @param  {number} roleIdx
	 * @param  {number} part
	 * @param  {number} lv
	 * @param  {number} item1
	 * @param  {number} item2
	 * @returns void
	 */
	public upgradeReq(roleIdx: number, part: number, lv: number, item1: number, item2: number): void {
		let bytes: GameByteArray = this.getBytes(1);
		let id = GameCache.hero.getServerIdByIndex(roleIdx);
		bytes.writeInt(id);
		bytes.writeByte(part);
		bytes.writeShort(lv);
		bytes.writeInt(item1);
		bytes.writeInt(item2);
		this.sendToServer(bytes);
	}

}