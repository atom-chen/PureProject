class BaseConfig extends BaseClass {

	public constructor() {
		super();
	}

	protected getConfig($file): any {
		return ConfigCache.getConfig($file);
	}

}