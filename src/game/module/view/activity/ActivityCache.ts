/*
 * @Description: 活动数据
 * @Author: xiejunwei
 * @Date: 2019-10-14 11:07:00
 */
class ActivityCache extends BaseClass {

    public serverOpen: number = 0;
    public xsyhData = {};
    public xslbData = {};

    public constructor() {
        super();
    }

    clear() {
        this.xsyhData = {};
        this.xslbData = {};
    }

    public initActivityData(): void {
        if (!this.serverOpen) this.serverOpen = GameCache.server.serverOpenDay;
    }

    public XSYHBough(idx): void {
        if (!this.xsyhData[this.serverOpen]) this.xsyhData[this.serverOpen] = {};
        if (!this.xsyhData[this.serverOpen][idx]) {
            this.xsyhData[this.serverOpen][idx] = 1;
        } else {
            this.xsyhData[this.serverOpen][idx]++;
        }
    }

    public XSLBBough(idx): void {
        if (!this.xslbData[this.serverOpen]) this.xslbData[this.serverOpen] = {};
        if (!this.xslbData[this.serverOpen][idx]) {
            this.xslbData[this.serverOpen][idx] = 1;
        } else {
            this.xslbData[this.serverOpen][idx]++;
        }
    }
}