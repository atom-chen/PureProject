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
 * @Description: 创角界面
 * @Author: liangzhaowei
 * @Date: 2019-07-23 20:51:01
 * @LastEditTime: 2019-10-17 15:52:57
 */
var CreateRoleView = (function (_super) {
    __extends(CreateRoleView, _super);
    function CreateRoleView() {
        var _this = _super.call(this, LayerManager.UI_Win) || this;
        /**角色选择下标 */
        _this.nSlRole = 0;
        _this._onStage = false;
        _this.skinName = "CreateRoleSkin";
        _this._randomName = new RandomName();
        _this.body = new DBAvatar();
        _this.body.setRoot(_this.roleMdl, null);
        _this.isInit = true;
        _this.bClickClose = false;
        _this.horizontalCenter = 0;
        _this.verticalCenter = 0;
        return _this;
        // this.initTabIcon();
    }
    CreateRoleView.prototype.init = function () {
        this.focusToStage();
    };
    CreateRoleView.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        this.lbRoleName.text = this._randomName.getRandomName(1);
        this.addTouchEvent(this.imgRedom, this.onClick);
        this.addTouchEvent(this.imgCreateRole, this.onClick);
        this.addTouchEvent(this.tabBtn, this.tabTouche);
        App.MessageCenter.addListener(MsgConst.CREATE_ROLE_ERROR, this.onError, this);
        App.SoundManager.playMusic(SoundType.CREATEROLE);
        this.nSlRole = MathUtils.limitInteger(0, 3);
        this.tabBtn.selectedIndex = this.nSlRole;
        this.tabTouche();
        App.ViewManager.getView(ViewConst.WELCOME); //提前加载欢迎界面资源
    };
    CreateRoleView.prototype.onError = function (error) {
        if (Language.lang.createRoleError[error]) {
            this.errorTips.text = Language.lang.createRoleError[error];
        }
        else {
            this.errorTips.text = "error #" + error;
        }
    };
    CreateRoleView.prototype.initTabIcon = function () {
        var listData = [];
        for (var i = 0; i < 4; i++) {
            var obj = { id: 0, icon: "createRole_json.createrole_role0_b_png", icon2: "createRole_json.createrole_role0_a_png" };
            obj.id = i;
            obj.icon = "createRole_json.createrole_role" + i + "_b_png";
            obj.icon2 = "createRole_json.createrole_role" + i + "_a_png";
            listData.push(obj);
        }
        this.tabBtn.dataProvider = new eui.ArrayCollection(listData);
    };
    CreateRoleView.prototype.tabTouche = function () {
        this.nSlRole = this.tabBtn.selectedIndex;
        this.body.load("c" + (this.nSlRole + 1), true, false);
        this.body.play("stand");
    };
    CreateRoleView.prototype.close = function (param) {
        if (param === void 0) { param = null; }
        this.destroy();
    };
    CreateRoleView.prototype.bodyPlayEnd = function (act) {
        if (this.callHandler) {
            this.callHandler.args = [act];
            this.callHandler.run();
        }
    };
    CreateRoleView.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.imgRedom:
                this.lbRoleName.text = this._randomName.getRandomName(1);
                this.errorTips.text = "";
                break;
            case this.imgCreateRole:
                this.enterGame();
                break;
        }
    };
    CreateRoleView.prototype.enterGame = function () {
        Proxy.login.sendCreateRole(this.lbRoleName.text, //角色名字
        1, //性别
        this.nSlRole + 1, //职业
        0, //头像
        0, //阵营
        "" //平台
        );
    };
    CreateRoleView.prototype.destroy = function () {
        if (this.body) {
            this.body.dispose();
            this.body = null;
        }
        _super.prototype.destroy.call(this);
    };
    return CreateRoleView;
}(BaseEuiWindow));
__reflect(CreateRoleView.prototype, "CreateRoleView");
//# sourceMappingURL=CreateRoleView.js.map