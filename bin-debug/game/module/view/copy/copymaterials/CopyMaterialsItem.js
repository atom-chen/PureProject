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
 * @Description: 材料副本条目
 * @Author: xiejunwei
 * @Date: 2019-08-21 20:04:08
 * @LastEditTime: 2019-10-26 15:13:49
 */
var CopyMaterialsItem = (function (_super) {
    __extends(CopyMaterialsItem, _super);
    function CopyMaterialsItem() {
        var _this = _super.call(this) || this;
        _this.sweepCount = 0;
        return _this;
    }
    CopyMaterialsItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.btn, this.enterFunc);
        this.cost.gainWay.visible = false;
        this.cost.numColor_0 = 0x00b4fc;
    };
    CopyMaterialsItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data.id)
            return;
        this.initdata();
    };
    CopyMaterialsItem.prototype.dispose = function () {
        if (this.itemList)
            this.itemList.dispose();
        _super.prototype.dispose.call(this);
    };
    CopyMaterialsItem.prototype.initdata = function () {
        var roleLvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
        this.bg.source = "res/images/bg/copyMaterialsBg_" + this.data.backpic + ".png";
        this.title.source = "copymaterials_json.copymaterials_title_" + this.data.namepic + "_png";
        var copyData = GameCache.copy.getCopyData(this.data.id);
        this.cost.visible = false;
        this.btn.touchEnabled = true;
        if (copyData) {
            this.btn.icon = copyData.free ? "res/btn/enterBtn3.png" : "res/btn/sweepBtn2.png";
            this.sweepCount = copyData.sweep;
            if (this.data.level > roleLvl) {
                this.desc.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.copyEnterCondition, this.data.level));
                this.btn.icon = "res/btn/enterBtn3g.png";
                this.btn.touchEnabled = false;
            }
            else {
                this.btn.visible = true;
                if (!copyData.free) {
                    this.cost.visible = true;
                    this.cost.setData(copyData.consumes[0].id, copyData.consumes[0].count);
                    this.desc.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.copySweepCount, copyData.sweep));
                }
                else {
                    this.desc.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.copyEnterCount, copyData.free));
                }
            }
        }
        if (!this.itemList) {
            this.itemList = ObjectPool.get(ItemList);
        }
        this.itemList.setData(this.data.awardshow, this.iG);
    };
    CopyMaterialsItem.prototype.enterFunc = function () {
        if (this.cost.visible) {
            if (this.cost.isExpend) {
                if (this.sweepCount) {
                    Proxy.copy.sendSweep(this.data.id, 0);
                }
                else {
                    GlobalFun.checkVipLvl(Language.lang.copyText_0);
                }
            }
            else {
                //充值跳转
                var str = StringUtils.substitute(Language.lang.notEnought, Language.lang.yb);
                GlobalFun.SysMsg(str);
            }
        }
        else {
            Proxy.copy.sendEnterFB(this.data.id);
            App.ViewManager.close(ViewConst.COPY);
        }
    };
    return CopyMaterialsItem;
}(BaseCustComponent));
__reflect(CopyMaterialsItem.prototype, "CopyMaterialsItem");
//# sourceMappingURL=CopyMaterialsItem.js.map