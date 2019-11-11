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
 * 登录
*/
var LoginProxy = (function (_super) {
    __extends(LoginProxy, _super);
    function LoginProxy() {
        var _this = _super.call(this, PacketTypes.LOGIN) || this;
        _this.regNetMsg(1, _this.doCheckAccount); //向客户端返回登陆的错误
        _this.regNetMsg(2, _this.doRoleList); //向客户端下发用户列表
        _this.regNetMsg(3, _this.doCreateRoleBack); //创建角色
        return _this;
    }
    /**
     * 处理登录认证
     * 255-1
     * @param bytes
     */
    LoginProxy.prototype.doCheckAccount = function (bytes) {
        var result = bytes.readByte();
        console.log("登录错误#" + result);
    };
    LoginProxy.prototype.doCreateRoleBack = function (bytes) {
        var roleId = bytes.readUnsignedInt();
        var result = bytes.readByte();
        //创建成功
        if (!result) {
            //发送角色查询消息，刷新角色列表
            var bytes_1 = this.getBytes(3);
            this.sendToServer(bytes_1);
            return;
        }
        //GlobalFun.SysMsg("创建角色错误："+ result);
        App.MessageCenter.dispatch(MsgConst.CREATE_ROLE_ERROR, result);
    };
    /**
     * 处理角色列表
     * 255-4
     * @param bytes
     */
    LoginProxy.prototype.doRoleList = function (bytes) {
        var id = bytes.readInt();
        var code = bytes.readByte();
        var roleArr = [];
        console.log("返回角色列表", code);
        switch (code) {
            case 0:
                SceneManager.ins().runScene(CreateRoleScene);
                break;
            default:
                var roleNum = code;
                for (var i = 0; i < roleNum; i++) {
                    var role = new SelectRoleData(bytes);
                    roleArr.push(role);
                }
                if (roleNum >= 1) {
                    SceneManager.ins().runScene(MainScene);
                    Proxy.main.sendEnterGameScene(id, roleArr[0].id);
                }
                break;
        }
        App.MessageCenter.dispatch(MsgConst.GET_ROLELIST, id, roleArr);
        LocationProperty.enterGame();
    };
    /**
     * 请求创建角色
     * 255-4
     * @param roleName
     * @param sex
     * @param job
     * @param head
     * @param camp
     * @param pf
     */
    LoginProxy.prototype.sendCreateRole = function (roleName, sex, job, head, camp, pf) {
        if (head === void 0) { head = 0; }
        if (camp === void 0) { camp = 0; }
        var bytes = this.getBytes(4);
        bytes.writeString(roleName);
        bytes.writeByte(sex);
        bytes.writeByte(job);
        bytes.writeByte(head);
        bytes.writeByte(camp);
        bytes.writeString(LocationProperty.pfid);
        //bytes.writeString(LocationProperty.appid);
        bytes.writeInt(parseInt(LocationProperty.appid));
        this.sendToServer(bytes);
    };
    return LoginProxy;
}(BaseProxy));
__reflect(LoginProxy.prototype, "LoginProxy");
//# sourceMappingURL=LoginProxy.js.map