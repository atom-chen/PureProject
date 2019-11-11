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
/**
 * create by junwei on 07/17/2019
 * 使用条件模块
 */
var DetailPart = (function (_super) {
    __extends(DetailPart, _super);
    function DetailPart() {
        var _this = _super.call(this) || this;
        _this.skinName = "DetailPartSkin";
        return _this;
    }
    DetailPart.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    DetailPart.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data.length)
            return;
        this.initData();
    };
    DetailPart.prototype.dispose = function () {
        this.dLab.text = "";
        _super.prototype.dispose.call(this);
    };
    DetailPart.prototype.initData = function () {
        var data = this.data;
        this.dLab.text = "";
        var str = "";
        for (var i = 0; i < data.length; i++) {
            var condi = data[i];
            var detailLabel = ObjectPool.get(eui.Label);
            detailLabel.size = 18;
            if (condi.cond == StdItemCondition.ucJob) {
                str += StringUtils.substitute(Language.lang.mainJob, ItemUtils.getJobString(condi.value), "c0xffffff", "c0xffffff") + "\n";
            }
            else if (condi.cond == StdItemCondition.ucLevel) {
                str += StringUtils.substitute(Language.lang.mainLvl, condi.value, "c0xffffff", "c0xffffff") + "\n";
            }
            else if (condi.cond == StdItemCondition.part) {
                str += StringUtils.substitute(Language.lang.mainPart, Language.lang.part[condi.value], "c0xffffff", "c0xffffff") + "\n";
            }
            else if (condi.cond == StdItemCondition.fashionPart) {
                str += StringUtils.substitute(Language.lang.mainPart, Language.lang.fashionPart[condi.value], "c0xffffff", "c0xffffff") + "\n";
            }
        }
        this.dLab.textFlow = TextFlowUtils.generateTextFlow(str);
    };
    DetailPart.prototype.addEquipPart = function (part) {
        var detailLabel = ObjectPool.get(eui.Label);
        detailLabel.size = 18;
    };
    /**
     * 设置道具详细信息
     * @param  {{type:number} itemDtl
     * @param  {number}} num
     */
    DetailPart.prototype.setItemDetail = function (itemDtl) {
        if (!itemDtl) {
            return;
        }
        // this.detailG.removeChildren();
        // let detailLabel: eui.Label = ObjectPool.get(eui.Label);
        // detailLabel.size = 18;
        var str = this.dLab.text;
        str = StringUtils.substitute(Language.lang.itemType, "c0xffffff", "c0xffffff") + "\n";
        // detailLabel.textFlow = TextFlowUtils.generateTextFlow(str);
        // this.detailG.addChild(detailLabel);
        // let detailLabel2: eui.Label = ObjectPool.get(eui.Label);
        // detailLabel2.size = 18;
        str += StringUtils.substitute(Language.lang.itemNum, itemDtl.num, "c0xffffff", "c0xffffff");
        // detailLabel2.textFlow = TextFlowUtils.generateTextFlow(str);
        // this.detailG.addChild(detailLabel2);
        this.dLab.textFlow = TextFlowUtils.generateTextFlow(str);
    };
    return DetailPart;
}(BaseCustComponent));
__reflect(DetailPart.prototype, "DetailPart");
//# sourceMappingURL=DetailPart.js.map