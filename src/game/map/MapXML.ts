class MapXML {
	public constructor() {
	}
	/**配置文件压缩包 */
	private configZip: any;
	/**配置数据列表 */
	private configDataList: Object = {};

	public read(data): void {
		if (!this.configZip)
			this.configZip = new JSZip(data);
	}


	public getConfig($fileName): any {
		if (!this.configZip)
			return null;
		$fileName = $fileName + ".xml";
		if (!this.configDataList[$fileName]) {
			let file = this.configZip.file($fileName);
			if (!file) {
				console.log(`${$fileName}配置不存在`);

			}
			this.configDataList[$fileName] = file.asText();
		}
		return this.configDataList[$fileName];
	}

}