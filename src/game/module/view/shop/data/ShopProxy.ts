/*
 * @Description: 商店协议
 * @Author: liangzhaowei
 * @Date: 2019-09-23 16:17:12
 */

class ShopProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.SHOP);

		this.regNetMsg(1, this.doInit); //商城信息
		this.regNetMsg(2, this.doBuyTime); //商城购买返回信息
		this.regNetMsg(3, this.doShopScore); //商城积分
	}


	public doInit(pBytes: GameByteArray) {

		let type = pBytes.readByte();
		let count = pBytes.readUnsignedShort();
		let shopObj = {};
		for (let i = 0; i < count; i++) {
			shopObj[pBytes.readByte()] = pBytes.readUnsignedShort();
		}
		GameCache.shop.initData(type, shopObj);
		App.MessageCenter.dispatch(MsgConst.SHOP_INFO + type);
	}

	public doBuyTime(pBytes: GameByteArray) {
		let type = pBytes.readByte();
		let id = pBytes.readByte();
		let time = pBytes.readShort();
		if (GameCache.shop.shopData[type]) {
			GameCache.shop.shopData[type][id] = time;
		}
		App.MessageCenter.dispatch(MsgConst.SHOP_INFO + type);
	}

	public doShopScore(pBytes: GameByteArray) {

	}


	/**商城购买*/
	public sendShopBuy(type: number, id: number, count: number) {
		let bytes: GameByteArray = this.getBytes(1);
		bytes.writeByte(type);
		bytes.writeByte(id);
		bytes.writeUnsignedShort(count);
		this.sendToServer(bytes);
	}




}