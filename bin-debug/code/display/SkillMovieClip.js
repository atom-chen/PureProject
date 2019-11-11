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
var SkillMovieClip = (function (_super) {
    __extends(SkillMovieClip, _super);
    function SkillMovieClip() {
        return _super.call(this) || this;
    }
    SkillMovieClip.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        SkillMovieClip.num--;
    };
    SkillMovieClip.create = function () {
        SkillMovieClip.num++;
        return ObjectPool.get(SkillMovieClip);
    };
    SkillMovieClip.num = 0;
    return SkillMovieClip;
}(MovieClip));
__reflect(SkillMovieClip.prototype, "SkillMovieClip");
//# sourceMappingURL=SkillMovieClip.js.map