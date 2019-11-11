/*
 * @Description: 宝石替换条目 
 * @Author: xiejunwei
 * @Date: 2019-09-11 10:52:09
 * @LastEditTime: 2019-10-17 15:26:14
 */
class JewelReplaceItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public item_0: ItemBase;
    public propList: PropPart;
    public btn: eui.Button;
    public iName: eui.Label;
    public state: eui.Image;
    public zdl: NumberMC;



    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.btn, this.btnFunc);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data.item) {
            this.initData();
        }
    }

    public dispose(): void {
        super.dispose();
    }

    private setOrReplace: boolean = true;
    private initData(): void {
        // let item: StdItem = GameConfig.item[this.data.id];
        let item: StdItem = this.data.item;
        let gem = GameConfig.jewel[this.data.id];
        let roleId = GameCache.hero.getRoleIdByIndex(this.data.roleIdx);
        let jewList = GameCache.jewel.roleJewelList[roleId];
        this.item_0.data = item;
        this.iName.text = StringUtils.substitute(Language.lang.nameLvl, item.name, this.data.lvl);

        this.setOrReplace = jewList && jewList[this.data.part] ? false : true;

        this.propList.setData(item.staitcAttrs, [], 0, 0xffc600, 0xffffff);
        // let power = ItemUtils.getZdlByProp(item.staitcAttrs);
        this.zdl.value = this.data.power;

        if (this.data.curType == -1) {
            this.btn.visible = false;
            this.state.visible = true;
            this.state.source = "jewel_json.jewel_cur_png";
        } else {
            if ((gem.part == this.data.curType) || !this.data.have) {
                this.state.source = null;
                this.state.visible = false;
                this.btn.visible = true;
            } else {
                this.btn.visible = false;
                this.state.visible = true;
                this.state.source = "jewel_json.jewel_haved_png";
            }
        }
    }

    private btnFunc(): void {
        if (this.setOrReplace) {
            Proxy.jewel.sendSetJewel(this.data.roleIdx, this.data.part, this.data.id);
            App.ViewManager.close(ViewConst.JEWELREPLACE)
        } else {
            Proxy.jewel.sendReplace(this.data.roleIdx, this.data.part, this.data.id);
        }
    }

}