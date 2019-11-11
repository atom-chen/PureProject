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
 * @Description: 窗口角色切换控件
 * @Author: liangzhaowei
 * @Date: 2019-08-07 18:44:45
 * @LastEditTime: 2019-11-04 15:59:15
 */
var RoleSelect = (function (_super) {
    __extends(RoleSelect, _super);
    function RoleSelect() {
        var _this = _super.call(this) || this;
        _this.nSlRole = 0; //当前选择角色
        _this.skinName = "RoleSelectSkin";
        return _this;
    }
    RoleSelect.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    RoleSelect.prototype.setHandler = function (thisc, func, args) {
        if (this.handler) {
            this.handler.dispose();
        }
        this.handler = Handler.create(thisc, func, args, false);
        thisc && (this.showView = thisc);
    };
    /**设置角色下标 */
    RoleSelect.prototype.setRoleIndex = function (index) {
        this.nSlRole = index;
        this.freshList();
    };
    /**初始化 */
    RoleSelect.prototype.init = function () {
        this.listRole.itemRenderer = RoleInfoItem;
        App.MessageCenter.addListener(MsgConst.NEW_HERO, this.freshList, this);
        this.freshList();
        this.addItemClick(this.listRole, this.itemClick);
    };
    RoleSelect.prototype.freshList = function () {
        var listRoleInfo = [];
        var heroList = GameCache.hero.list;
        for (var i = 0; i < GlobalVar.ROLE_MAX; i++) {
            var obj = { icon: "", index: 0 };
            var job = 0;
            if (heroList[i]) {
                obj.index = this.nSlRole;
                job = heroList[i].pro.job - 1;
            }
            obj.icon = this.getIcon(GameCache.hero.getRoleStateByIndex(i), job);
            listRoleInfo.push(obj);
        }
        this.setListData(this.listRole, listRoleInfo);
    };
    RoleSelect.prototype.setListRed = function () {
        if (!this.showView) {
            return;
        }
        for (var i = 0; i < this.listRole.numChildren; i++) {
            if (GameCache.hero.list[i]) {
                App.ViewManager.showRedPoint(this.listRole.getChildAt(i), this.getRoleRedFun(i));
            }
        }
    };
    /**获取对应模块中的角色红点方法 */
    RoleSelect.prototype.getRoleRedFun = function (index) {
        var red = false;
        if (this.showView && this.showView["roleRed"]) {
            red = this.showView["roleRed"](GameCache.hero.getProByIndex(index).pro(PropId.AP_ACTOR_ID));
        }
        return red;
    };
    RoleSelect.prototype.getIcon = function (index, job) {
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
    RoleSelect.prototype.setListData = function (list, data) {
        var dp = list.dataProvider;
        dp ? dp.source = data : list.dataProvider = new eui.ArrayCollection(data);
    };
    RoleSelect.prototype.itemClick = function (e) {
        if (e.itemIndex != this.nSlRole) {
            var heroList = GameCache.hero.list;
            if (heroList[e.itemIndex]) {
                this.nSlRole = e.itemIndex;
                if (this.handler) {
                    this.handler.args = [this.nSlRole];
                    this.handler.run();
                }
                this.freshList();
            }
            else {
                App.ViewManager.open(ViewConst.ADVENTURE);
            }
        }
    };
    Object.defineProperty(RoleSelect.prototype, "roleId", {
        get: function () {
            return GameCache.hero.getProByIndex(this.nSlRole).pro(PropId.AP_ACTOR_ID);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleSelect.prototype, "job", {
        get: function () {
            return GameCache.hero.getProByIndex(this.nSlRole).pro(PropId.AP_JOB);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleSelect.prototype, "sex", {
        get: function () {
            return GameCache.hero.getProByIndex(this.nSlRole).pro(PropId.AP_SEX);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleSelect.prototype, "serverId", {
        get: function () {
            return GameCache.hero.getServerIdByIndex(this.nSlRole);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleSelect.prototype, "selectPro", {
        get: function () {
            return GameCache.hero.getProByIndex(this.nSlRole);
        },
        enumerable: true,
        configurable: true
    });
    /**移除 */
    RoleSelect.prototype.dispose = function () {
        if (this.handler) {
            this.handler.dispose();
        }
        _super.prototype.dispose.call(this);
    };
    return RoleSelect;
}(BaseCustComponent));
__reflect(RoleSelect.prototype, "RoleSelect");
//# sourceMappingURL=RoleSelect.js.map