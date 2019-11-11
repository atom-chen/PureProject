/*
 * @Description: vip滑动item
 * @Author: liangzhaowei
 * @Date: 2019-08-27 16:21:52
 * @LastEditTime: 2019-09-05 18:03:21
 */

class VipWelfareSlideItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "VipWelfareSlideItemSkin";
    }

    public listDes: eui.List;



    protected childrenCreated(): void {
        super.childrenCreated();
        this.listDes.itemRenderer = VipWelfareItem;
    }

    protected dataChanged(): void {
        super.dataChanged();
        this.setListData(this.listDes, this.getDesList(this.data));

    }


    /**vip内容 */
    public getDesList(vipcfig: StdVip) {
        let list = []
        if (!vipcfig.sort) {
            /**根据排序字段显示列表 */
            for (let index in vipcfig.des) {
                let obj = { bNew: false, dec: "" };
                obj.dec = vipcfig.des[index];
                obj.bNew = parseInt(index) < vipcfig.number;
                list.push(obj);
            }
        }
        else {
            for (let index in vipcfig.sort) {
                let cdenx = vipcfig.sort[index];
                let obj = { bNew: false, dec: "" };
                let des = vipcfig.des[cdenx];
                if (des) {
                    obj.dec = des;
                    obj.bNew = parseInt(index) < vipcfig.number;
                    list.push(obj);
                }
            }
        }

        return list;
    }


}