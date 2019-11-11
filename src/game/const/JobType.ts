class JobType {

	static zhanshi: number = 1;
	static fashi: number = 2;
	static gongshou: number = 3;

	public constructor() {
	}

	static getJobName(type) {
		return Language.lang.jobName[type];
	}
}