/*
 * @Description: buff数据结构
 * @Author: guolinsen
 * @Date: 2019-09-02 20:38:23
 * @LastEditTime: 2019-09-03 11:37:46
 */
class BuffVo {
	id: number;
	group: number;
	restTime: number;
	name: string;
	interval: number;
	icon: number;
	attr: BuffValue[] = [];
	public constructor() {
	}
}

class BuffValue {
	type: number;
	value: any;
	interval: any;
}