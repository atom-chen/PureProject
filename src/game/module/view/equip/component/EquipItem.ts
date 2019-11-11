/**
 * create by junwei on 07/23/2019
 */
class EquipItem extends ItemBase {

    public strength: eui.Label;
    public refine: eui.Label;

    private _strenghLvl: number = 0;
    private _refineLv: number = 0;

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
    }

    public set strengthLvl(value: any[]) {
        if (!value || !value.length) return;
        if (!this.strength) {
            this.strength = new eui.Label();
            this.strength.textColor = 0x06ff00;
            this.strength.stroke = 2;
            this.strength.strokeColor = 0x000000;
            this.strength.size = 16;
            this.strength.top = 7;
            this.strength.left = 9;
            this.addChild(this.strength);
        }
        if (value[0] != 0) {
            this.strength.text = value[0];
            this._strenghLvl = value[0];
        } else {
            this.strength.text = "";
        }
    }

    public get strenghLvl() {
        return this._strenghLvl;
    }

    public set refineLvl(value: number) {
        if (value > 0) {
            this._refineLv = value;
        }
        if (!this.refine) {
            this.refine = new eui.Label();
            this.refine.textColor = 0x00ccff;
            this.refine.stroke = 2;
            this.refine.strokeColor = 0x000000;
            this.refine.size = 16;
            this.refine.bottom = 7;
            this.refine.right = 9;
            this.addChild(this.refine);
        }
        this.refine.text = value > 0 ? ("+" + value) : "";
    }

    public get refineLvl() {
        return this._refineLv;
    }

    public dispose(): void {
        super.dispose();
    }
}