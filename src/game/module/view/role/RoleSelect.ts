/*
 * @Description: 窗口角色切换控件
 * @Author: liangzhaowei
 * @Date: 2019-08-07 18:44:45
 * @LastEditTime: 2019-11-04 15:59:15
 */
class RoleSelect extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "RoleSelectSkin";
    }

    public listRole: eui.List;
    public handler: Handler;	//点击回调
    public nSlRole = 0;//当前选择角色
    public showView;


    protected childrenCreated(): void {
        super.childrenCreated();
    }

    public setHandler(thisc, func, args?: any[]): void {
        if (this.handler) {
            this.handler.dispose();
        }
        this.handler = Handler.create(thisc, func, args, false);
        thisc && (this.showView = thisc);
    }


    /**设置角色下标 */
    public setRoleIndex(index: number) {
        this.nSlRole = index;
        this.freshList();
    }


    /**初始化 */
    public init(): void {
        this.listRole.itemRenderer = RoleInfoItem;
        App.MessageCenter.addListener(MsgConst.NEW_HERO, this.freshList, this);
        this.freshList();
        this.addItemClick(this.listRole, this.itemClick)
    }

    public freshList() {
        let listRoleInfo = [];
        let heroList = GameCache.hero.list;
        for (let i = 0; i < GlobalVar.ROLE_MAX; i++) {
            let obj = { icon: "", index: 0 }
            let job = 0;
            if (heroList[i]) {
                obj.index = this.nSlRole;
                job = heroList[i].pro.job - 1;
            }
            obj.icon = this.getIcon(GameCache.hero.getRoleStateByIndex(i), job);
            listRoleInfo.push(obj);
        }
        this.setListData(this.listRole, listRoleInfo)
    }

    public setListRed() {
        if (!this.showView) {
            return;
        }

        for (let i = 0; i < this.listRole.numChildren; i++) {
            if (GameCache.hero.list[i]) {
                App.ViewManager.showRedPoint(this.listRole.getChildAt(i), this.getRoleRedFun(i));
            }
        }
    }

    /**获取对应模块中的角色红点方法 */
    public getRoleRedFun(index: number) {
        let red = false;
        if (this.showView && this.showView["roleRed"]) {
            red = this.showView["roleRed"](GameCache.hero.getProByIndex(index).pro(PropId.AP_ACTOR_ID));
        }
        return red;
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
            let heroList = GameCache.hero.list;
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
    }

    public get roleId() {
        return GameCache.hero.getProByIndex(this.nSlRole).pro(PropId.AP_ACTOR_ID);
    }

    public get job() {
        return GameCache.hero.getProByIndex(this.nSlRole).pro(PropId.AP_JOB);
    }

    public get sex() {
        return GameCache.hero.getProByIndex(this.nSlRole).pro(PropId.AP_SEX);
    }

    public get serverId() {
        return GameCache.hero.getServerIdByIndex(this.nSlRole);
    }



    public get selectPro(): PropertySet {
        return GameCache.hero.getProByIndex(this.nSlRole);
    }

    /**移除 */
    public dispose() {
        if (this.handler) {
            this.handler.dispose();
        }
        super.dispose();
    }


}
