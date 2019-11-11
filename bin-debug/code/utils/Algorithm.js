var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by zhangac on 2016/11/23.
 */
var Algorithm = (function () {
    function Algorithm() {
    }
    Algorithm.sortAsc = function (b1, b2) {
        if (b1 < b2)
            return -1;
        else if (b1 > b2)
            return 1;
        else
            return 0;
    };
    Algorithm.sortAsc1 = function (b1, b2) {
        if (b1 < b2)
            return 1;
        else if (b1 > b2)
            return -1;
        else
            return 0;
    };
    Algorithm.sortDesc = function (b1, b2) {
        if (b1 > b2)
            return -1;
        else if (b1 < b2)
            return 1;
        else
            return 0;
    };
    //二分查找
    //tab 要检索的表
    // item 要搜索的玩意儿
    // binFunc 用于比较的函数，当纯数字tab时该参数可以为空，默认检索到的位置是最后的插入位置
    Algorithm.binSearch = function (tab, item, binFunc) {
        if (binFunc === void 0) { binFunc = null; }
        if (!tab || tab.length == 0)
            return 0;
        if (!binFunc)
            binFunc = Algorithm.sortAsc;
        var low = 0;
        var high = tab.length - 1;
        while (low <= high) {
            var mid = (high + low) >> 1;
            var val = tab[mid];
            if (binFunc(val, item) <= 0) {
                low = mid + 1;
            }
            else {
                high = mid - 1;
            }
        }
        return low;
    };
    return Algorithm;
}());
__reflect(Algorithm.prototype, "Algorithm");
//# sourceMappingURL=Algorithm.js.map