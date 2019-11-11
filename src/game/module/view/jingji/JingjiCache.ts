/*
 * @Description: 竞技场数据
 * @Author: xiejunwei
 * @Date: 2019-09-03 19:11:34
 * @LastEditTime: 2019-10-26 11:54:27
 */
class JingjiCache extends BaseCache {

    public jingjiData: any;                  //个人竞技场数据
    public targetDetail: PropertySet[] = []; //目标详细数据
    public jingjiList: any[] = [];           //竞技场目标列表
    public targetIdx: number = 0;

    public constructor() {
        super();
        this.jingjiData = {
            winNum: 0,
            winPoint: 0,
            remain: 0,
            bought: 0,
            recoverTime: 0,
            refreshTime: 0,
            pointRank: 0
        };
    }

    clear() {
        this.jingjiData = {};
        this.targetDetail = [];
        this.jingjiList = [];
    }

    public initJingjiData(winNum, winPoint, remain, bought, recoverTime, refreshTime, pointRank): void {
        let obj = {
            winNum: winNum,
            winPoint: winPoint,
            remain: remain,
            bought: bought,
            recoverTime: recoverTime,
            refreshTime: refreshTime,
            pointRank: pointRank
        }
        this.jingjiData = obj;
        App.MessageCenter.dispatch(MsgConst.JINGJI_PERSONAL_DATA);
    }

    public getJingjiBuyMax(): number[] {
        let bought = this.jingjiData ? this.jingjiData.bought : 0;
        let vipLvl = GameCache.vip.realValue();
        let vipConf = GameConfig.vip[vipLvl];
        let nextConf = GameConfig.vip[vipLvl + 1] ? GameConfig.vip[vipLvl + 1] : vipConf;
        let max = GameConfig.jingji["1"].consumeTimes + vipConf.arena;
        let next = GameConfig.jingji["1"].consumeTimes + nextConf.arena;
        return [max, bought, next];
    }

    public checkEnter(): boolean {
        return !this.jingjiData || this.jingjiData.remain > 0;
    }

}