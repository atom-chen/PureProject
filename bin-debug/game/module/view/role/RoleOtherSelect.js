/*
 * @Description: 其它角色英雄展示
 * @Author: liangzhaowei
 * @Date: 2019-09-29 10:31:37
 */
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
var RoleOtherSelect = (function (_super) {
    __extends(RoleOtherSelect, _super);
    function RoleOtherSelect() {
        var _this = _super.call(this) || this;
        _this.nSlRole = 0; //当前选择角色
        _this.heroList = []; //英雄列表
        _this.skinName = "RoleSelectSkin";
        return _this;
    }
    RoleOtherSelect.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    RoleOtherSelect.prototype.setHeroList = function (list) {
        this.heroList = list;
        this.freshList();
    };
    RoleOtherSelect.prototype.setHandler = function (thisc, func, args) {
        if (this.handler) {
            this.handler.dispose();
        }
        this.handler = Handler.create(thisc, func, args, false);
    };
    /**初始化 */
    RoleOtherSelect.prototype.init = function () {
        this.listRole.itemRenderer = RoleInfoItem;
        this.freshList();
        this.addItemClick(this.listRole, this.itemClick);
    };
    RoleOtherSelect.prototype.freshList = function () {
        var listRoleInfo = [];
        var heroList = this.heroList;
        for (var i = 0; i < GlobalVar.ROLE_MAX; i++) {
            var obj = { icon: "", index: 0 };
            var job = 0;
            if (heroList[i]) {
                obj.index = this.nSlRole;
                job = heroList[i].job - 1;
                obj.icon = this.getIcon(2, job);
            }
            else {
                obj.icon = this.getIcon(0, job);
            }
            listRoleInfo.push(obj);
        }
        this.setListData(this.listRole, listRoleInfo);
    };
    RoleOtherSelect.prototype.getIcon = function (index, job) {
        if (job === void 0) { job = 0; }
        var strIcon = "";
        switch (index) {
            case 0:
                strIcon = "public_json.public_role_lock_png";
                break;
            case 1:
                strIcon = "public_json.public_role_add_png";
                break;
            case 2:
                strIcon = "public_json.public_role_" + job + "_png";
                break;
            default:
                break;
        }
        return strIcon;
    };
    /*刷新list数据*/
    RoleOtherSelect.prototype.setListData = function (list, data) {
        var dp = list.dataProvider;
        dp ? dp.source = data : list.dataProvider = new eui.ArrayCollection(data);
    };
    RoleOtherSelect.prototype.itemClick = function (e) {
        if (e.itemIndex != this.nSlRole) {
            var heroList = this.heroList;
            if (heroList[e.itemIndex]) {
                this.nSlRole = e.itemIndex;
                if (this.handler) {
                    this.handler.args = [this.nSlRole];
                    this.handler.run();
                }
                this.freshList();
            }
        }
    };
    /**移除 */
    RoleOtherSelect.prototype.dispose = function () {
        if (this.handler) {
            this.handler.dispose();
        }
        _super.prototype.dispose.call(this);
    };
    return RoleOtherSelect;
}(BaseCustComponent));
__reflect(RoleOtherSelect.prototype, "RoleOtherSelect");
//# sourceMappingURL=RoleOtherSelect.js.map