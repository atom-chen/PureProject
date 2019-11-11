/*
 * @Description: 复活管理器
 * @Author: xiejunwei
 * @Date: 2019-08-22 16:37:48
 * @LastEditTime: 2019-09-11 14:29:34
 */
class ReviveMgr {
    static roleRevive(time, roleList): void {
        let dieRoleId = [];
        for (let index in roleList) {
            dieRoleId.push(roleList[index].job);
        }
        /**性别需要后期加进去的 */
        let viewData = new ViewProp();
        viewData.exData1 = dieRoleId;
        viewData.exData2 = time;
        App.ViewManager.open(ViewConst.REVIVE, viewData);
    }
}