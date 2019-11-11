/**
 * 数据工具 （处理一些数据转换计算)
 * 
 */
class DataUtil {

	/**
	 * 数据对象数组中特定值转换数字数组
	 */
	static dataToNumberOnArray(dataList: any[], key: string): number[] {
		let list: number[] = [];
		for (let dt of dataList) {
			list.push(dt[key]);
		}
		return list
	}
	/**瘦身数据列表 */
	static fitListData(list: any[]): any[] {
		let lt: any[] = list.concat();
		for (let i: number = lt.length - 1; i > -1; i--) {
			if (lt[i] == undefined || lt[i] == null)
				lt.splice(i, 1);
		}
		return lt;
	}
	/**
	 * 格式化数据列表，重新开辟个数组内存
	 */
	static formatNList(dataList: any[]): any[] {
		let list: number[] = [];
		for (let key in dataList) {
			let item = dataList[key];
			list.push(item);
		}
		return list;
	}
}