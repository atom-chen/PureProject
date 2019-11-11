/*
 * @Description: 配置资源解析
 * @Author: guolinsen
 * @Date: 2019-06-04 20:23:14
 * @LastEditTime: 2019-08-28 10:40:19
 */
class ConfigCache {
	/**配置文件压缩包 */
	private static configZip: any;
	/**配置数据列表 */
	private static configDataList: Object = {};

	/* 系统开启映射表*/
	public static openCopySyObj: Object = {};


	public static read(data): void {
		if (!this.configZip)
			this.configZip = new JSZip(data);
	}

	public static clear(){
		this.configZip = null;
	}


	public static getConfig($fileName): any {
		if (!this.configZip)
			return null;
		$fileName = $fileName + ".json";
		// if (!this.configDataList[$fileName]) {
		// 	let file = this.configZip.file($fileName);
		// 	if (!file) {
		// 		console.log(`${$fileName}配置不存在`);

		// 	}
		// 	this.configDataList[$fileName] = this.isJSON(file.asText());
		// 	if (!this.configDataList[$fileName]) {
		// 		console.log(`${$fileName}配置不存在`);
		// 	}
		// }
		return this.configDataList[$fileName];
	}

	public static getFileList(): string[] {
		let list = [];
		let obj = this.configZip.files;
		for (let k in obj) {
			list.push(k);
		}
		return list;
	}

	public static parseFile($fileName) {
		if (!this.configDataList[$fileName]) {
			let file = this.configZip.file($fileName);
			if (!file) {
				console.log(`${$fileName}配置不存在`);

			}
			this.configDataList[$fileName] = this.isJSON(file.asText());
			if (!this.configDataList[$fileName]) {
				console.log(`${$fileName}配置不存在`);
			}
		}
	}

	public static isJSON(str: string): any {
		try {
			var obj = JSON.parse(str);
			if (typeof obj == 'object' && obj) {
				return obj;
			} else {
				return null;
			}

		} catch (e) {
			return null;
		}
	}
}