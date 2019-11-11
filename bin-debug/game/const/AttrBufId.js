var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description:属性bufid，主要是配置用到，注意区别于PropId
 * @Author: guolinsen
 * @Date: 2019-08-05 14:51:59
 * @LastEditTime: 2019-09-12 15:09:05
 */
var AttrBufId = (function () {
    function AttrBufId() {
    }
    // public static Undefined: number = 0;				    //未定义属性
    // public static HpAdd: number = 1;				        //血增加
    // public static HpPower: number = 2;			        //力量倍率增加
    // public static MpAdd: number = 3;				        //蓝增加
    // public static MpPower: number = 4;				    //蓝倍率增加
    // public static MaxHpAdd: number = 5;				        //最大血增加
    // public static MaxHpPower: number = 6;			    //最大血倍率增加
    // public static MaxMpAdd: number = 7;			            //最大蓝增加
    // public static MaxMpPower: number = 8;			    //最大蓝倍率增加
    // public static PhysicalAttackMinAdd: number = 9;		    //最小物理攻击增加
    // public static PhysicalAttackMinPower: number = 10;	//最小物理攻击倍率增加
    // public static PhysicalAttackMaxAdd: number = 11;	    //最大物理攻击增加
    // public static PhysicalAttackMaxPower: number = 12;	//最大物理攻击倍率增加
    // public static MagicAttackMinAdd: number = 13;			//最小魔法攻击增加
    // public static MagicAttackMinPower: number = 14;		//最小魔法攻击倍率增加
    // public static MagicAttackMaxAdd: number = 15;			//最大魔法攻击增加
    // public static MagicAttackMaxPower: number = 16;		//最大魔法攻击倍率增加
    // public static WizardAttackMinAdd: number = 17;			//最小道术攻击增加
    // public static WizardAttackMinPower: number = 18;		//最小道术攻击倍率增加
    // public static WizardAttackMaxAdd: number = 19;			//最大道术攻击增加
    // public static WizardAttackMaxPower: number = 20;		//最大道术攻击倍率增加
    // public static PhysicalDefenceMinAdd: number = 21;		//最小物理防御增加
    // public static PhysicalDefenceMinPower: number = 22;	//最小物理防御倍率增加
    // public static PhysicalDefenceMaxAdd: number = 23;		//最大物理防御增加
    // public static PhysicalDefenceMaxPower: number = 24;	//最大物理防御倍率增加
    // public static MagicDefenceMinAdd: number = 25;			//最小魔法防御增加
    // public static MagicDefenceMinPower: number = 26;		//最小魔法防御倍率增加
    // public static MagicDefenceMaxAdd: number = 27;			//最大魔法防御增加
    // public static MagicDefenceMaxPower: number = 28;		//最大魔法防御倍率增加
    // public static HitrateAdd: number = 29;			        //准确增加
    // public static HitratePower: number = 30;			    //准确倍率增加
    // public static DogerateAdd: number = 31;			    	//敏捷增加
    // public static DogeratePower: number = 32;		    //敏捷倍率增加
    // public static MagicHitRateAdd: number = 33;			//魔法命中增加
    // public static MagicHitRatePower: number = 34;		//魔法命中倍率增加
    // public static MagicDogerateAdd: number = 35;    	    //魔法闪避增加
    // public static MagicDogeratePower: number = 36;       //魔法闪避倍率增加
    // public static ToxicDogerateAdd: number = 37;			//毒物闪避增加
    // public static ToxicDogeratePower: number = 38;		//毒物闪避倍率增加
    // public static HpRenewAdd: number = 39;				//生命恢复增加
    // public static HpRenewPower: number = 40;			    //生命恢复倍率增加
    // public static MpRenewAdd: number = 41;				//魔法恢复增加
    // public static MpRenewPower: number = 42;				//魔法恢复倍率增加
    // public static ToxicRenewAdd: number = 43;			//毒物恢复增加
    // public static ToxicRenewPower: number = 44;			    //毒物恢复倍率增加
    // public static LuckAdd: number = 45;			            //幸运 增加
    // public static LuckPower: number = 46;			    //幸运倍率增加
    // public static CurseAdd: number = 47;			        //诅咒增加   
    // public static CursePower: number = 48;			    //诅咒倍率增加
    // public static MoveSpeedAdd: number = 49;			    //移动速度增加
    // public static MoveSpeedPower: number = 50;			//移动速度倍率增加
    // public static AttackSpeedAdd: number = 51;			    //攻击速度增加
    // public static AttackSpeedPower: number = 52;			//攻击速度倍率增加
    // public static DamageAbsorb: number = 53;			    //伤害吸收,自己或队友施放护盾，吸收N点伤害
    // public static DamageAbsorbRate: number = 54;			//按比例吸收伤害,降低一定百分比的所受伤害
    // public static Damage2Mp: number = 55;			        //伤害转换为蓝的消耗,吸收N点伤害，每吸收一点伤害需要损耗m点内力值，内力不足时护盾消失
    // public static Dizzy: number = 56;			     		//麻痹,不可移动，不可释放技能
    // public static ControlSkillImmune: number = 57;			//免疫各种控制技能
    // public static ExpAdd: number = 58;			     		//经验增加一个数值
    // public static Taunt: number = 59;            			//嘲讽
    // public static SuperMan: number = 60; 					//无敌,能攻击，不能被攻击
    // public static ReliveProtectState: number = 61;			//复活保护状态
    // public static UseSkill: number = 62;			        //使用一个buff的效果是定时使用技能
    // public static Hide: number = 63;			            //隐身
    // public static ExpPower: number = 64;			        //杀怪经验为
    // public static PkValueAdd: number = 65;			        //杀戮值(pk值)的增减
    // public static KillMonsterDamagePower: number = 66;	//杀怪伤害的提升，在最后的伤害输出的时候计算，外功攻击或者内功攻击的伤害输出(dot无效)
    // public static PkProtectState: number = 67;			    //pk保护状态
    // public static SelfAttackAppend: number = 68;			//技能攻击的时候 攻击伤害追加n点（以固定值的方式影响角色造成的内功与外功攻击伤害）
    // public static DrunkExpAdd: number = 69;			        //篝火喝酒的时候经验的加成,+%n
    // public static SacredValueAdd: number = 70;			    //神圣增加
    // public static BagMaxWeightAdd: number = 71;			    //背包负重增加
    // public static BagMaxWeightPower: number = 72;		//背包负重倍率增加
    // public static EquipMaxWeightAdd: number = 73;			//装备负重增加
    // public static EquipMaxWeightPower: number = 74;		//增加背包倍率增加
    // public static ArmPowerAdd: number = 75;			        //腕力增加
    // public static ArmPowerPower: number = 76;			//腕力倍率增加
    // public static EquipMaxDurAdd: number = 77;			    //增加装备的最大耐久
    // public static HpDamage2MpDropRateAdd: number = 78;      //比例将伤害值转换成消耗魔法值
    // public static DizzyRateAdd: number = 79;                //增加物理攻击的时候让对方麻痹的概率
    // public static DamagePower: number = 80;              //伤害输出倍率增加
    // public static AddPhysicalDamageRate: number = 81;    	//物理攻击时候附加物理攻击输出的概率,整数配置，1点表示万分之1(战士用)
    // public static AddPhysicalDamageValue: number = 82;   	//物理攻击时附加攻击输出的数值增加(战士用)
    // public static Damage2SelfHpPro: number = 83;        	//对敌人伤血的时候，有概率给自己加血,整形的，1点表示万分之1
    // public static Damage2SelfHpRate: number = 84;    	//对敌人伤血的时候，伤血的比例转给自己，浮点型,表示百分比
    // public static SkillExpRate: number = 85;         	   	//技能熟练度倍率增加
    // public static AlarmAdd: number = 86;					//被追踪报警
    // public static AtAutoFightMap: number = 87;				//挂机地图中
    // public static XPAdd: number = 88;						//怒气
    // public static BodyChange: number = 89;					//变身
    // public static DieRecover: number = 90;					//死亡回复 砍死后马上恢复
    // public static AddBollOnHead: number = 91;				//杀死战队竞技BOSS的玩家头顶会显示1个球图
    // public static AddRideQuest: number = 92;				//骑乘任务的buff		value值就是坐骑id
    // public static FreshmanProtected: number = 93;			//新手保护
    // public static Hp2DamageAdd: number = 94;				//底力增加
    // public static GetActivityExp: number = 95;				//按经验库中给经验
    // public static MountMinAttackRateAdd: number = 96;				//坐骑最小攻击增加
    // public static MountMaxAttackRateAdd: number = 97;				//坐骑最大攻击增加
    // public static MountMinPhyDefenceRateAdd: number = 98;				//坐骑最小物理防御增加
    // public static MountMaxPhyDefenceRateAdd: number = 99;				//坐骑最大物理防御增加
    // public static MountMinMagicDefenceRateAdd: number = 100;				//坐骑最小魔法防御增加
    // public static MountMaxMagicDefenceRateAdd: number = 101;				//坐骑最大魔法防御增加
    // public static MountHpRateAdd: number = 102;				//坐骑增加的生命的增加
    // public static MountMpRateAdd: number = 103;				//坐骑增加的魔法的增加
    // public static DiamondMinAttackRateAdd: number = 104;				//宝石最小攻击增加
    // public static DiamondMaxAttackRateAdd: number = 105;				//宝石最大攻击增加
    // public static DiamondMinPhyDefenceRateAdd: number = 106;				//宝石最小物理防御增加
    // public static DiamondMaxPhyDefenceRateAdd: number = 107;				//宝石最大物理防御增加
    // public static DiamondMinMagicDefenceAdd: number = 108;				//宝石最小魔法防御增加
    // public static DiamondMaxMagiceDefence: number = 109;				//宝石最大魔法防御增加
    // public static DiamondHpRateAdd: number = 110;				//宝石增加的生命的增加
    // public static DiamondMpRateAdd: number = 111;				//宝石增加的魔法的增加
    // public static UseJadeAddExp: number = 112;        //经验玉额外经验加成 百分比 如：10 表示10%100
    // public static HeroKillMonsterAddExp: number = 113;   //英雄杀怪经验加成 百分比 如：10 表示10%100 
    // public static FireDefenceRate: number = 114;   //抗火率   1点表示万份之一 
    // public static ReduceEquipDropRate: number = 115;   //装备爆率   配正的,但显示要显示 -xx%  1点表示万份之一 
    // public static DamageDropTime: number = 116;   //收到伤害以后，状态时间减少，当buff删除的时候使用技能
    // public static FibidMove: number = 117;   //禁止移动
    // public static WarriorDamageValueDec: number = 118;   //固定值降低战士的伤害
    // public static WarriorDamageRateDec: number = 119;   //百分比降低战士的伤害            1点表示万份之一 
    // public static MagicianDamageValueDesc: number = 120;   //固定值降低法师的伤害
    // public static MagicianDamageRateDesc: number = 121;   //固定比降低法师的伤害       1点表示万份之一 
    // public static WizardDamageValueDesc: number = 122;   //固定值降低道士的伤害
    // public static WizardDamageRateDesc: number = 123;   //固定比降低法师的伤害             1点表示万份之一 
    // public static MonsterDamageValueDesc: number = 124;   //固定值降低怪物的伤害
    // public static MonsterDamageRateDesc: number = 125;   //固定比降低怪物的伤害         1点表示万份之一 
    // public static DamageReduceRate: number = 126;   //触发伤害减免的几率         1点表示万份之一 
    // public static DamageReduceValue: number = 127;   //触发伤害减免的值
    // public static DamageAddRate: number = 128;   //触发伤害追加的几率         1点表示万份之一 
    // public static DamageAddValue: number = 129;   //触发伤害追加的值
    // public static IgnorDefenceRate: number = 130;   //触发无视防御几率         1点表示万份之一 
    // public static IgnorDefenceValue: number = 131;   //无视防御的值
    // public static InChgPet: number = 132;   //变身状态
    // public static AreaAddExp: number = 133;   //指定区域添加经验
    // public static CurseMarkSkillRate: number = 134;   //符咒印记技能触发几率   1点表示万份之一 
    // public static CurseMarkSkillLevel: number = 135;   //符咒印记技能等级
    // public static CritRate: number = 136;   //暴击几率      1点表示万份之一 
    // public static CritValue: number = 137;   //暴击伤害   1点表示万份之一 
    // public static CritRateDesc: number = 138;   //韧性,减少受到暴击的几率        1点表示万份之一 
    // public static CureDesc: number = 139;   //致死,固定比降低治疗效果         1点表示万份之一 
    // public static SunlightExpRate: number = 140;   //沐光经验收益倍率   浮点
    // public static DamageDecRate: number = 141;    //百分比降低伤害几率   1点表示万份之一 
    // public static DamageDecRateValue: number = 142;    //百分比降低伤害值   1点表示万份之一 
    // public static KillDoubleAward: number = 143;    //击杀获得双倍积分
    // public static LianGongExp: number = 144;    //练功经验增加   1点表示万份之一 
    // public static FogMask: number = 145;    //迷雾buffer
    // public static AllRuneStone: number = 146;// 所有符石的属性、、万分比
    // public static CanNotUseJobSkill: number = 147;		//禁止使用职业技能
    // public static DamageToOther: number = 148;///反弹伤害
    // public static ReboundDamage: number = 149;///反弹伤害
    // public static SealAutoSkill: number = 150;//玉玺被动技能
    // public static SealSkillProbily: number = 151;//玉玺被动触发几率
    // public static SealKillLevel: number = 152;//玉玺被动等级
    // public static ArtifactStoreItemSkillIdFirst: number = 153;			//神石1被动技能ID
    // public static ArtifactStoreItemSkillRateFirst: number = 154;		//神石1技能触发几率 1点表示1万分之1
    // public static ArtifactStoreItemSkillLevelFirst: number = 155;		//神石1技能等级
    // public static ArtifactStoreItemSkillIdSecond: number = 156;		//神石2被动技能ID
    // public static ArtifactStoreItemSkillRateSecond: number = 157;		//神石2技能触发几率 1点表示1万分之1
    // public static ArtifactStoreItemSkillLevelSecond: number = 158;	//神石2技能等级
    // public static NotDieMedal: number = 159;	//免死金牌buffer
    // //下面是因为客户端要用到属性的语言包,所以加了两个额外的
    // public static BinoYb: number = 160;// 159;						//绑定元宝
    // public static Honour: number = 161;//160;						//荣誉
    // public static Dabuji: number = 165;                   //大补鸡呵呵
    // public static Vip: number = 166;						//VIP体验
    // public static MagicActDamageValueDec: number = 167;		//固定值降低法术的伤害
    // public static MagicActDamageRateDec: number = 168;	 		//百分比降低法术的伤害
    // public static DamageToBossValueAdd: number = 169;			  //固定值增加对BOSS伤害
    // public static DamageToBossRateAdd: number = 170;				  //增加对boss伤害百分比
    // public static DamageToHeroValueAdd: number = 171;			  //固定值增加对英雄伤害
    // public static DamageToHeroRateAdd: number = 172;				  //增加对英雄伤害百分比
    // public static BossDamageReduceRate: number = 173;			  //Boss伤害减免百分比
    // public static HeroDamageReduceRate: number = 174;			  //英雄伤害减免百分比
    // public static HeroHpRecovery: number = 175;					  //英雄血恢复
    // public static HeroMpRecovery: number = 176;					  //英雄蓝恢复
    // public static HeroCrit: number = 177;					  //英雄暴击
    // public static HeroCritDamage: number = 178;					  //英雄爆伤
    // public static HeroDuctility: number = 179;					  //英雄韧性
    // public static DizzyRateDec: number = 180;					  //减少对方麻痹自己
    // public static AttackAdd: number = 181;                          //全部攻击属性
    // public static AttackPower: number = 182;							//全部攻击属性倍率
    // public static DefenceAdd: number = 183;						//全部防御属性
    // public static DefencePower: number = 184;						//全部防御属性倍率
    // public static BodyAegis: number = 186;                        //护体神盾buff
    // public static MonthCard: number = 187;                        //黄金月卡
    // public static ExpAddLogin: number = 188;                      //登录器经验加成
    // public static ExpAddHall: number = 189;                       //大厅经验加成
    // public static WarriorDamageAddValueDec: number = 190;                //固定值增加对战士的伤害
    // public static WarriorDamageAddRateDec: number = 191;                 //百分比增加对战士的伤害
    // public static MagicianDamageAddValueDesc: number = 192;             //固定值增加对法师的伤害
    // public static MagicianDamageAddRateDesc: number = 193;			   //固定比增加对法师的伤害
    // public static WizardDamageAddValueDesc: number = 194;             //固定值增加对道士的伤害
    // public static WizardDamageAddRateDesc: number = 195;			   //固定比增加对法师的伤害
    // public static MonsterDamageAddValueDesc: number = 196;             //固定值增加对怪物的伤害
    // public static MonsterDamageAddRateDesc: number = 197;			   //固定比增加对怪物的伤害
    /**
      * 格式化指定类型的属性的显示数值
      * 注意：数值需要使用Math.round方法进行取整
      * 不然可能会出现很多位小数的问题
      * @param type
      * @param value
      * @param toFixed 如果是百分百属性，后面显示多少个0
      * @return
      *
      */
    AttrBufId.formatValue = function (type, val, toFixed) {
        if (toFixed === void 0) { toFixed = 2; }
        // if (type == this.ExpPower || type == this.DamageAbsorbRate)
        // 	return NumericUtils.PercentToFixed(Math.abs(val), 0);
        // else if (this.isPercentage(type))  //配置的就是百分比的小数
        // 	return Math.abs(val) + "%";
        // else if (this.isFloat(type))  //配置是 0-100 但实际是百分比
        // 	return NumericUtils.PercentToFixed(Math.abs(val), toFixed);
        // else if (this.isTentHousand(type))
        // 	return (val / 100).toFixed(toFixed) + "%";
        // else if (this.wPercentage(type))
        // 	return (val / 10000).toFixed(toFixed) + "%";
        // else if (type == this.MoveSpeedAdd || type == this.AttackSpeedAdd)
        // 	return NumericUtils.PercentToFixed(Math.round(Math.abs(val / (700 + val)) * 100) / 100, 0);
        // else return Math.abs(val) + "";
        if (type == 0) {
            return val + "";
        }
        if (type == 1) {
            return val + "%";
        }
        if (type == 2) {
            return (val / 100).toFixed(0) + "%";
        }
        if (type == 3) {
            return (val / 10).toFixed(0) + "%";
        }
        if (type == 4) {
            return (val * 100).toFixed(0) + "%";
        }
    };
    return AttrBufId;
}());
__reflect(AttrBufId.prototype, "AttrBufId");
//# sourceMappingURL=AttrBufId.js.map