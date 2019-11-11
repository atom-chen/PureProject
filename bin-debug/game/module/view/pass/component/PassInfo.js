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
 * create by junwei on 07/18/2019
 */
var PassInfo = (function (_super) {
    __extends(PassInfo, _super);
    function PassInfo() {
        return _super.call(this) || this;
    }
    PassInfo.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    PassInfo.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    PassInfo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    PassInfo.prototype.lvlChange = function () {
        var lvl = GameCache.pass.level;
        var conf = GameConfig.passAw;
        var maxLen = Object.getOwnPropertyNames(conf).length;
        var aw = 0;
        var vipLvl = GameCache.vip.realValue();
        var vipConf = GameConfig.vip[vipLvl];
        var expC = vipConf ? vipConf.expadd / 10000 : 0;
        for (var i in conf) {
            if (conf[i].end >= lvl && conf[i].start <= lvl) {
                aw = (1 + conf[i].expup * (conf[i].end - conf[i].start)) * conf[i].exp;
            }
        }
        if (aw == 0) {
            var maxconf = conf[maxLen];
            aw = aw = (1 + maxconf.expup * (maxconf.end - maxconf.start)) * maxconf.exp;
        }
        aw = aw * (1 + expC);
        this.aTxt.text = Math.floor(aw) + "/min";
    };
    return PassInfo;
}(BaseCustComponent));
__reflect(PassInfo.prototype, "PassInfo");
//# sourceMappingURL=PassInfo.js.map