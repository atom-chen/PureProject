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
 * @Description: 服务器条目
 * @Author: xiejunwei
 * @Date: 2019-10-10 14:42:29
 */
var ServerItem = (function (_super) {
    __extends(ServerItem, _super);
    function ServerItem() {
        return _super.call(this) || this;
    }
    ServerItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    ServerItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data.server_id)
            return;
        this.sName.textFlow = TextFlowUtils.generateTextFlow(this.data.name);
        this.stateTag.source = "login_json.login_state_" + this.data.server_status + "_png";
        this.stateIcon.source = "login_json.login_state_p_" + this.data.server_status + "_png";
    };
    ServerItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ServerItem;
}(BaseCustComponent));
__reflect(ServerItem.prototype, "ServerItem");
//# sourceMappingURL=ServerItem.js.map