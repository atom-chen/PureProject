/**
 * create by junwei on 06/26/2019
 */
class ConfigEdItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public tInput: eui.TextInput;
    public prop: eui.Label;


    protected childrenCreated(): void {
        super.childrenCreated();
        this.addEvent(egret.FocusEvent.FOCUS_IN, this.tInput, this.BeginInput);
        this.addEvent(egret.FocusEvent.FOCUS_OUT, this.tInput, this.EndInput);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data.prop) {
            this.prop.text = this.data.prop;
            this.tInput.prompt = this.data.value + "";
        }
    }

    private BeginInput(): void {
        this.tInput.text = this.tInput.prompt;
    }

    private EndInput() {
        this.tInput.prompt = this.tInput.text;
        this.tInput.text = "";
        let conf = GameConfig.skillEff[this.data.sId];
        conf[this.data.prop] = typeof (this.data.value) == "number" ? parseInt(this.tInput.prompt) : this.tInput.prompt;
    }

    public dispose(): void {
        super.dispose();
    }

}