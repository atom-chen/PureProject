// TypeScript file
class ActorSeleMgr extends BaseClass {
    public constructor() {
        super();
    }

    private static actorHp: ActorHp;
    private static thing: any;

    static onSele(thing): void {
        if (!thing) {
            // this.offSele();
            return;
        }
        let view = App.ViewManager.getView(ViewConst.MAIN_UI);
        let actorHp: any = view.getChildByName("SELEHP");
        //过滤非BOSS的怪
        if (thing instanceof MonsterThing) {
            let mConfig = GameConfig.monster[thing.id];
            if (!mConfig || mConfig.monsterType != MonsterType.BOSS) {
                this.offSele();
                return;
            };
        }
        if (!actorHp) {
            actorHp = ObjectPool.get(ActorHp);
            actorHp.name = "SELEHP";
            view.addChild(actorHp);
        }
        actorHp.visible = true;
        actorHp.data = thing;
        this.actorHp = actorHp;
        this.thing = thing;
        actorHp.top = 110;
        actorHp.horizontalCenter = 1;
    }


    static offSele(): void {
        let view = App.ViewManager.getView(ViewConst.MAIN_UI);
        let actorHp: any = view.getChildByName("SELEHP");
        if (actorHp) {
            view.removeChild(actorHp);
            ObjectPool.push(actorHp);
            actorHp = null;
        }
        this.actorHp = null;
        this.thing = null;
    }

    static hpChange(thing): void {
        if (thing != this.thing) return;
        if (this.actorHp) {
            let hp = thing.isDie ? 0 : thing.pro.pro(PropId.AP_HP)
            this.actorHp.hpChange(hp);
        }
    }
}