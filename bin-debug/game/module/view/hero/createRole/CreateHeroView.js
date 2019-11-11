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
 * @Description: 创角-英雄
 * @Author: guolinsen
 * @Date: 2019-08-26 11:33:49
 * @LastEditTime: 2019-09-11 21:10:20
 */
var CreateHeroView = (function (_super) {
    __extends(CreateHeroView, _super);
    function CreateHeroView() {
        var _this = _super.call(this, LayerManager.UI_Main2) || this;
        _this.skinName = "CreateHeroSkin";
        return _this;
    }
    CreateHeroView.prototype.open = function () {
        this.width = App.StageUtils.getWidth();
        this.height = App.StageUtils.getHeight();
        _super.prototype.open.call(this);
        this.initTabIcon();
        this.addTouchEvent(this.createBtn, this.onCreate);
        this.addTouchEvent(this.tabBtn, this.tabTouch);
    };
    CreateHeroView.prototype.init = function () {
        _super.prototype.init.call(this);
        this.body = new DBAvatar();
        this.body.setRoot(this.roleMdl, null);
    };
    CreateHeroView.prototype.initTabIcon = function () {
        var listData = [];
        for (var i = 1; i < 4; i++) {
            var data = GameCache.hero.getProByJob(i);
            if (data)
                continue;
            var obj = {};
            obj.id = i;
            obj.icon = "createRole_json.createrole_role" + (i - 1) + "_b_png";
            obj.icon2 = "createRole_json.createrole_role" + (i - 1) + "_a_png";
            listData.push(obj);
        }
        this.tabBtn.dataProvider = new eui.ArrayCollection(listData);
        this.listData = listData;
        this.tabBtn.selectedIndex = MathUtils.limitInteger(0, listData.length);
        this.tabTouch();
    };
    CreateHeroView.prototype.onCreate = function () {
        Proxy.adventure.sendPrize(0, this.selectJob, 1);
        this.closeView();
    };
    CreateHeroView.prototype.tabTouch = function () {
        var obj = this.listData[this.tabBtn.selectedIndex];
        this.selectJob = obj["id"];
        this.body.load("c" + this.selectJob, true, false);
        this.body.play("stand");
    };
    CreateHeroView.prototype.destroy = function () {
        if (this.body) {
            this.body.dispose();
            this.body = null;
        }
        _super.prototype.destroy.call(this);
    };
    return CreateHeroView;
}(BaseEuiWindow));
__reflect(CreateHeroView.prototype, "CreateHeroView");
//# sourceMappingURL=CreateHeroView.js.map