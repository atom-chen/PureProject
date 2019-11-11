var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/*
 * @Description: 星型进度条
 * @Author: xiejunwei
 * @Date: 2019-08-15 16:20:53
 * @LastEditTime: 2019-08-15 19:12:03
 */
var StarProgress = (function (_super) {
    __extends(StarProgress, _super);
    function StarProgress() {
        var _this = _super.call(this) || this;
        _this._maximum = 0;
        return _this;
    }
    StarProgress.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.itemList.itemRenderer = StarItem;
    };
    StarProgress.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    StarProgress.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    StarProgress.prototype.setData = function (val, val2) {
        var arr = [];
        arr.length = val;
        this._maximum = val;
        if (!this.datatGroup) {
            this.datatGroup = new eui.ArrayCollection(arr);
            this.itemList.dataProvider = this.datatGroup;
        }
        else {
            if (val != this._maximum) {
                this.datatGroup.source = arr;
                this.itemList.dataProviderRefreshed();
            }
        }
        App.TimerManager.addDelay(50, 50, 1, this.value, this, null, null, val2);
    };
    StarProgress.prototype.value = function (val) {
        for (var i = 0; i < this.itemList.numChildren; i++) {
            var item = this.itemList.getChildAt(i);
            item["currentState"] = i <= (val - 1) ? "on" : "off";
        }
    };
    return StarProgress;
}(BaseCustComponent));
__reflect(StarProgress.prototype, "StarProgress");
//# sourceMappingURL=StarProgress.js.map