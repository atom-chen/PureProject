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
 * @Description: 图腾页面
 * @Author: xiejunwei
 * @Date: 2019-08-26 16:52:03
 * @LastEditTime: 2019-11-01 14:49:10
 */
var TotemsPage = (function (_super) {
    __extends(TotemsPage, _super);
    function TotemsPage($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.arrayType = [];
        _this.skinName = "TotemsPageSkin";
        return _this;
    }
    TotemsPage.prototype.init = function () {
        _super.prototype.init.call(this);
        this.arrayType = [1, Object.keys(GameConfig.totems).length];
    };
    TotemsPage.red = function () {
        if (GameCache.totems.checkGrade())
            return true;
        if (GameCache.totems.checkReonance())
            return true;
        return false;
    };
    TotemsPage.changeMsg = function () {
        return [MsgConst.TOTEMS_INFO];
    };
    TotemsPage.prototype.refreshRed = function () {
        this.redShow();
    };
    TotemsPage.prototype.open = function (param) {
        this.addTouchEvent(this.btn_1, this.openPropTips);
        this.addTouchEvent(this.btn_0, this.openResonance);
        this.addTouchEvent(this.pBtn, this.upGradeFunc);
        this.message(MsgConst.TOTEMS_INFO, this.initData);
        this.message(MsgConst.TOTEMS_INFO, this.upGradeChange);
        var arr = [];
        for (var i in GameConfig.totems) {
            var id = GameCache.totems.totemsData[i] ? GameCache.totems.totemsData[i].id : 1;
            arr.push([i, id]);
        }
        this.slider.initData(TotemsImgItem, arr, this.onCall, this);
        this.initData();
    };
    TotemsPage.prototype.onCall = function () {
        this.initData();
    };
    TotemsPage.prototype.initData = function () {
        var idx = this.slider.currentIndex + 1;
        var tLvl = GameCache.totems.totemsData[idx] ? GameCache.totems.totemsData[idx].id : 1;
        var conf = GameConfig.totems[idx][tLvl];
        var nextConf = GameConfig.totems[idx][tLvl + 1] ? GameConfig.totems[idx][tLvl + 1] : null;
        if (tLvl == 1) {
            this.img_0.source = "totems_json.totems_active_txt_png";
            this.pBtn.icon = RES_DIR_BTN + "activate_3.png";
        }
        else {
            this.img_0.source = "totems_json.totems_upGrade_txt_png";
            this.pBtn.icon = RES_DIR_BTN + "promote_1.png";
        }
        if (!conf)
            return;
        var nextprop = [];
        if (nextConf) {
            this.lvlMax.visible = false;
            this.pBtn.visible = true;
            this.cost.visible = true;
            this.item.visible = true;
            this.item.data = conf.consume[0];
            this.cost.setData(conf.consume[0].id, conf.consume[0].count);
            nextprop = nextConf.levelAtt.concat();
        }
        else {
            this.lvlMax.visible = true;
            this.pBtn.visible = false;
            this.cost.visible = false;
            this.item.visible = false;
        }
        this.propList.setData(conf.levelAtt, nextprop, 0, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem2Skin");
        var star = conf.starlevel;
        for (var i = 0; i < 6; i++) {
            this["item_" + i].source = (i + 1) <= star ? "totems_json.totems_item_sele_png" : "totems_json.totems_item_u_sele_png";
        }
        var value = 0;
        for (var i in GameConfig.totems) {
            var lvl = GameCache.totems.totemsData[i] ? GameCache.totems.totemsData[i].id : 1;
            var item = GameConfig.totems[i][lvl];
            value += ItemUtils.getZdlByProp(item.levelAtt);
        }
        this.zdl.value = value;
    };
    TotemsPage.prototype.upGradeChange = function () {
        var idx = this.slider.currentIndex + 1;
        var tLvl = GameCache.totems.totemsData[idx] ? GameCache.totems.totemsData[idx].id : 1;
        this.slider.replaceItemData(this.slider.currentIndex, [idx, tLvl]);
        this.showEff();
    };
    TotemsPage.prototype.openPropTips = function () {
        var prop = [];
        for (var i in GameConfig.totems) {
            var lvl = GameCache.totems.totemsData[i] ? GameCache.totems.totemsData[i].id : 1;
            var item = GameConfig.totems[i][lvl];
            prop = GlobalFun.ObjPlusOrMinus(prop, item.levelAtt);
        }
        var view = new ViewProp();
        view.firData = {};
        view.firData["src"] = "totems_json.totems_texture_0_png";
        view.firData["prop"] = prop;
        App.ViewManager.open(ViewConst.TOTALPROP, view);
    };
    TotemsPage.prototype.openResonance = function () {
        App.ViewManager.open(ViewConst.RESONANCE);
    };
    TotemsPage.prototype.upGradeFunc = function () {
        if (this.cost.checkEnough()) {
            var idx = this.slider.currentIndex + 1;
            Proxy.totems.sendUpGrade(idx);
        }
    };
    TotemsPage.prototype.redShow = function () {
        App.ViewManager.showRedPoint(this.pBtn, GameCache.totems.checkGrade(this.slider.currentIndex + 1));
        App.ViewManager.showRedPoint(this.slider.lBtn, GameCache.totems.checkGrade([this.arrayType[0], this.slider.currentIndex]));
        App.ViewManager.showRedPoint(this.slider.rBtn, GameCache.totems.checkGrade([this.slider.currentIndex + 2, this.arrayType[1]]));
        App.ViewManager.showRedPoint(this.btn_0, GameCache.totems.checkReonance());
    };
    TotemsPage.prototype.showEff = function () {
        var idx = this.slider.currentIndex + 1;
        var tLvl = GameCache.totems.totemsData[idx] ? GameCache.totems.totemsData[idx].id : 1;
        var conf = GameConfig.totems[idx][tLvl];
        var star = conf.starlevel;
        if (!conf)
            return;
        var tar = star - 1;
        if (tar < 0)
            return;
        var item = this["item_" + tar];
        var mc = App.DisplayUtils.addEffectToObj(this.iG, "point2_0_1", 1, item.x + 22, item.y + 22);
    };
    return TotemsPage;
}(BaseSpriteView));
__reflect(TotemsPage.prototype, "TotemsPage");
//# sourceMappingURL=TotemsPage.js.map