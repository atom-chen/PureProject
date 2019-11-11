/*
 * @Description: 滑动选择模块
 * @Author: liangzhaowei
 * @Date: 2019-08-13 16:03:47
 * @LastEditTime: 2019-08-15 19:10:51
 */
class SlidePage extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "SlidePageSkin";
    }

    public list: eui.List;
    public tabBtn: eui.TabBar;
    public gTouch: eui.Group;

    public listGroup = [];
    public activeSlideLen = 10;
    public page = 0;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.list.itemRenderer = ItemBase;

        App.DisplayUtils.slideContent(this.gTouch, this.moveAct, this);
        App.DisplayUtils.slideContent(this, this.moveAct, this);

    }

    public moveAct(nLenght: number) {
        if (nLenght > this.activeSlideLen) {
            if (this.page > 0) {
                this.page = this.page - 1;
            }
            this.setList();
        }
        else if (nLenght < -this.activeSlideLen) {
            if (this.page < this.listGroup.length - 1) {
                this.page = this.page + 1;
            }
            this.setList();
        }
    }

    /**listItem 物品列表  showNum 每行显示数量*/
    public setData(listItem: any[], showNum: number = 3, gap: number = 10) {
        this.listGroup = [];
        for (var i = 0, len = listItem.length; i < len; i += showNum) {
            this.listGroup.push(listItem.slice(i, i + showNum));
        }
        let listTagImg = []
        for (let i = 0; i < this.listGroup.length; i++) {
            let obj = { icon: "public_json.public_page_bg_png", icon2: "public_json.public_page_sl_png" };
            listTagImg.push(obj);
        }
        this.tabBtn.dataProvider = new eui.ArrayCollection(listTagImg);
        this.list.layout["gap"] = gap;
        this.setList();
        this.tabBtn.visible = this.listGroup.length > 1;
    }


    /**刷新列表 */
    public setList() {
        this.tabBtn.selectedIndex = this.page;
        this.setListData(this.list, this.listGroup[this.page]);
    }

}
