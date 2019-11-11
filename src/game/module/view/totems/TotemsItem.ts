/*
 * @Description: 图腾条目
 * @Author: xiejunwei
 * @Date: 2019-08-27 14:33:01
 * @LastEditTime: 2019-08-29 20:28:16
 */
class TotemsItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public bg: eui.Image;
    public icon: eui.Image;
    public tName: eui.Image;
    public lvl: eui.Label;

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        this.initData();
    }

    public dispose(): void {
        super.dispose();
    }

    private initData(): void {
        let conf = GameConfig.totems[this.data];
        let totemsData = GameCache.totems.totemsData[this.data];
        let id = totemsData ? totemsData.id : 1;
        if (!conf) return;
        this.icon.source = id > 1 ? RES_DIR_TOTEMS_ICON + "s" + this.data + ".png" : RES_DIR_TOTEMS_ICON + "s" + this.data + "u.png";
        this.lvl.text = StringUtils.substitute(Language.lang.jie, StringUtils.toCNUpper(conf[id].classLvl));
        this.bg.source = id > 1 ? "totems_json.totems_item_bg_" + conf[id].icon + "_png" : "totems_json.totems_item_bg_0_png";
        this.tName.source = id > 1 ? RES_DIR_TOTEMS_NAME + "s" + this.data + ".png" : RES_DIR_TOTEMS_NAME + "s" + this.data + "u.png"
    }

}