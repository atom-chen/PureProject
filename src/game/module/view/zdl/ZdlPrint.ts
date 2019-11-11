/**
 * create by junwei on 07/25/2019
 * 战斗力显示
 */
class ZdlPrint extends BaseCustComponent {
    public constructor() {
        super();
    }

    public zdl: NumberMC;
    private zdlValue: number = 0;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.zdl.gap = 17;
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (typeof (this.data) == "number") {
            this.zdl.value = this.data;
        } else if (typeof (this.data) == "string") {
            this.zdl.value = parseInt(this.data);
        }

    }

    public set value(val: any) {
        if (typeof (val) == "number") {
            this.zdl.value = val;
        } else if (typeof (val) == "string") {
            this.zdl.value = parseInt(val);
        }
    }

    public get value() {
        return this.zdl.value;
    }

    public dispose(): void {
        super.dispose();
    }

}