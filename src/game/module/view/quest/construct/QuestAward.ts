class QuestAward {
    public type: number;//0-127, 127为自定义奖励，id必须为null，count必须为null,自定义奖励的给予是通过脚本完成的；
    public id: number;//
    public count: number;////物品数量
    public datastr: String;//奖励描述字符串
    public group: number;//是否可选，0表示不可选（必送）， 大于0表示奖励的组，同组的奖励只能选一个,最多只能8组
    public strong: number;//强化值，只对装备有效
    public quality: number;//品质，只对装备有效
    public bind: Boolean;//
    public sex: number = -1;//-1是无限制，0和1是限制性别
    public job: number;//0是无限制，非0是限制职业
    public level: number; //等级物品（boss成长等级会增加的奖励物品特殊标识出来）
    public bossLevel: number; //boss等级（boss成长等级和物品等级相同即为新物品）
    public initAttrs: any[] = [];    //极品属性,和精锻属性一致
    public vipLevel: number;	//vip等级

    public importantLevel: number = 0;      //重要程度,用于某些地方的特殊显示

    public propability: number;      // 获得此物品的几率
    public hide: number = 0; 				//是否要隐藏改奖励,不显示出来


    public questLoop: number; //此任务当前是第几环  默认是 1
    public levelRate: Number = 0; //等级系数
    public ringRate: Number = 0;  //环数系数

    public petExpRate: number; //宠物经验

    public raidsCount: number;  //扫荡的第几次奖励次数


    /**
     * 奖励的数量范围 
    */
    public maxcount: number;
    public mincount: number;

    public expire: number;

    /**
     * 复制一个新的奖励对象 
     * @return 
     * 
     */
    public clone(): QuestAward {
        let newQA: QuestAward = new QuestAward();
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
    }


    /**
     * 通过obj类型构建自己
     * @param obj
     */
    public structureByObject(obj): void {
        for (let i in obj) {
            if (obj[i]) {
                this[i] = obj[i];
            }
        }
    }

    /**
     * 获取对应类型的奖励数量 
     * @param type
     * @return 
     * 
     */
    public getAwardByType(type: number): number {
        switch (type) {
            case QuestAwType.QA_EXP:
            case QuestAwType.QA_MONEY:
            case QuestAwType.QA_GIFT:
            case QuestAwType.QA_HONOR:
                return this.count;
        }
        return 0;
    }


    /**
     *获取指定数量 
     * @param rolelevel
     * @return 
     * 
     */
    public getSpCount(rolelevel: number): number {
        let retCount: number = 0;
        switch (this.type) {
            case QuestAwType.QA_Add_Exp:
            case QuestAwType.QA_EXP:
            if(rolelevel > 0){
                
            }else{
                retCount = this.count;
            }
            default:
                retCount = this.count;
                break;
        }
        return retCount;
    }
}