/**
 * create by junwei on 07/18/2019
 */
class PassInfo extends BaseCustComponent {
    public constructor() {
        super();
    }

    public nTxt: eui.Label;
    public aTxt: eui.Label;

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
    }

    public dispose(): void {
        super.dispose();
    }

    public lvlChange(): void {
        let lvl = GameCache.pass.level;
        let conf = GameConfig.passAw;
        let maxLen = Object.getOwnPropertyNames(conf).length;
        let aw = 0;
        let vipLvl = GameCache.vip.realValue();
        let vipConf = GameConfig.vip[vipLvl];
        let expC = vipConf ? vipConf.expadd / 10000 : 0;
        for (let i in conf) {
            if (conf[i].end >= lvl && conf[i].start <= lvl) {
                aw = (1 + conf[i].expup * (conf[i].end - conf[i].start)) * conf[i].exp;
            }
        }
        if (aw == 0) {
            let maxconf = conf[maxLen];
            aw = aw = (1 + maxconf.expup * (maxconf.end - maxconf.start)) * maxconf.exp;
        }
        aw = aw * (1 + expC)
        this.aTxt.text = Math.floor(aw) + "/min"
    }

}