/**
* 二分法查找类
* 要查找的数组必须是经过二分升序排序的 
* @author Administrator
* 
*/
class Dichotomy {
	/**
	 * 在进行过二分升序排序的数组中按照二分法查找与param匹配的索引
	 * @param list
	 * @param compare 对比函数，function (param: Object, item: Object): int,
	 * 		函数必须返回int值，-1表示继续向前搜索，0表示匹配,1表示继续向后搜索
	 * @param param
	 * @param startIndex
	 * @param endIndex
	 * @return 
	 * 
	 */
	static searchIndex(list: any[], compare: Function, param: any, startIndex: number = 0, endIndex: number = 0x7FFFFFFF): number {
		var nIndex: number, nValue: number;

		if (endIndex == 0x7FFFFFFF)
			endIndex = list.length - 1;
		while (startIndex <= endIndex) {
			nIndex = (startIndex + endIndex) >> 1;
			nValue = compare(param, list[nIndex]);
			if (nValue != 0) {
				if (nValue < 0) {
					endIndex = nIndex - 1;
				}
				else {
					startIndex = ++nIndex;
				}
			}
			else {
				return nIndex;
			}
		}
		return -1;
	}
}