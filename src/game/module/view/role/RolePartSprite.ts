/**
 * effect: 角色部位
 * author :lzw
 * data :2019.6.18 
 */

class RolePartSprite extends BaseCustComponent  {
    public constructor() {
        super();
        this.skinName = "RolePartSkin";
        // this.initUI()
    }

    public init() {
        // this.part.source = "role_json.role_part_" + this.name + "_png"
    }

    public bg: eui.Image;
    public part: eui.Image;
    public icon: eui.Image;

    // public update(data) {

    //     if (this["name"]) {
    //     }
    // }


}