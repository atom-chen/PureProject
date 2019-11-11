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
 * @Description: 新手流程
 * @Author: guolinsen
 * @Date: 2019-09-23 13:45:15
 */
var NoviceCache = (function (_super) {
    __extends(NoviceCache, _super);
    function NoviceCache() {
        return _super.call(this) || this;
    }
    NoviceCache.prototype.playGuide = function (id) {
        this.guidId = id;
        if (!this._guideView) {
            this._guideView = new NoviceGuideStep(false);
        }
        this._guideView.start(GameConfig.noviceGuide[id]);
    };
    Object.defineProperty(NoviceCache.prototype, "guideView", {
        get: function () {
            return this._guideView;
        },
        enumerable: true,
        configurable: true
    });
    return NoviceCache;
}(BaseCache));
__reflect(NoviceCache.prototype, "NoviceCache");
//# sourceMappingURL=NoviceCache.js.map