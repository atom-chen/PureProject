/*
 * @Description: 其它角色英雄展示
 * @Author: liangzhaowei
 * @Date: 2019-09-29 10:31:37
 */

class RoleOtherSelect extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "RoleSelectSkin";
    }

    public listRole: eui.List;
    public handler: Handler;	//点击回调
    public nSlRole = 0;//当前选择角色
    public heroList = [];//英雄列表


    protected childrenCreated(): void {
        super.childrenCreated();
    }

    public setHeroList(list) {
        this.heroList = list;
        this.freshList();
    }

    public setHandler(thisc, func, args?: any[]): void {
        if (this.handler) {
            this.handler.dispose();
        }
        this.handler = Handler.create(thisc, func, args, false);
    }

    /**初始化 */
    public init(): void {
        this.listRole.itemRenderer = RoleInfoItem;
        this.freshList();
        this.addItemClick(this.listRole, this.itemClick)
    }

    public freshList() {
        let listRoleInfo = [];
        let heroList = this.heroList;
        for (let i = 0; i < GlobalVar.ROLE_MAX; i++) {
            let obj = { icon: "", index: 0 }
            let job = 0;
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
        this.setListData(this.listRole, listRoleInfo)
    }

    public getIcon(index: number, job = 0): string {
        let strIcon = ""
        switch (index) {
            case 0:
                strIcon = "public_json.public_role_lock_png";
                break;
            case 1:
                strIcon = "public_json.public_role_add_png";
                break;
            case 2:
                strIcon = `public_json.public_role_${job}_png`
                break;

            default:
                break;
        }
        return strIcon;
    }

    /*刷新list数据*/
    public setListData(list: eui.List, data: any[]): void {
        let dp = list.dataProvider as eui.ArrayCollection;
        dp ? dp.source = data : list.dataProvider = new eui.ArrayCollection(data);
    }


    public itemClick(e: eui.ItemTapEvent) {
        if (e.itemIndex != this.nSlRole) {
            let heroList = this.heroList;
            if (heroList[e.itemIndex]) {
                this.nSlRole = e.itemIndex;
                if (this.handler) {
                    this.handler.args = [this.nSlRole];
                    this.handler.run();
                }
                this.freshList();
            }
        }
    }


    /**移除 */
    public dispose() {
        if (this.handler) {
            this.handler.dispose();
        }
        super.dispose();
    }


}
