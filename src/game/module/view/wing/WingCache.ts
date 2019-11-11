/*
 * @Description: 翅膀数据
 * @Author: xiejunwei
 * @Date: 2019-08-14 19:09:02
 * @LastEditTime: 2019-10-24 17:38:49
 */
class WingCache extends BaseCache {

    public wingData;
    public wingUpcost = 0;      //翅膀消耗道具ID

    public constructor() {
        super();

        this.wingData = {};
    }

    clear() {
        this.wingData = {};
    }

    public initWingData(roleId, lvl, exp, count): void {
        let obj = {
            lvl: lvl,
            exp: exp,
            count: count
        }
        this.wingData[roleId] = obj;
        App.MessageCenter.dispatch(MsgConst.WING_INFO);
        if (!this.wingUpcost) this.wingUpcost = GameConfig.wing[1].consumeItems[0].id;
    }

    /**
     * 判断升级
     */
    public checkGrade(roleId?): boolean {
        if (!roleId) {
            let roleList = GameCache.hero.list;
            for (let i = 0; i < roleList.length; i++) {
                if (this.checkGrade(roleList[i].pro.pro(PropId.AP_ACTOR_ID))) return true;
            }
            return false;
        }
        let data = GameCache.wing.wingData[roleId];
        let lvl = data && data.lvl ? data.lvl : 0;
        let conf = GameConfig.wing[lvl + 1];
        if (!conf) return false;
        let main = GameCache.wing.wingData[GameCache.hero.mainPro.pro(PropId.AP_ACTOR_ID)];
        let count = main ? main.count : 0;
        let vipLvl = GameCache.vip.realValue();
        let limit = GameConfig.vip[vipLvl].wing;
        if (limit - count) {
            //判断金币
            let coin = GameCache.hero.mainPro.pro(PropId.AP_COIN);
            if (coin >= conf.consumeGold[0].count) return true;
        } else {
            //判断道具  
            let count = GameCache.bag.itemCount(conf.consumeItems[0].id);
            if (count >= conf.consumeItems[0].count) return true;
        }
        return false;
    }
}