/*
 * @Description: 奖励类型，跟通用奖励配置的type对应
 * @Author: guolinsen
 * @Date: 2019-08-21 20:51:01
 * @LastEditTime: 2019-10-23 16:45:37
 */

enum AwardType {
    ITEM = 0, //道具
    CREATE_HERO = 41 //激活副角色
}

enum AwardSourceType {
    /**竞技 */
    JINGJI = 0,
    /**副本 */
    COPY,
    /**扫荡 */
    SWEEP,
    /**BOSS参与*/
    BOSS,
    /**BOSS归属*/
    BOSS_PLUS,
    /**其他奖励，通用*/
    OTHER,
}