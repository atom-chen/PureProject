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
 * @Description: 宠物
 * @Author: guolinsen
 * @Date: 2019-07-29 17:22:47
 * @LastEditTime: 2019-10-17 20:06:00
 */
var PetProxy = (function (_super) {
    __extends(PetProxy, _super);
    function PetProxy() {
        var _this = _super.call(this, PacketTypes.PET) || this;
        _this.regNetMsg(1, _this.doInitPet); //返回拥有的宠物信息列表
        _this.regNetMsg(2, _this.doRefreshPet); //更新一个宠物的全部信息
        return _this;
    }
    PetProxy.prototype.doInitPet = function (pBytes) {
        var count = pBytes.readByte();
        var petArray = {};
        for (var i = 0; i < count; i++) {
            var item = new PetItem();
            item.init(pBytes);
            petArray[item.wid] = item;
        }
        GameCache.pet.initData(petArray);
        App.MessageCenter.dispatch(MsgConst.PET_INFO);
    };
    PetProxy.prototype.doRefreshPet = function (pBytes) {
        var originLength = Object.keys(GameCache.pet.petArray);
        GameCache.pet.upData(pBytes);
        if (originLength < Object.keys(GameCache.pet.petArray)) {
            App.MessageCenter.dispatch(MsgConst.PET_ACTIVATE);
        }
        else {
            App.MessageCenter.dispatch(MsgConst.PET_INFO);
        }
    };
    /**激活宠物*/
    PetProxy.prototype.actPet = function (id) {
        var bytes = this.getBytes(2);
        bytes.writeUnsignedShort(id);
        this.sendToServer(bytes);
    };
    /**切换状态*/
    PetProxy.prototype.changeState = function (id, state) {
        var bytes = this.getBytes(3);
        bytes.writeUnsignedShort(id);
        bytes.writeByte(state);
        this.sendToServer(bytes);
    };
    /**升星*/
    PetProxy.prototype.upStar = function (id) {
        var bytes = this.getBytes(4);
        bytes.writeUnsignedShort(id);
        this.sendToServer(bytes);
    };
    /**升级*/
    PetProxy.prototype.upLevel = function (petId, itemNum, itemId) {
        var bytes = this.getBytes(5);
        bytes.writeUnsignedShort(petId);
        bytes.writeUnsignedShort(itemNum);
        bytes.writeInt(itemId);
        this.sendToServer(bytes);
    };
    return PetProxy;
}(BaseProxy));
__reflect(PetProxy.prototype, "PetProxy");
//# sourceMappingURL=PetProxy.js.map