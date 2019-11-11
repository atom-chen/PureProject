var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
* 二分法查找类
* 要查找的数组必须是经过二分升序排序的
* @author Administrator
*
*/
var Dichotomy = (function () {
    function Dichotomy() {
    }
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
    Dichotomy.searchIndex = function (list, compare, param, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = 0x7FFFFFFF; }
        var nIndex, nValue;
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
    };
    return Dichotomy;
}());
__reflect(Dichotomy.prototype, "Dichotomy");
//# sourceMappingURL=Dichotomy.js.map