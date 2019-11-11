/**
 * Created by zhangac on 2016/11/23.
 */
class Algorithm {
	public static sortAsc(b1, b2): number {
		if (b1 < b2) return -1;
		else if (b1 > b2) return 1;
		else return 0;
	}

	public static sortAsc1(b1, b2): number {
		if (b1 < b2) return 1;
		else if (b1 > b2) return -1;
		else return 0;
	}

	public static sortDesc(b1, b2): number {
		if (b1 > b2) return -1;
		else if (b1 < b2) return 1;
		else return 0;
	}
	//二分查找
	//tab 要检索的表
	// item 要搜索的玩意儿
	// binFunc 用于比较的函数，当纯数字tab时该参数可以为空，默认检索到的位置是最后的插入位置
	public static binSearch(tab: any[], item: any, binFunc: Function = null): number {
		if (!tab || tab.length == 0) return 0;

		if (!binFunc)
			binFunc = Algorithm.sortAsc;
		let low = 0;
		let high = tab.length - 1;

		while (low <= high) {
			let mid = (high + low) >> 1;
			let val: any = tab[mid];
			if (binFunc(val, item) <= 0) {
				low = mid + 1;
			}
			else {
				high = mid - 1;
			}
		}
		return low;
	}

}
