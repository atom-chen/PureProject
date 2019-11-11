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
 * @Description: 冒险系统-单个任务
 * @Author: guolinsen
 * @Date: 2019-08-26 14:00:01
 * @LastEditTime: 2019-10-25 14:57:43
 */
var AdventureItem = (function (_super) {
    __extends(AdventureItem, _super);
    function AdventureItem() {
        return _super.call(this) || this;
    }
    //用于子类继承
    AdventureItem.prototype.init = function () {
        this.addTouchEvent(this.btn, this.onBtn);
    };
    AdventureItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        var obj = GameCache.adventure.getData(data.item);
        var progress = obj.progress;
        if (GameCache.adventure.isMaxLv()) {
            obj.finish = true;
            obj.prize = true;
        }
        if (obj.finish)
            progress = data.showval;
        // this.nameLab.textFlow = TextFlowUtils.generateTextFlow(data.dec +
        // 	TextFlowUtils.color(`${progress}/${data.showval}`, ColorUtil.C_GREEN));
        this.nameLab.text = data.dec;
        this.proLab.textColor = obj.finish ? ColorUtil.C_GREEN : ColorUtil.C_RED;
        this.proLab.text = progress + "/" + data.showval;
        this.item.data = data.award[0];
        this.prize_flag.visible = obj.prize;
        this.btn.visible = !this.prize_flag.visible;
        this.btn.icon = "res/btn/" + (obj.finish ? "get_2" : "enter") + ".png";
    };
    AdventureItem.prototype.onBtn = function () {
        var data = this.data;
        var obj = GameCache.adventure.getData(data.item);
        if (obj.finish) {
            Proxy.adventure.sendPrize(data.item);
        }
        else {
            TextFlowUtils.hrefType(data.mod);
            App.ViewManager.recoredWin(ViewConst.ADVENTURE);
        }
    };
    return AdventureItem;
}(BaseCustComponent));
__reflect(AdventureItem.prototype, "AdventureItem");
//# sourceMappingURL=AdventureItem.js.map