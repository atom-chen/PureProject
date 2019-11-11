var MoneyType;
(function (MoneyType) {
    /**绑定金钱（银两）*/
    MoneyType[MoneyType["BIND_COIN"] = 0] = "BIND_COIN";
    /**非绑定金钱（银两）*/
    MoneyType[MoneyType["NON_BIND_COIN"] = 1] = "NON_BIND_COIN";
    /** 绑定元宝(礼卷)*/
    MoneyType[MoneyType["BIND_YUANBAO"] = 2] = "BIND_YUANBAO";
    /**元宝*/
    MoneyType[MoneyType["NON_BIND_YUANBAO"] = 3] = "NON_BIND_YUANBAO";
    MoneyType[MoneyType["STONE_POINT"] = 4] = "STONE_POINT";
    /**荣誉*/
    MoneyType[MoneyType["HONOUR"] = 5] = "HONOUR";
    /** 战勋*/
    MoneyType[MoneyType["WAREMBLEM"] = 6] = "WAREMBLEM";
    /**代金卷*/
    MoneyType[MoneyType["ROCK_CLOTHING"] = 7] = "ROCK_CLOTHING";
    /** 帮会贡献*/
    MoneyType[MoneyType["GUILD_CONTRIBUTION"] = 8] = "GUILD_CONTRIBUTION";
    /**红利*/
    MoneyType[MoneyType["BONUS"] = 9] = "BONUS";
    /**积分 */
    MoneyType[MoneyType["INTEGRAL"] = 10] = "INTEGRAL";
    /**寻宝积分**/
    MoneyType[MoneyType["DREAM_POINT"] = 11] = "DREAM_POINT";
})(MoneyType || (MoneyType = {}));
//# sourceMappingURL=MoneyType.js.map