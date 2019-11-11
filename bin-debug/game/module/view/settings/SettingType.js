var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 系统设置类型
 * @Author: guolinsen
 * @Date: 2019-08-12 16:07:09
 * @LastEditTime: 2019-10-31 10:01:49
 */
var SettingType = (function () {
    function SettingType() {
    }
    /**自动熔炼 */
    SettingType.AUTO_RECYCLE = 0;
    /**游戏基本设置 */
    SettingType.BASE_GAME_SETTING = 1;
    /**boss提醒*/
    SettingType.BOSS_REMIND = 2;
    /**VIPboss提醒 */
    SettingType.VIP_BOSS_REMIND = 3;
    return SettingType;
}());
__reflect(SettingType.prototype, "SettingType");
//# sourceMappingURL=SettingType.js.map