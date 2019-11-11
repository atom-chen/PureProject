var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 复活管理器
 * @Author: xiejunwei
 * @Date: 2019-08-22 16:37:48
 * @LastEditTime: 2019-09-11 14:29:34
 */
var ReviveMgr = (function () {
    function ReviveMgr() {
    }
    ReviveMgr.roleRevive = function (time, roleList) {
        var dieRoleId = [];
        for (var index in roleList) {
            dieRoleId.push(roleList[index].job);
        }
        /**性别需要后期加进去的 */
        var viewData = new ViewProp();
        viewData.exData1 = dieRoleId;
        viewData.exData2 = time;
        App.ViewManager.open(ViewConst.REVIVE, viewData);
    };
    return ReviveMgr;
}());
__reflect(ReviveMgr.prototype, "ReviveMgr");
//# sourceMappingURL=ReviveMgr.js.map