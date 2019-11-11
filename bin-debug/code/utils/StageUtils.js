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
 * Created by yangsong on 2014/12/3.
 * Stage相关工具类
 */
var StageUtils = (function (_super) {
    __extends(StageUtils, _super);
    /**
     * 构造函数
     */
    function StageUtils() {
        var _this = _super.call(this) || this;
        if (_this._uiStage == null) {
            _this._uiStage = new eui.UILayer();
            _this._uiStage.touchEnabled = false;
            _this._uiStage.percentHeight = 100;
            _this._uiStage.percentWidth = 100;
            _this.getStage().addChild(_this._uiStage);
        }
        return _this;
    }
    /**
     * 获取游戏的高度
     * @returns {number}
     */
    StageUtils.prototype.getHeight = function () {
        return this.stageHeight;
    };
    /**
     * 获取游戏宽度
     * @returns {number}
     */
    StageUtils.prototype.getWidth = function () {
        return this.stageWidth;
    };
    /**
     * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
     * @param value
     */
    StageUtils.prototype.setTouchChildren = function (value) {
        this.getStage().touchChildren = value;
    };
    /**
     * 设置同时可触发几个点击事件，默认为2
     * @param value
     */
    StageUtils.prototype.setMaxTouches = function (value) {
        this.getStage().maxTouches = value;
    };
    /**
     * 设置帧频
     * @param value
     */
    StageUtils.prototype.setFrameRate = function (value) {
        this.getStage().frameRate = value;
    };
    /**
     * 设置适配方式
     * @param value
     */
    StageUtils.prototype.setScaleMode = function (value) {
        this.getStage().scaleMode = value;
    };
    /**
     * 设置游戏横竖版
     * @param {egret.OrientationMode}
     */
    StageUtils.prototype.setOrientation = function (orientationMode) {
        if (!DeviceUtils.IsPC) {
            if (orientationMode) {
                this.getStage().orientation = orientationMode;
            }
            else if (this.getStage().orientation == egret.OrientationMode.LANDSCAPE) {
                this.getStage().orientation = egret.OrientationMode.PORTRAIT;
                this.getStage().setContentSize(580, 930);
            }
            else {
                this.getStage().orientation = egret.OrientationMode.LANDSCAPE;
                this.getStage().setContentSize(930, 580);
            }
        }
    };
    /**
     * 获取游戏Stage对象
     * @returns {egret.MainContext}
     */
    StageUtils.prototype.getStage = function () {
        return egret.MainContext.instance.stage;
    };
    /**
     * 获取唯一UIStage
     * @returns {eui.UILayer}
     */
    StageUtils.prototype.getUIStage = function () {
        return this._uiStage;
    };
    StageUtils.prototype.resize = function () {
        var curStage = this.getStage();
        var w = curStage.stageWidth;
        var h = curStage.stageHeight;
        this.stageWidth = w;
        this.stageHeight = h;
    };
    StageUtils.prototype.init = function () {
        var curStage = this.getStage();
        if (DeviceUtils.IsPC) {
            //curStage.setContentSize(w, h);
            if (window.innerHeight < GlobalVar.GAME_PC_HEIGHT) {
                curStage.setContentSize(window.innerWidth, GlobalVar.GAME_PC_HEIGHT);
                curStage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            }
            else {
                curStage.scaleMode = egret.StageScaleMode.NO_SCALE;
            }
        }
        else {
            var designP = GlobalVar.GAME_HEIGHT / GlobalVar.GAME_WIDTH;
            var phoneP = window.innerHeight / window.innerWidth;
            if (designP >= phoneP) {
                curStage.setContentSize(GlobalVar.GAME_HEIGHT * window.innerWidth / window.innerHeight, GlobalVar.GAME_HEIGHT);
                curStage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            }
            else {
                curStage.setContentSize(GlobalVar.GAME_WIDTH, GlobalVar.GAME_WIDTH * window.innerHeight / window.innerWidth);
                curStage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            }
        }
        var w = curStage.stageWidth;
        var h = curStage.stageHeight;
        this.stageWidth = w;
        this.stageHeight = h;
        curStage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStageTouch, this);
    };
    StageUtils.prototype.onStageTouch = function (e) {
        App.DisplayUtils.addEffectToObj(this.getStage(), "click_0_1", 1, e.stageX, e.stageY);
        //this.logCh(this.getStage());
    };
    StageUtils.prototype.logCh = function (con) {
        var i = 0;
        var num = con.numChildren;
        for (; i < num; i++) {
            var dis = con.getChildAt(i);
            var claName1 = dis["__class__"];
            // console.log(claName1);
            if (dis instanceof egret.DisplayObjectContainer) {
                this.logCh(dis);
            }
        }
    };
    return StageUtils;
}(BaseClass));
__reflect(StageUtils.prototype, "StageUtils");
//# sourceMappingURL=StageUtils.js.map