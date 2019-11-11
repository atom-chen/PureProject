class QuestTypes {
	//任务的大分类
		static CLASS_DOING :number = 1;            //当前
		static CLASS_AVAILABLE :number = 2;        //可接
		
		static MAIN				 :number = 0;//主线任务
		static BRANCH				 :number = 1;//支线任务    //支线任务要放在最后面
		static CARBON				 :number = 2;//副本任务
		static DAILY				 :number = 3;//日常任务
		static GUILD				 :number = 4;//帮派任务
		static CHANLLENGE			 :number = 5;//挑战任务
		static ADVENTURE			 :number = 6;//奇遇任务
		static ACTIVITY			 :number = 7;//活动推介
		static CAMP				 :number = 8;//阵营任务
		static EQUIP				 :number = 9;//装备提升任务
		static EXP					 :number = 10;//经验任务
		static GOLD				 :number = 11;//金币任务
		static REFRESHQUEST		 :number = 12;//天书任务
		static CHECKPOINTS			 :number = 13;//财富闯关任务
		static TREASURE_PIC			 :number = 14;//宝图任务 //add by likeky
		static FB_CAILIAO             :number = 100; //材料副本导航
		static FB_EXP                 :number = 101; //经验副本导航
		
		// static QUEST_TYPE_LIST:Array = 
		// 										[
		// 											MAIN,												
		// 											CARBON,
		// 											DAILY,
		// 											GUILD,
		// 											CHANLLENGE,
		// 											ADVENTURE,
		// 											ACTIVITY,
		// 											CAMP,
		// 											EQUIP,
		// 											EXP,
		// 											GOLD,
		// 											BRANCH,
		// 											REFRESHQUEST,
		// 											CHECKPOINTS,
		// 											TREASURE_PIC,
		// 											FB_CAILIAO,
		// 											FB_EXP
		// 										];
		static SHOWAWARDS				 :number = 1;//任务显示奖励
}