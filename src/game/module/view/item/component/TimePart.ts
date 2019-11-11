/*
 * @Description: 时限模块
 * @Author: xiejunwei
 * @Date: 2019-08-12 21:46:16
 * @LastEditTime: 2019-10-14 15:29:07
 */
class TimePart extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "TimePartSkin";
    }

    public countDown: eui.Label;

    private time = 0;

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
    }

    public dispose(): void {
        super.dispose();
        App.TimerManager.removeAll(this);
    }

    /**
     * 设置数据
     * @param type 1为普通道具时限 2为时装时限
     */
    public setData(time = 0): void {
        this.time = time;
        if (this.time) {
            if (!App.TimerManager.isExists(this.timeCount, this))
                App.TimerManager.addDelay(0, 1000, 0, this.timeCount, this);
        }
    }

    private timeCount(): void {
        let sT = Math.ceil(GameCache.server.serverTime / 1000);
        let d = this.time - sT;
        if (d > 0) {
            this.countDown.text = StringUtils.substitute(Language.lang.relistTime, App.DateUtils.getFormatBySecond(d, DateUtils.TIME_FORMAT_12));
        } else {
            App.TimerManager.removeAll(this);
            this.countDown.text = StringUtils.substitute(Language.lang.relistTime, App.DateUtils.getFormatBySecond(0, DateUtils.TIME_FORMAT_12));
        }
    }

    public cleanTime(): void {
        App.TimerManager.removeAll(this);
    }

}