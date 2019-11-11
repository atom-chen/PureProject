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
 * @Description: 图腾图片
 * @Author: xiejunwei
 * @Date: 2019-08-26 16:59:05
 * @LastEditTime: 2019-09-06 10:53:34
 */
var TotemsImgItem = (function (_super) {
    __extends(TotemsImgItem, _super);
    function TotemsImgItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "TotemsImgItemSkin";
        return _this;
    }
    TotemsImgItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    TotemsImgItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data)
            return;
        this.saveData = this.data;
        var conf = GameConfig.totems[this.saveData[0]][this.saveData[1]];
        this.img.source = this.saveData[1] > 1 ? RES_DIR_TOTEMS_ICON + "b" + this.saveData[0] + ".png" : RES_DIR_TOTEMS_ICON + "b" + this.saveData[0] + "u.png";
        this.nImg.source = this.saveData[1] > 1 ? RES_DIR_TOTEMS_NAME + "n" + this.saveData[0] + ".png" : RES_DIR_TOTEMS_NAME + "n" + this.saveData[0] + "u.png";
        this.lNum.visible = true;
        this.lNum.value = StringUtils.substitute(Language.lang.jie_j, conf.classLvl);
    };
    TotemsImgItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return TotemsImgItem;
}(BaseCustComponent));
__reflect(TotemsImgItem.prototype, "TotemsImgItem");
//# sourceMappingURL=TotemsImgItem.js.map