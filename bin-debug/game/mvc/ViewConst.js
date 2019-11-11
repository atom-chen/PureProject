/*
 * @Description:
 * @Author: liangzhaowei
 * @Date: 2019-08-28 10:42:31
 */
var ViewConst;
(function (ViewConst) {
    /**创角*/
    ViewConst[ViewConst["CREATE_ROLE"] = 1] = "CREATE_ROLE";
    /**创角-英雄*/
    ViewConst[ViewConst["CREATE_HERO"] = 2] = "CREATE_HERO";
    /**角色界面 */
    ViewConst[ViewConst["ROLE"] = 3] = "ROLE";
    /**背包 */
    ViewConst[ViewConst["BAG"] = 4] = "BAG";
    /**宠物 */
    ViewConst[ViewConst["PET"] = 5] = "PET";
    /**副本 */
    ViewConst[ViewConst["COPY"] = 6] = "COPY";
    /**商店 */
    ViewConst[ViewConst["SHOP"] = 7] = "SHOP";
    /**vip */
    ViewConst[ViewConst["VIP"] = 8] = "VIP";
    /**日常 */
    ViewConst[ViewConst["DAILY"] = 9] = "DAILY";
    /**转职 */
    ViewConst[ViewConst["TRANSFER"] = 10] = "TRANSFER";
    /**转职预览 */
    ViewConst[ViewConst["TRANSFERSHOW"] = 11] = "TRANSFERSHOW";
    /**转职道具使用 */
    ViewConst[ViewConst["TRANSFERUSE"] = 12] = "TRANSFERUSE";
    /**冒险 */
    ViewConst[ViewConst["ADVENTURE"] = 13] = "ADVENTURE";
    /**首冲 */
    ViewConst[ViewConst["FIRSTCHARGE"] = 14] = "FIRSTCHARGE";
    /**额外奖励提示框 */
    ViewConst[ViewConst["REWARDEX"] = 15] = "REWARDEX";
    /**充值 */
    ViewConst[ViewConst["CHARGE"] = 16] = "CHARGE";
    /**其它角色窗口 */
    ViewConst[ViewConst["OTHERROLE"] = 17] = "OTHERROLE";
    /**技能 */
    ViewConst[ViewConst["SKILL"] = 18] = "SKILL";
    /**扭蛋 */
    ViewConst[ViewConst["GASHAPON"] = 19] = "GASHAPON";
    /**扭蛋奖励界面 */
    ViewConst[ViewConst["GASHAPONRW"] = 20] = "GASHAPONRW";
    /**扭蛋仓库 */
    ViewConst[ViewConst["GASHAPONBAG"] = 21] = "GASHAPONBAG";
    /**调试界面1 */
    ViewConst[ViewConst["EDITWIN"] = 22] = "EDITWIN";
    /**闯关 */
    ViewConst[ViewConst["CHUANGGUAN"] = 23] = "CHUANGGUAN";
    /**强化 */
    ViewConst[ViewConst["STRENGTH"] = 24] = "STRENGTH";
    /**BOSS */
    ViewConst[ViewConst["BOSS"] = 25] = "BOSS";
    /**竞技场 */
    ViewConst[ViewConst["JINGJI"] = 26] = "JINGJI";
    /**签到*/
    ViewConst[ViewConst["SIGN"] = 27] = "SIGN";
    /**邮件*/
    ViewConst[ViewConst["EMAIL"] = 28] = "EMAIL";
    /**开服活动 */
    ViewConst[ViewConst["KFHD"] = 29] = "KFHD";
    /** 家族 */
    ViewConst[ViewConst["FAMILY"] = 30] = "FAMILY";
    //以上窗口只能同时存在一个
    ViewConst[ViewConst["CLOSEALLWIN"] = 10000] = "CLOSEALLWIN";
    //以上是普通窗口，打开会覆盖全屏，关掉场景和MainUI
    /**游戏世界*/
    ViewConst[ViewConst["GAME_WORLD"] = 20000] = "GAME_WORLD";
    /**主界面*/
    ViewConst[ViewConst["MAIN_UI"] = 20001] = "MAIN_UI";
    /**任务面板*/
    ViewConst[ViewConst["MAIN_QUEST"] = 20002] = "MAIN_QUEST";
    /**覆盖层的主界面*/
    ViewConst[ViewConst["MAIN_UI_COCER"] = 20003] = "MAIN_UI_COCER";
    /**战力变化*/
    ViewConst[ViewConst["FIGHT_CHANGE"] = 20004] = "FIGHT_CHANGE";
    /**欢迎界面*/
    ViewConst[ViewConst["WELCOME"] = 20005] = "WELCOME";
    /**DEBUG窗口 */
    ViewConst[ViewConst["DEBUG"] = 20006] = "DEBUG";
    /**DEBUG龙骨窗口 */
    ViewConst[ViewConst["DEBUGDRAGON"] = 20007] = "DEBUGDRAGON";
    /**BUFF*/
    ViewConst[ViewConst["BUFF"] = 20008] = "BUFF";
    /**NPC对话*/
    ViewConst[ViewConst["NPCTALK"] = 20009] = "NPCTALK";
    /**人物属性*/
    ViewConst[ViewConst["ROLEPROTIPS"] = 20010] = "ROLEPROTIPS";
    /**物品提示 */
    ViewConst[ViewConst["ITEMTIPS"] = 20011] = "ITEMTIPS";
    /**技能提示 */
    ViewConst[ViewConst["SKILLTIPS"] = 20012] = "SKILLTIPS";
    /**Vip特权提示 */
    ViewConst[ViewConst["VIPTIPS"] = 20013] = "VIPTIPS";
    /**新物品提示 */
    ViewConst[ViewConst["NEWITEM"] = 20014] = "NEWITEM";
    /**装备回收、熔炼 */
    ViewConst[ViewConst["MELT"] = 20015] = "MELT";
    /**套装详情 */
    ViewConst[ViewConst["SUITPROPERTY"] = 20016] = "SUITPROPERTY";
    /**套装分解 */
    ViewConst[ViewConst["SUITRESOLVE"] = 20017] = "SUITRESOLVE";
    /**宠物图鉴 */
    ViewConst[ViewConst["PETSHOWALL"] = 20018] = "PETSHOWALL";
    /**单个宠物全属性展示 */
    ViewConst[ViewConst["PETSIGLEINFOVIEW"] = 20019] = "PETSIGLEINFOVIEW";
    /**宠物全属性 */
    ViewConst[ViewConst["PETTIPS"] = 20020] = "PETTIPS";
    /**迷雾之塔奖励显示 */
    ViewConst[ViewConst["COPYTOWERRW"] = 20021] = "COPYTOWERRW";
    /**排行榜样式A */
    ViewConst[ViewConst["RANKMODELWINA"] = 20022] = "RANKMODELWINA";
    /**幸运抽奖 */
    ViewConst[ViewConst["LUCKYDAIL"] = 20023] = "LUCKYDAIL";
    /**日常奖展示励框 */
    ViewConst[ViewConst["DAILYSHOWTIP"] = 20024] = "DAILYSHOWTIP";
    /**奖励获得 */
    ViewConst[ViewConst["AWARDTIPS"] = 20025] = "AWARDTIPS";
    /**过场动画*/
    ViewConst[ViewConst["MAPLOADING"] = 20026] = "MAPLOADING";
    /**玩法说明 */
    ViewConst[ViewConst["INSTRUCTION"] = 20027] = "INSTRUCTION";
    /**强化大师 */
    ViewConst[ViewConst["STRENGTHMASTER"] = 20028] = "STRENGTHMASTER";
    /**购买物品 */
    ViewConst[ViewConst["SHOPTIPS"] = 20029] = "SHOPTIPS";
    /**通用提示 */
    ViewConst[ViewConst["SYSTIPS"] = 20030] = "SYSTIPS";
    /**邮件详情*/
    ViewConst[ViewConst["EMAIL_DETAIL"] = 20031] = "EMAIL_DETAIL";
    /**复活提示 */
    ViewConst[ViewConst["REVIVE"] = 20032] = "REVIVE";
    /**世界BOSS复活提示 */
    ViewConst[ViewConst["WBREVIVE"] = 20033] = "WBREVIVE";
    /**世界boss次数购买 */
    ViewConst[ViewConst["WBBUY"] = 20034] = "WBBUY";
    /**背包拓展提示 */
    ViewConst[ViewConst["BAGEXPAND"] = 20035] = "BAGEXPAND";
    /**时装搭配 */
    ViewConst[ViewConst["COORDINATE"] = 20036] = "COORDINATE";
    /**时装购买 */
    ViewConst[ViewConst["FASHIONBUY"] = 20037] = "FASHIONBUY";
    /**翅膀技能 */
    ViewConst[ViewConst["WINGSKILL"] = 20038] = "WINGSKILL";
    /**失败面板 */
    ViewConst[ViewConst["FAIL"] = 20039] = "FAIL";
    /** 总属性提示 */
    ViewConst[ViewConst["TOTALPROP"] = 20040] = "TOTALPROP";
    /**共鸣 */
    ViewConst[ViewConst["RESONANCE"] = 20041] = "RESONANCE";
    /**离线奖励 */
    ViewConst[ViewConst["OFFLINEAW"] = 20042] = "OFFLINEAW";
    /**鼓舞BUFF购买 */
    ViewConst[ViewConst["BUYBUFF"] = 20043] = "BUYBUFF";
    /**竞技场排行榜 */
    ViewConst[ViewConst["JINGJIRANK"] = 20044] = "JINGJIRANK";
    /**通用LIST面板 */
    ViewConst[ViewConst["ITEMLISTTIPS"] = 20045] = "ITEMLISTTIPS";
    /**替换宝石提示 */
    ViewConst[ViewConst["JEWELREPLACE"] = 20046] = "JEWELREPLACE";
    /**世界BOSS信息 */
    ViewConst[ViewConst["WBINFO"] = 20047] = "WBINFO";
    /**排行榜 */
    ViewConst[ViewConst["RANK"] = 20048] = "RANK";
    /**材料副本信息 */
    ViewConst[ViewConst["COPYMATERIALSINFO"] = 20049] = "COPYMATERIALSINFO";
    /**竞技场信息 */
    ViewConst[ViewConst["JINGJIINFO"] = 20050] = "JINGJIINFO";
    /**经验副本信息 */
    ViewConst[ViewConst["COPYEXPINFO"] = 20051] = "COPYEXPINFO";
    /**符碑技能窗口 */
    ViewConst[ViewConst["RUNESKILL"] = 20052] = "RUNESKILL";
    /**系统开启提示 */
    ViewConst[ViewConst["SYSOPENHINT"] = 20053] = "SYSOPENHINT";
    /**聊天窗口 */
    ViewConst[ViewConst["CHAT"] = 20054] = "CHAT";
    /**表情窗口 */
    ViewConst[ViewConst["EMOJI"] = 20055] = "EMOJI";
    /** 炼狱共鸣属性 */
    ViewConst[ViewConst["PURGATORY_RESONATE_PROP"] = 20056] = "PURGATORY_RESONATE_PROP";
    /**通用排行榜 */
    ViewConst[ViewConst["RANKB"] = 20057] = "RANKB";
    /**限时礼包 */
    ViewConst[ViewConst["XSLB"] = 20058] = "XSLB";
    /**炼狱背包 */
    ViewConst[ViewConst["PURGATORY_BAG"] = 20059] = "PURGATORY_BAG";
    /**活动目录 */
    ViewConst[ViewConst["ACTIVITY_CATALOGUE"] = 20060] = "ACTIVITY_CATALOGUE";
    /**时装副本信息 */
    ViewConst[ViewConst["FASHIONCOPYINFO"] = 20061] = "FASHIONCOPYINFO";
    /** 炼狱装备升级 */
    ViewConst[ViewConst["PURGATORY_UPGRADE"] = 20062] = "PURGATORY_UPGRADE";
    /** 家族设置 */
    ViewConst[ViewConst["FAMILY_SETTING"] = 20063] = "FAMILY_SETTING";
    /** 家族创建 */
    ViewConst[ViewConst["FAMILY_CREATE"] = 20064] = "FAMILY_CREATE";
    /** 家族列表 */
    ViewConst[ViewConst["FAMILY_LIST"] = 20065] = "FAMILY_LIST";
    /** 家族解散 */
    ViewConst[ViewConst["FAMILY_DISMISS"] = 20066] = "FAMILY_DISMISS";
    /** 家族申请列表 */
    ViewConst[ViewConst["FAMILY_APPLY"] = 20067] = "FAMILY_APPLY";
    /** 家族公告 */
    ViewConst[ViewConst["FAMILY_NOTICE"] = 20068] = "FAMILY_NOTICE";
})(ViewConst || (ViewConst = {}));
//# sourceMappingURL=ViewConst.js.map