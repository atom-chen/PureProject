/*
 * @Description: 限时优惠窗口
 * @Author: xiejunwei
 * @Date: 2019-10-14 10:03:49
 */

class XSYHWin extends CommunalPageWin {
    public constructor() {
        super();
        this.skinName = "CommunalPageWin4Skin";
    }

    public init(): void {
        super.init();
        let classArr = [XSYHPannel];
        let listData = [];
        for (let i = 1; i <= classArr.length; i++) {
            let obj = {}
            obj['icon'] = "bag_json.bag_index_" + i + "_png";
            obj['icon2'] = "bag_json.bag_index_" + i + "_a_png";
            listData.push(obj);
        }
        this.setViewData(listData, classArr);
    }

    public open(): void {
        super.open();
    }
}