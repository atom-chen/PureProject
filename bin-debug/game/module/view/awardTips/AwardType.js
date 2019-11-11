/*
 * @Description: 奖励类型，跟通用奖励配置的type对应
 * @Author: guolinsen
 * @Date: 2019-08-21 20:51:01
 * @LastEditTime: 2019-10-23 16:45:37
 */
var AwardType;
(function (AwardType) {
    AwardType[AwardType["ITEM"] = 0] = "ITEM";
    AwardType[AwardType["CREATE_HERO"] = 41] = "CREATE_HERO"; //激活副角色
})(AwardType || (AwardType = {}));
var AwardSourceType;
(function (AwardSourceType) {
    /**竞技 */
    AwardSourceType[AwardSourceType["JINGJI"] = 0] = "JINGJI";
    /**副本 */
    AwardSourceType[AwardSourceType["COPY"] = 1] = "COPY";
    /**扫荡 */
    AwardSourceType[AwardSourceType["SWEEP"] = 2] = "SWEEP";
    /**BOSS参与*/
    AwardSourceType[AwardSourceType["BOSS"] = 3] = "BOSS";
    /**BOSS归属*/
    AwardSourceType[AwardSourceType["BOSS_PLUS"] = 4] = "BOSS_PLUS";
    /**其他奖励，通用*/
    AwardSourceType[AwardSourceType["OTHER"] = 5] = "OTHER";
})(AwardSourceType || (AwardSourceType = {}));
//# sourceMappingURL=AwardType.js.map