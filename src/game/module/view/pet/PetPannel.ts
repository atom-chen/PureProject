/*
 * @Description: 宠物页签
 * @Author: liangzhaowei
 * @Date: 2019-08-01 19:32:56
 * @LastEditTime: 2019-10-18 14:00:13
 */
class PetPannel extends CommunalPagePannel {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
    }

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    public open(param: ViewProp = null) {
        super.open(param);

    }

    public init(): void {
        super.init();
    }


    /**用于阻止点击事件 */
    public onTabEvent(e: egret.Event) {
        let tab: eui.TabBar = e.target;
        let bDefault = false;
        if (tab.selectedIndex == 1) {
            if (Object.keys(GameCache.pet.petArray).length == 0) {
                e.preventDefault();
                GlobalFun.SysMsg(Language.lang.lcn15);
                bDefault = true;
            }
        }

        if (!bDefault) {
            super.onTabEvent(e);
        }
    }


}
