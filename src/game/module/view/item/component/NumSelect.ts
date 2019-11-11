/**
 * create by junwei on 06/28/2019
 * 数量选择
 */
class NumSelect extends BaseCustComponent {
    public constructor() {
        super();
    }

    public nInput: eui.TextInput;
    public maxBtn: eui.Button;
    public minBtn: eui.Button;
    public pBtn: eui.Image;
    public mBtn: eui.Image;
    public tmBtn: eui.Image;
    public tpBtn: eui.Image;

    private _num: number = 0;
    private _max: number = 0;
    private _min: number = 0;
    public _handler: Handler;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.mBtn, this.onToucheFunc);
        this.addTouchEvent(this.pBtn, this.onToucheFunc);
        this.addTouchEvent(this.maxBtn, this.onToucheFunc);
        this.addTouchEvent(this.minBtn, this.onToucheFunc);
        this.addTouchEvent(this.tmBtn, this.onToucheFunc);
        this.addTouchEvent(this.tpBtn, this.onToucheFunc);
        this.addEvent(egret.FocusEvent.FOCUS_OUT, this.nInput, this.inputData);
    }

    protected dataChanged(): void {
        super.dataChanged();
    }

    public dispose(): void {
        super.dispose();
    }

    public get num() {
        return this._num;
    }

    /**
     * 初始化最大最小值
     */
    public initData(max: number, min: number, star?: number): void {
        this._max = max;
        this._min = min;
        this._num = star ? star : 0;
        this.nInput.text = this._num + "";
    }

    private onToucheFunc(e: egret.TouchEvent): void {
        let tar = e.target.name;
        switch (tar) {
            case "minus":
                this._num = this._num - 1 < this._min ? this._min : this._num - 1;
                break;
            case "plus":
                this._num = this._num + 1 > this._max ? this._max : this._num + 1;
                break;
            case "max":
                this._num = this._max;
                break;
            case "min":
                this._num = this._min;
                break;
            case "tmBtn":
                this._num = this._num - 10 < this._min ? this._min : this._num - 10;
                break;
            case "tmBtn":
                this._num = this._num + 10 > this._max ? this._max : this._num + 10;
                break;
        }
        this.nInput.text = this._num + "";
        this.handlerRun();
    }

    private inputData(): void {
        let num = parseInt(this.nInput.text);
        if (isNaN(num)) num = 1;
        this._num = num;
        this.nInput.text = num + "";
    }

    private handlerRun(): void {
        if (this._handler) {
            this._handler.run();
        }
    }
}