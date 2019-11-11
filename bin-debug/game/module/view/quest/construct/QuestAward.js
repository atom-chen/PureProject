var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var QuestAward = (function () {
    function QuestAward() {
        this.sex = -1; //-1是无限制，0和1是限制性别
        this.initAttrs = []; //极品属性,和精锻属性一致
        this.importantLevel = 0; //重要程度,用于某些地方的特殊显示
        this.hide = 0; //是否要隐藏改奖励,不显示出来
        this.levelRate = 0; //等级系数
        this.ringRate = 0; //环数系数
    }
    /**
     * 复制一个新的奖励对象
     * @return
     *
     */
    QuestAward.prototype.clone = function () {
        var newQA = new QuestAward();
        newQA.type = this.type;
        newQA.id = this.id;
        newQA.count = this.count;
        newQA.datastr = this.datastr;
        newQA.group = this.group;
        newQA.strong = this.strong;
        newQA.quality = this.quality;
        newQA.bind = this.bind;
        newQA.sex = this.sex;
        newQA.job = this.job;
        newQA.importantLevel = this.importantLevel;
        newQA.hide = this.hide;
        return newQA;
    };
    /**
     * 通过obj类型构建自己
     * @param obj
     */
    QuestAward.prototype.structureByObject = function (obj) {
        for (var i in obj) {
            if (obj[i]) {
                this[i] = obj[i];
            }
        }
    };
    /**
     * 获取对应类型的奖励数量
     * @param type
     * @return
     *
     */
    QuestAward.prototype.getAwardByType = function (type) {
        switch (type) {
            case QuestAwType.QA_EXP:
            case QuestAwType.QA_MONEY:
            case QuestAwType.QA_GIFT:
            case QuestAwType.QA_HONOR:
                return this.count;
        }
        return 0;
    };
    /**
     *获取指定数量
     * @param rolelevel
     * @return
     *
     */
    QuestAward.prototype.getSpCount = function (rolelevel) {
        var retCount = 0;
        switch (this.type) {
            case QuestAwType.QA_Add_Exp:
            case QuestAwType.QA_EXP:
                if (rolelevel > 0) {
                }
                else {
                    retCount = this.count;
                }
            default:
                retCount = this.count;
                break;
        }
        return retCount;
    };
    return QuestAward;
}());
__reflect(QuestAward.prototype, "QuestAward");
//# sourceMappingURL=QuestAward.js.map