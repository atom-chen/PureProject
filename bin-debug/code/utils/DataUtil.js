var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 数据工具 （处理一些数据转换计算)
 *
 */
var DataUtil = (function () {
    function DataUtil() {
    }
    /**
     * 数据对象数组中特定值转换数字数组
     */
    DataUtil.dataToNumberOnArray = function (dataList, key) {
        var list = [];
        for (var _i = 0, dataList_1 = dataList; _i < dataList_1.length; _i++) {
            var dt = dataList_1[_i];
            list.push(dt[key]);
        }
        return list;
    };
    /**瘦身数据列表 */
    DataUtil.fitListData = function (list) {
        var lt = list.concat();
        for (var i = lt.length - 1; i > -1; i--) {
            if (lt[i] == undefined || lt[i] == null)
                lt.splice(i, 1);
        }
        return lt;
    };
    /**
     * 格式化数据列表，重新开辟个数组内存
     */
    DataUtil.formatNList = function (dataList) {
        var list = [];
        for (var key in dataList) {
            var item = dataList[key];
            list.push(item);
        }
        return list;
    };
    return DataUtil;
}());
__reflect(DataUtil.prototype, "DataUtil");
//# sourceMappingURL=DataUtil.js.map