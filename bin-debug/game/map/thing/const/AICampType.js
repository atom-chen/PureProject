var AICampType;
(function (AICampType) {
    /**中立*/
    AICampType[AICampType["NORMAL"] = 0] = "NORMAL";
    /**本方*/
    AICampType[AICampType["SELF"] = 1] = "SELF";
    /**机器人*/
    AICampType[AICampType["ROOT"] = 2] = "ROOT";
    /**怪物*/
    AICampType[AICampType["MONSTER"] = 3] = "MONSTER";
    /**对阵方1*/
    AICampType[AICampType["BATTLE1"] = 4] = "BATTLE1";
    /**对阵方2*/
    AICampType[AICampType["BATTLE2"] = 5] = "BATTLE2";
})(AICampType || (AICampType = {}));
//Ai敌对
var AICampEnemy = (_a = {},
    _a[AICampType.MONSTER] = [AICampType.SELF],
    _a[AICampType.SELF] = [AICampType.MONSTER],
    _a[AICampType.ROOT] = [AICampType.MONSTER],
    _a[AICampType.BATTLE1] = [AICampType.BATTLE2],
    _a[AICampType.BATTLE2] = [AICampType.BATTLE1],
    _a);
var _a;
//# sourceMappingURL=AICampType.js.map