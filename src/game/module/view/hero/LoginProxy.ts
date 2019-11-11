/**
 * 登录
*/
class LoginProxy extends BaseProxy {
	public constructor() {
		super(PacketTypes.LOGIN);

		this.regNetMsg(1, this.doCheckAccount);//向客户端返回登陆的错误
		this.regNetMsg(2, this.doRoleList);//向客户端下发用户列表
		this.regNetMsg(3, this.doCreateRoleBack);//创建角色
	}

	/**
	 * 处理登录认证
	 * 255-1
	 * @param bytes
	 */
	private doCheckAccount(bytes: GameByteArray): void {
		let result: number = bytes.readByte();
		console.log("登录错误#" + result);
	}


	private doCreateRoleBack(bytes: GameByteArray): void {
		var roleId: number = bytes.readUnsignedInt();
		var result: number = bytes.readByte();
		//创建成功
		if (!result) {
			//发送角色查询消息，刷新角色列表
			let bytes: GameByteArray = this.getBytes(3);
			this.sendToServer(bytes);
			return;
		}
		//GlobalFun.SysMsg("创建角色错误："+ result);
		App.MessageCenter.dispatch(MsgConst.CREATE_ROLE_ERROR, result);
	}

	/**
	 * 处理角色列表
	 * 255-4
	 * @param bytes
	 */
	private doRoleList(bytes: GameByteArray): void {
		let id: number = bytes.readInt();
		let code: number = bytes.readByte();
		let roleArr: SelectRoleData[] = [];
		console.log("返回角色列表", code);
		switch (code) {
			case 0:
				SceneManager.ins().runScene(CreateRoleScene);
				break;
			default:
				let roleNum: number = code;
				for (let i: number = 0; i < roleNum; i++) {
					let role = new SelectRoleData(bytes);
					roleArr.push(role);
				}
				if (roleNum >= 1) {
					SceneManager.ins().runScene(MainScene);
					Proxy.main.sendEnterGameScene(id, roleArr[0].id);
				} 
				break;
		}
		App.MessageCenter.dispatch(MsgConst.GET_ROLELIST, id, roleArr);
		LocationProperty.enterGame();
	}

	/**
	 * 请求创建角色
	 * 255-4
	 * @param roleName
	 * @param sex
	 * @param job
	 * @param head
	 * @param camp
	 * @param pf
	 */
	public sendCreateRole(roleName: string, sex: number, job: number, head: number = 0, camp: number = 0, pf: string): void {
		let bytes: GameByteArray = this.getBytes(4);
		bytes.writeString(roleName);
		bytes.writeByte(sex);
		bytes.writeByte(job);
		bytes.writeByte(head);
		bytes.writeByte(camp);
		bytes.writeString(LocationProperty.pfid);
		//bytes.writeString(LocationProperty.appid);
		bytes.writeInt(parseInt(LocationProperty.appid));
		this.sendToServer(bytes);
	}

}