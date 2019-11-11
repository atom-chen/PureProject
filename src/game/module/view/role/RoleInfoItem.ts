/**
 * effect: 角色部位
 * author :lzw
 * data :2019.6.18 
 */

class RoleInfoItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "RoleInfoItemSkin";
    }



    public roleType: eui.Image;
    public imgRoleSl: eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        // this.addTouchEvent(this, this.onTouche);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data) {
            this.roleType.source = this.data.icon;
            this.imgRoleSl.visible = this.data.index == this.itemIndex;
        }
    }


}