var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 模型-龙骨
*/
var ThingBody = (function () {
    function ThingBody(root) {
        this._onStage = false;
        this.dir = 1;
        this._root = root;
        this.createBody();
    }
    ThingBody.prototype.createBody = function () {
        this.body = new DBAvatar();
        this.body.setRoot(this._root, Handler.create(this, this.bodyPlayEnd, null, false));
    };
    ThingBody.prototype.init = function (pro) {
        this._pro = pro;
        this.body.rolePro = pro;
        var job = pro.pro(PropId.AP_JOB);
        var sex = pro.pro(PropId.AP_SEX);
        if (ThingKind.isHumanModel(pro.kind)) {
            this.loadBody(job + "_" + sex, true);
        }
        else {
            this.loadBody(pro.pro(PropId.AP_BODY_ID));
        }
    };
    /**
     * 换装
    */
    ThingBody.prototype.changeSkin = function () {
        this.body.updateSkin();
    };
    ThingBody.prototype.bodyPlayEnd = function (act) {
        if (this.callHandler) {
            this.callHandler.args = [act];
            this.callHandler.run();
        }
    };
    ThingBody.prototype.loadBody = function (name, isNude) {
        if (isNude === void 0) { isNude = false; }
        this.body.load(name, true, isNude);
    };
    ThingBody.prototype.playAction = function (act, num) {
        if (num === void 0) { num = 0; }
        this.body.play(act, num, this._onStage);
        if (!this._onStage) {
            num && this.bodyPlayEnd(act);
        }
    };
    /**1向右 -1 向左*/
    ThingBody.prototype.setDir = function (dir) {
        this.dir = dir;
        this.body.setDir(dir);
    };
    ThingBody.prototype.onRemove = function () {
        this.body.onRemove();
    };
    ThingBody.prototype.setStage = function (stage) {
        this._onStage = stage;
        if (stage) {
            this.body.recoverPlay();
        }
    };
    return ThingBody;
}());
__reflect(ThingBody.prototype, "ThingBody");
//# sourceMappingURL=ThingBody.js.map