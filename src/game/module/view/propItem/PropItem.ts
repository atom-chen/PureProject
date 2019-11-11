/**
 * create by junwei on 06/28/2019
 * 属性条目
 */
class PropItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public prop: eui.Label;


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
        if (this.data && this.data.type) {
            if (this["prop2"]) {
                let arr = this.getPropstring2(this.data);
                this.prop.textFlow = arr[0];
                this["prop2"].textFlow = arr[1];
                this["prop2"].visible = this["arrow"].visible = arr[1] ? true : false;
            } else {
                this.prop.textFlow = this.getPropString(this.data);
            }
        }
    }

    private getPropString(prop): egret.ITextElement[] {
        let conf = GameConfig.buffId[prop.type];
        let plus = prop["newValue"];
        if (!conf) return;
        let str = "";
        if (plus) {
            str = `<(c${prop["color"][0]})${conf["attname"]}>  <(c${prop["color"][1]})${prop["str"][0]}${prop.oldValue}>     <(c${prop["color"][2]})${prop["str"][1]}${plus}>`;
        } else {
            str = `<(c${prop["color"][0]})${conf["attname"]}>  <(c${prop["color"][1]})${prop["str"][0]}${prop.oldValue}>`
        }
        return TextFlowUtils.generateTextFlow(str);
    }

    private getPropstring2(prop): egret.ITextElement[][] {
        let conf = GameConfig.buffId[prop.type];
        let plus = prop["newValue"];
        if (!conf) {
            return [null, null];
        };
        let str_0 = "";
        let str_1 = "";
        str_0 = `<(c${prop["color"][0]})${conf["attname"]}:>  <(c${prop["color"][1]})${prop.oldValue}>`;
        str_1 = `<(c${prop["color"][2]})${plus}>`;
        let a = TextFlowUtils.generateTextFlow(str_0);
        let b = plus && plus > prop.oldValue ? TextFlowUtils.generateTextFlow(str_1) : null;
        return [a, b];
    }

}