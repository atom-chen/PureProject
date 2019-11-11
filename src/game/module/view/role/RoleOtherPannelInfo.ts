/*
 * @Description: 其它角色内容
 * @Author: liangzhaowei
 * @Date: 2019-09-27 19:25:26
 */

class RoleOtherPannelInfo extends BaseSpriteView {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "RoleOtherPannelInfoSkin";
    }

    public lbRoleName: eui.Label;
    public gPart: eui.Group;
    public roleSelect: RoleOtherSelect;
    public role: UIAvatar;
    public gNe: eui.Group;
    public title: ThingTitle;
    public zdl: ZdlPrint;

    public roleData: any = {}


    //初始化
    public init() {

        this.roleSelect.setHeroList(GameCache.rank.otherRoleData.roleList)
        this.roleSelect.setHandler(this, this.roleClick)

        this.title = new ThingTitle();
        this.title.scaleX = 1.2
        this.title.scaleY = 1.2
        this.gNe.addChild(this.title)

    }

    /**角色选择回调 */
    public roleClick(param) {
        this.upRolePart();
    }

    public open(param: ViewProp = null) {
        if (!this.roleData) {
            return;
        }

        this.roleData = GameCache.rank.otherRoleData;
        this.upRolePart();
        /**显示名称 */
        this.title.setName(this.roleData.name);
        this.title.setBadge(this.roleData.badgeLv);

    }

    /**更新角色部位 */
    public upRolePart() {
        let sigleRoleData = this.roleData.roleList[this.roleSelect.nSlRole];
        if (!sigleRoleData) {
            return;
        }


        //战力显示
        this.zdl.value = sigleRoleData.power;

        let eqList = sigleRoleData.qe;
        let eqLvl = sigleRoleData.strent;
        for (let index in this.gPart.$children) {
            let item: EquipItem = this.gPart.$children[index] as EquipItem;
            item.touchEnabled = false;/**其它玩家不可以点击 */
            let eq: UserItem = eqList ? eqList[item.name] : null;
            if (eq) {
                item.data = eq;
                if (eqLvl && eqLvl[eq.stdItem.part]) item.strengthLvl = [eqLvl[eq.stdItem.part]];
            }
            else {
                item.strengthLvl = [0];
                if (item.data) {
                    item.reSet();
                    item.setColorImg();
                    item.setIconImg("role_json.role_part_" + item.name + "_png")
                }
            }
        }

        /**模型 */
        if (sigleRoleData.propSet) {
            this.role.setData(sigleRoleData.propSet);
        }
    }







}




