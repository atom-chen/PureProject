/*
 * @Description:
 * @Author: guolinsen
 * @Date: 2019-06-04 11:05:04
 * @LastEditTime: 2019-08-20 19:28:28
 */
class SelectRoleData {
	public id: number;
	public name: string;
	public level: number;
	public zsLevel: number;
	public vipLevel: number;
	public power: number;
	public roleClass: number;
	public sex: number;

	public constructor(bytes: GameByteArray) {
		this.id = bytes.readUnsignedInt();
		this.name = bytes.readCustomBytes();
		bytes.readUnsignedByte(); //头像
		this.sex = bytes.readByte();
		this.level = bytes.readInt();
		this.zsLevel = bytes.readByte();
		this.roleClass = bytes.readByte();//职业
		bytes.readByte();//阵营
		bytes.readByte();//isBan
		//this.vipLevel = bytes.readInt();

	}
}