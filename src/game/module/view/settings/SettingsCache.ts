/*
 * @Description: 系统设置
 * @Author: guolinsen
 * @Date: 2019-08-12 16:00:03
 * @LastEditTime: 2019-10-31 10:01:40
 */
class SettingsCache extends BaseClass {

	private oData: any = {};  //默认数据
	private data: any = {};   //已变更的数据

	public constructor() {
		super();
	}

	clear() {
		this.data = {};
	}

	/**初始化默认设置*/
	init() {
		this.oData = {
			[SettingType.BOSS_REMIND]: 0,
			[SettingType.VIP_BOSS_REMIND]: 0,
			[SettingType.AUTO_RECYCLE]: 0,
		}
	}

	/**
	 * 更新数据
	 * type 设置类型 参考SettingType
	 * value 变更后的值
	 * save 是否立即保存至服务器
	*/
	update(type, value, save: boolean) {
		this.data[type] = value;
		if (save) {
			this.saveToServer();
		}
	}

	saveToServer() {
		Proxy.other.sendSystemConfigSave(this.data);
	}

	getValue(type) {
		return this.data[type] || this.oData[type] || 0;
	}
}