enum AICampType {
	/**中立*/
	NORMAL = 0,
	/**本方*/
	SELF,
	/**机器人*/
	ROOT,
	/**怪物*/
	MONSTER,

	/**对阵方1*/
	BATTLE1,
	/**对阵方2*/
	BATTLE2,
}

//Ai敌对
const AICampEnemy = {
	[AICampType.MONSTER]: [AICampType.SELF],
	[AICampType.SELF]: [AICampType.MONSTER],
	[AICampType.ROOT]: [AICampType.MONSTER],
	[AICampType.BATTLE1]: [AICampType.BATTLE2],
	[AICampType.BATTLE2]: [AICampType.BATTLE1],
}
