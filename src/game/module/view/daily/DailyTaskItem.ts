/*
 * @Description: 日常任务item
 * @Author: liangzhaowei
 * @Date: 2019-08-14 14:27:09
 * @LastEditTime: 2019-10-22 20:07:58
 */
class DailyTaskItem extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "DailyTaskItemSkin";
    }

    // 任务条件
    public lbCnd: eui.Label;
    // 任务进度
    public lbPgr: eui.Label;
    // 活跃度
    public lbPt: eui.Label;
    public imgBtn: eui.Image;
    public imgSt: eui.Image;
    public btnGet: eui.Button;


    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.btnGet, this.onClick);
    }

    protected dataChanged(): void {
        super.dataChanged();
        let data: StdDaily = this.data;
        this.filters = null;
        if (data.id) {
            let dailyItem: DailyItem = GameCache.daily.dailyListData[data.id];
            let btnImgStr = "daily_json.daily_wjs_png";
            if (dailyItem) {
                switch (dailyItem.state) {
                    case 0:
                        btnImgStr = "daily_json.daily_wjs_png";
                        break;
                    case 1:
                        this.btnGet.icon = "res/btn/enter.png";
                        this.lbPgr.text = dailyItem.val + "/" + data.target.count;
                        break;
                    case 2:
                        this.btnGet.icon = "res/btn/get_2.png";
                        this.lbPgr.text = Language.lang.lcn1;
                        break;
                    case 3:
                        btnImgStr = "daily_json.daily_ylq_v_png";
                        this.lbPgr.text = Language.lang.lcn1;
                        break;
                    default:
                        break;
                }
                this.lbPgr.textColor = dailyItem.state == 1 ? 0xff2b2b : 0x0cff00;
                this.lbPgr.visible = dailyItem.state ? true : false;
                dailyItem.state == 0 && (this.filters = FilterUtils.DefaultGrayFilters);
                // 按钮和领取状态的显示关系是互斥的
                this.btnGet.visible = !(this.imgBtn.visible = dailyItem.state != 1 && dailyItem.state != 2);
            } else {
                this.lbPgr.visible = false;
                this.lbCnd.textColor = 0xffffff;
                // 按钮和领取状态的显示关系是互斥的
                this.btnGet.visible = !(this.imgBtn.visible = true);
                this.filters = FilterUtils.DefaultGrayFilters;
            }
            this.imgBtn.source = btnImgStr;
            this.imgSt.source = data.picture;
            this.lbCnd.text = data.desc;
            this.lbPt.text = StringUtils.substitute(Language.lang.dailyPointStr, data.award);
        }
    }

    public onClick() {
        let dailyItem: DailyItem = GameCache.daily.dailyListData[this.data.id];
        if (dailyItem) {
            if (dailyItem.state == 1) {
                if (this.data.mod) {
                    TextFlowUtils.hrefType(this.data.mod);
                    App.ViewManager.recoredWin(ViewConst.DAILY);
                }
            }
            else if (dailyItem.state == 2) {
                Proxy.daily.getTaskRw(this.data.id);
            }
        }
    }



}