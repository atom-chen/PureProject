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
// TypeScript file
var LoadingPage = (function (_super) {
    __extends(LoadingPage, _super);
    function LoadingPage() {
        var _this = _super.call(this) || this;
        _this.imgStr = ["bar.png", "blank.png"];
        _this.createView();
        return _this;
    }
    Object.defineProperty(LoadingPage, "ins", {
        get: function () {
            LoadingPage["instance"] = LoadingPage["instance"] || new LoadingPage();
            return LoadingPage["instance"];
        },
        enumerable: true,
        configurable: true
    });
    LoadingPage.prototype.createView = function () {
        this.loadBg = new egret.Bitmap();
        this.addChild(this.loadBg);
        this.proBg = new egret.Bitmap();
        this.addChild(this.proBg);
        this.pro = new egret.Bitmap();
        this.addChild(this.pro);
        this.versionText = new egret.TextField();
        this.addChild(this.versionText);
        this.versionText.size = 18;
        this.versionText.textColor = 0x000000;
        this.loadImg();
    };
    LoadingPage.prototype.loadImg = function () {
        var _this = this;
        RES.getResByUrl("res/images/bg/loginBg.jpg", function (t) {
            _this.loadBg.texture = t;
            _this.loadBg.x = (App.StageUtils.getWidth() - _this.loadBg.width) >> 1;
            // SDK.ins().hide();
            _this.versionText.x = _this.loadBg.x;
        });
        RES.getResByUrl("res/login/blank.png", function (t) {
            _this.proBg.texture = t;
            _this.proBg.x = (App.StageUtils.getWidth() - _this.proBg.width) >> 1;
            _this.proBg.y = ((App.StageUtils.getHeight() - _this.proBg.height) >> 1) + 250;
        }, this, RES.ResourceItem.TYPE_IMAGE);
        RES.getResByUrl("res/login/bar.png", function (t) {
            _this.pro.texture = t;
            _this.pro.x = (App.StageUtils.getWidth() - 261) >> 1;
            _this.pro.y = ((App.StageUtils.getHeight() - _this.pro.height) >> 1) + 250 - 1;
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    LoadingPage.prototype.showProgress = function (n, str) {
        if (n == 10)
            return;
        LoadingPage["instance"].changePro(n);
    };
    LoadingPage.prototype.showVersion = function (val) {
        LoadingPage["instance"].changeVersion(val);
    };
    LoadingPage.prototype.changeVersion = function (val) {
        if (this.versionText)
            this.versionText.text = StringUtils.substitute(Language.lang.version, val);
    };
    LoadingPage.prototype.changePro = function (n) {
        if (this.tw) {
            egret.Tween.removeTweens(this.pro);
            this.tw = null;
        }
        var time = n >= 100 ? 100 : 500;
        var target = n >= 100 ? 100 : n;
        this.tw = egret.Tween.get(this.pro);
        this.tw.to({ width: target / 100 * 261 }, time);
    };
    LoadingPage.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this.tw) {
            egret.Tween.removeTweens(this.pro);
            this.tw = null;
        }
    };
    return LoadingPage;
}(BaseEuiWindow));
__reflect(LoadingPage.prototype, "LoadingPage");
//# sourceMappingURL=LoadingPage.js.map