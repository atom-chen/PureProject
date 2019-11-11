/*
 * @Description: 角色图标
 * @Author: xiejunwei
 * @Date: 2019-08-01 10:37:43
 * @LastEditTime: 2019-09-05 15:48:29
 */
class RoleIcon extends BaseCustComponent {
    public constructor() {
        super();
    }

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!(this.data instanceof PropertySet)) return;
        this.initData();
    }

    public dispose(): void {
        super.dispose();
    }

    private initData(): void {
        let data: PropertySet = this.data;
        if (data.pro(PropId.AP_HP) <= 0) {
            this.filters = FilterUtils.DefaultGrayFilters;
        } else {
            this.filters = [];
        }
    }

}
