/*
 * @Description: 排行榜内容
 * @Author: liangzhaowei
 * @Date: 2019-09-25 11:32:52
 */

class RankPannel extends BaseSpriteView {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "RankPannelSkin";
    }

    public listItem: eui.List;
    public tabBtn: eui.TabBar;
    public roleMdl0: UIAvatar;
    public roleMdl1: UIAvatar;
    public roleMdl2: UIAvatar;
    public imgMore: eui.Image;
    public imgDown: eui.Image;
    public rankNum: NumberMC;
    public rankValue: NumberMC;
    public title: ThingTitle;


    public rankListType = []
    /**单个排行榜数据 */
    public rankType = 1;
    public rankSigleData;
    public gNe: eui.Group;

    //初始化
    public init() {
        this.listItem.itemRenderer = RankViewItem;
        let rankTypeIcon = [];
        for (let index in GameConfig.rank) {
            let rankData: StdRank = GameConfig.rank[index]
            if (rankData.open) {
                this.rankListType.push(rankData.type);
                let obj = { icon2: "rank_json.rank_type_0_png", icon: "rank_json.rank_type_0_ud_png" }
                obj.icon = `rank_json.rank_type_${rankData.type}_ud_png`
                obj.icon2 = `rank_json.rank_type_${rankData.type}_png`
                rankTypeIcon.push(obj);
            }
        }
        this.tabBtn.dataProvider = new eui.ArrayCollection(rankTypeIcon);



        this.rankNum.gap = 15;
        this.rankValue.gap = 15;


        this.title = new ThingTitle();
        this.title.scaleX = 1.2
        this.title.scaleY = 1.2
        this.gNe.addChild(this.title)


    }


    public open(param: ViewProp = null) {
        this.askRank();
        this.addTouchEvent(this.tabBtn, this.tabTouche);
        this.message(MsgConst.RANK_INFO, this.upCn);
    }


    public askRank() {
        Proxy.rank.askRank(this.rankListType[this.tabBtn.selectedIndex]);
    }

    private tabTouche(): void {
        if (this.rankType != this.tabBtn.selectedIndex) {
            this.askRank();
            this.upCn();
        }
    }

    /**更新内容 */
    public upCn() {
        this.rankType = this.rankListType[this.tabBtn.selectedIndex];
        this.rankSigleData = GameCache.rank.rankData[this.rankType];

        if (!this.rankSigleData) {
            return;
        }

        /**排行榜数据 */
        this.setListData(this.listItem, this.rankSigleData.rankList,true);
        this.rankNum.value = this.rankSigleData.myRank;
        this.rankValue.value = this.rankSigleData.myValue;
        this.imgMore.visible = !this.rankSigleData.myRank;
        this.rankValue.visible = this.rankSigleData.myRank;
        this.imgDown.source = `rank_json.rank_down_${this.rankSigleData.type}_png`
        this.refreshRoleModel();


        /**显示名称 */
        if (this.rankSigleData.rankList && this.rankSigleData.rankList[0]) {
            let data: RankItemData = this.rankSigleData.rankList[0];
            this.title.setName(data.name);
            // this.title.setBadge(data.badgeLv);
        }
    }


    /**刷新模型内容 */
    public refreshRoleModel() {
        if (this.rankSigleData && this.rankSigleData.firstRoleList) {
            for (let i = 0; i < 3; i++) {
                this["roleMdl" + i].visible = this.rankSigleData.firstRoleList[i];
                if (this.rankSigleData.firstRoleList[i]) {
                    this["roleMdl" + i].setData(this.rankSigleData.firstRoleList[i]);
                }
            }
        }

    }




}




