var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 一些通用的函数
*/
var GlobalFun = (function () {
    function GlobalFun() {
    }
    /**
     * 把MiniDateTime转化为距离1970-01-01的毫秒数
     * @param mdt
     * @return
     *
     */
    GlobalFun.formatMiniDateTime = function (mdt) {
        return GlobalVar.MiniDateTimeBase + (mdt & 0x7FFFFFFF) * 1000;
    };
    /**
    * 获取两个日期相差的毫秒数
    * 可以利用该方法判断mdt时间是否过期
    * @param mdt MiniDateTime(单位秒)
    * @param mdt2 MiniDateTime，如果值为0xFFFFFFFF，则使用服务器的当前时间(单位秒)
    * @return
    *
    */
    GlobalFun.getDiffMiniDateTime = function (mdt, mdt2) {
        if (mdt2 === void 0) { mdt2 = 0xFFFFFFFF; }
        if (mdt2 == 0xFFFFFFFF)
            return this.formatMiniDateTime(mdt) - GameCache.server.serverTime;
        else
            return (mdt - mdt2) * 1000;
    };
    /**获取物品id图片 */
    GlobalFun.getItemSourceById = function (id) {
        var str = null;
        if (id && GameConfig.item[id]) {
            str = RES_DIR_IMAGES_ITEM + GameConfig.item[id].icon + ".png";
        }
        return str;
    };
    /**获取背包是否满足使用物品条件 */
    GlobalFun.getBagEnounghUseCondition = function (listData, obj) {
        if (listData === void 0) { listData = null; }
        if (obj === void 0) { obj = null; }
        if (listData) {
            var list = [];
            for (var index in listData) {
                list.push(compure(listData[index]));
            }
            return list.indexOf(true) >= 0;
        }
        if (obj) {
            return compure(obj);
        }
        function compure(obj) {
            var res = false;
            if (typeof (obj.id) == "number" && typeof (obj.count) == "number") {
                return GameCache.bag.itemCount(obj.id) >= obj.count;
            }
            return false;
        }
        return false;
    };
    /**获取主职业对应的道具 */
    GlobalFun.filterJob = function (list) {
        var retList = [];
        for (var index in list) {
            var data = list[index];
            if (data.id) {
                var item = GameConfig.item[data.id];
                var job = GameCache.hero.mainPro.pro(PropId.AP_JOB);
                if (ItemUtils.getEquipJob(item) == job) {
                    retList.push(data);
                }
            }
        }
        return retList;
    };
    /**str 提示内容 */
    GlobalFun.SysMsg = function (str, type) {
        if (type === void 0) { type = 2; }
        App.ChatMgr.doMessage(str, type);
    };
    /**
     * 弹框提示
     * des: 文字说明
     * call:点击确定回调函数
     * callObj
     * state：2确定与取消 1只显示确定
    */
    GlobalFun.alert = function (des, call, callObj, state) {
        if (state === void 0) { state = 2; }
        var view = new ViewProp();
        view.exData1 = {};
        view.exData1["func"] = call;
        view.exData1["thisc"] = callObj;
        view.exData1["desc"] = des;
        view.exData1["state"] = state;
        App.ViewManager.open(ViewConst.SYSTIPS, view);
    };
    /**获取角色战力之和*/
    GlobalFun.getTotalPower = function () {
        var list = GameCache.hero.list;
        var n = 0;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var hero = list_1[_i];
            n += hero.pro.pro(PropId.AP_BATTLE_POWER);
        }
        return n;
    };
    /**数值对象相加或减
     * @param oldObj旧值对象 newobj 新值对象 c加减系数 1为加 -1为减 对象规格固定为 [{type:number,value:number}]
    */
    GlobalFun.ObjPlusOrMinus = function (oldObj, newObj, c) {
        if (c === void 0) { c = 1; }
        var obj = {};
        var result = [];
        if (oldObj) {
            for (var i in oldObj) {
                var item = oldObj[i];
                obj[item.type] = item.value;
            }
        }
        if (newObj) {
            for (var i in newObj) {
                var item = newObj[i];
                if (item.value == 0)
                    continue;
                if (obj[item.type]) {
                    obj[item.type] = Math.floor(c * newObj[i].value + obj[item.type]);
                }
                else {
                    obj[item.type] = newObj[i].value;
                }
            }
        }
        for (var i in obj) {
            var item = {
                type: parseInt(i),
                value: obj[i]
            };
            result.push(item);
        }
        return result;
    };
    /**数值对象相乘
     * @param oldObj旧值对象 c为倍数  对象规格固定为 [{type:number,value:number}]
    */
    GlobalFun.ObjPlusRide = function (oldObj, c) {
        if (c === void 0) { c = 1; }
        var obj = {};
        var result = [];
        if (oldObj) {
            for (var i in oldObj) {
                var item = oldObj[i];
                obj[item.type] = item.value;
            }
        }
        for (var i in obj) {
            var item = {
                type: parseInt(i),
                value: Math.floor(obj[i] * c)
            };
            result.push(item);
        }
        return result;
    };
    /**获取人物等级 */
    GlobalFun.getRoleLv = function () {
        var pro = GameCache.hero.mainPro;
        if (pro) {
            return pro.pro(PropId.AP_LEVEL);
        }
        return 0;
    };
    /**获取人物头像
     * job职业
     * sex性别 undefined使用默认性别女  0男 1女
     * type:0普通 1小的
    */
    GlobalFun.getRoleIcon = function (job, sex, type) {
        if (sex === void 0) { sex = undefined; }
        if (type === void 0) { type = 0; }
        if (sex == undefined)
            sex = 1;
        if (type == 0) {
            return RES_DIR_ROLE_ICON + "role_" + job + "_" + sex + ".png";
        }
        else if (type == 1) {
            return RES_DIR_ROLE_ICON + "role_s_" + job + "_" + sex + ".png";
        }
    };
    /* 位操作  */
    GlobalFun.BitHas = function (value, bit) {
        return (value & (1 << bit)) > 0;
    };
    /**寻找最小数值，返回数值与下标;若存在多个相同最小值，返回第一个最小值下标;
     * @param arr 数值数组
     */
    GlobalFun.Min = function (arr) {
        var idx = 0;
        var temp = arr[0];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] < temp) {
                temp = arr[i];
                idx = i;
            }
        }
        return [temp, idx];
    };
    /**寻找最大数值，返回数值与下标;若存在多个相同最大值，返回第一个最大值下标;
     * @param arr 数值数组
     */
    GlobalFun.Max = function (arr) {
        var idx = 0;
        var temp = arr[0];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] > temp) {
                temp = arr[i];
                idx = i;
            }
        }
        return [temp, idx];
    };
    /**vip 窗口跳转 */
    GlobalFun.gotoCharge = function () {
        // if (GameCache.firstcharge.firstChargeSt) {
        // 	App.ViewManager.open(ViewConst.CHARGE);
        // }
        // else {
        // 	App.ViewManager.open(ViewConst.FIRSTCHARGE);
        // }
        GameCache.vip.openRechargeWin();
    };
    /**数值缩写 */
    GlobalFun.numCut = function (num) {
        var nNum = num / Math.pow(10, 4);
        var str = Math.floor(num) + "";
        if (num / Math.pow(10, 4) > 1 && num / Math.pow(10, 8) < 1) {
            var result = (num / Math.pow(10, 4));
            str = result % 1 == 0 ? result + "" : result.toFixed(2);
            return StringUtils.substitute(Language.lang.numLevels[0], str);
        }
        if (num / Math.pow(10, 4) > 1 && num / Math.pow(10, 8) < 1) {
            var result = (num / Math.pow(10, 8));
            str = result % 1 == 0 ? result + "" : result.toFixed(2);
            return StringUtils.substitute(Language.lang.numLevels[1], str);
        }
        return str;
    };
    /**
     * 打开物品TIPS
     * @param item 类型可为stdItem userItem 或物品ID
     */
    GlobalFun.itemTips = function (item, exData2, handlerData) {
        var stdItem;
        var userItem;
        if (typeof (item) == "number") {
            stdItem = GameConfig.item[item];
        }
        else if (item instanceof UserItem) {
            stdItem = item.stdItem;
            userItem = item;
        }
        else {
            stdItem = item;
        }
        var view = new ViewProp();
        view.itemData = stdItem;
        userItem && (view.exData1 = userItem);
        exData2 && (view.exData2 = exData2);
        handlerData && (view.firData = handlerData);
        App.ViewManager.open(ViewConst.ITEMTIPS, view);
    };
    /**
     * 检查是否能提升VIP等级
     */
    GlobalFun.checkVipLvl = function (str) {
        var lvl = GameCache.vip.realValue() + 1;
        var conf = GameConfig.vip[lvl];
        var hint = "";
        if (conf) {
            hint = StringUtils.substitute(Language.lang.vipLvlHint, str);
        }
        else {
            hint = Language.lang.vipLvlMax;
        }
        GlobalFun.SysMsg(hint);
    };
    /**对象转换成数组 */
    GlobalFun.objChangeList = function (obj) {
        var list = [];
        for (var index in obj) {
            list.push(obj[index]);
        }
        return list;
    };
    /**单个item渐现效果 */
    GlobalFun.createItemEffect = function (item, i) {
        var leftTime = 100;
        item.alpha = 0;
        egret.Tween.get(item).wait(i * leftTime).to({ alpha: 1 }, 1).call(function play() {
            App.DisplayUtils.addEffectToObj(item, "pnint_0_1", 1, 40, 40);
        });
    };
    /**
     * 打开进入次数购买
     * @param type 购买类型
     */
    GlobalFun.openEnterBuy = function (type) {
        var func;
        var thisc;
        var arg = [];
        var max = [];
        var price = 0;
        switch (type) {
            case "wboss"://世界BOSS
                func = Proxy.boss.sendBossFubenOpt;
                thisc = Proxy.boss;
                arg = [3, 29];
                max = GameCache.boss.getWorldBossBuyMax();
                price = GameConfig.globalConfig.worldBossCons;
                break;
            case "jingji"://竞技
                func = Proxy.other.sendBuyChance;
                thisc = Proxy.other;
                max = GameCache.jingji.getJingjiBuyMax();
                price = GameConfig.jingji["1"].consume[0].count;
                break;
            case "exp"://经验副本
                func = Proxy.copy.sendCopyExpBuy;
                thisc = Proxy.copy;
                var fbid = GameCache.copy.getCopyExpId()[1];
                var conf = GameConfig.fuben[fbid];
                max = GameCache.copy.getCopyExpBuyData();
                var count = max[1];
                price = conf.buyTimesConsume[count] ? conf.buyTimesConsume[count] : conf.buyTimesConsume[conf.buyTimesConsume.length - 1];
                break;
            case "pgtboss":// 炼狱boss
                func = Proxy.boss.pgtBossBuy;
                thisc = Proxy.boss;
                max = GameCache.pgtBoss.getBuyMax();
                price = GameConfig.globalConfig.PurgatoryCons;
                break;
            case "fashionCopy":
                func = Proxy.copy.sendCopyEnterBuy;
                thisc = Proxy.copy;
                arg = [GameConfig.globalConfig.fashionCopyId];
                price = GameConfig.globalConfig.fashionCopyBuyPrice;
                max = GameCache.copy.getFashionCopyBuyData();
                break;
        }
        var view = new ViewProp();
        view.firData = {};
        view.firData["func"] = func;
        view.firData["thisc"] = thisc;
        view.firData["arg"] = arg;
        view.firData["max"] = max;
        view.firData["price"] = price;
        App.ViewManager.open(ViewConst.WBBUY, view);
    };
    /**
     * 生成随机数,自定义位数
     */
    GlobalFun.getRandom = function (val) {
        var total = 0;
        for (var i = 1; i <= val; i++) {
            total += Math.pow(10, i) * Math.random();
        }
        return total / Math.pow(10, val);
    };
    /**
     * 打开物品提示
     * @param  {} itemId
     * @returns void
     */
    GlobalFun.openItemTips = function (itemId) {
        var item = GameConfig.item[itemId];
        var v = new ViewProp();
        v.itemData = item;
        App.ViewManager.open(ViewConst.ITEMTIPS, v);
    };
    /**
     * 存储系统设置 index 从零开始
    */
    GlobalFun.setRemindSet = function (index, sel, type) {
        var vale = sel ? 0 : 1;
        var v = GameCache.settings.getValue(type);
        v = v & (0xffffffff - (1 << index));
        if (vale == 1) {
            v += (1 << index);
        }
        GameCache.settings.update(type, v, true);
    };
    /**
     * 获取系统设置
     */
    GlobalFun.getRemindSet = function (index, type) {
        var v = GameCache.settings.getValue(type);
        return ((v >> index) & 1) != 1;
    };
    return GlobalFun;
}());
__reflect(GlobalFun.prototype, "GlobalFun");
//# sourceMappingURL=GlobalFun.js.map