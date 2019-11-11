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
 * @Description: 符碑面板
 * @Author: xiejunwei
 * @Date: 2019-09-16 18:55:51
 */
var RunePannel = (function (_super) {
    __extends(RunePannel, _super);
    function RunePannel($parent) {
        if ($parent === void 0) { $parent = null; }
        return _super.call(this, $parent) || this;
    }
    RunePannel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    RunePannel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.open.call(this, param);
    };
    RunePannel.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    return RunePannel;
}(CommunalPagePannel));
__reflect(RunePannel.prototype, "RunePannel");
//# sourceMappingURL=RunePannel.js.map