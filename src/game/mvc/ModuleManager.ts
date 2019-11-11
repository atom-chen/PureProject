/*
 * @Description: 模块初始化
 * @Author: guolinsen
 * @Date: 2019-08-20 15:06:53
 */
class ModuleManager {
	public constructor() {
	}

	static init() {
		this.register(ViewConst.CREATE_ROLE, CreateRoleView);
		this.register(ViewConst.CREATE_HERO, CreateHeroView);
		this.register(ViewConst.WELCOME, NoviceWelcomeView);
		this.register(ViewConst.GAME_WORLD, GameWorld);
		this.register(ViewConst.MAIN_UI, MainUI);
		this.register(ViewConst.MAIN_UI_COCER, MainUICover);
		this.register(ViewConst.BUFF, BuffWin);
		this.register(ViewConst.MAIN_QUEST, QuestMainView);
		this.register(ViewConst.FIGHT_CHANGE, FightPowerChangeView);
		this.register(ViewConst.SIGN, SignWin);
		this.register(ViewConst.ROLE, RoleWin);
		this.register(ViewConst.PET, PetWin);
		this.register(ViewConst.SHOP, ShopWin);
		this.register(ViewConst.PETSHOWALL, PetShowAllWin);
		this.register(ViewConst.PETSIGLEINFOVIEW, PetSigleInfoView);
		this.register(ViewConst.PETTIPS, PetTips);
		this.register(ViewConst.ROLEPROTIPS, RoleProTipsView);
		this.register(ViewConst.BAG, BagWin);
		this.register(ViewConst.ITEMTIPS, ItemTips);
		this.register(ViewConst.SKILLTIPS, SkillTips);
		this.register(ViewConst.VIPTIPS, VipTips);
		this.register(ViewConst.DEBUG, DeBugWin);
		this.register(ViewConst.DEBUGDRAGON, DragonTestWin);
		this.register(ViewConst.NPCTALK, NPCTalkWin);
		this.register(ViewConst.EDITWIN, ConfigEditWin);
		this.register(ViewConst.SKILL, SkillWin);
		this.register(ViewConst.NEWITEM, NewItem);
		this.register(ViewConst.GASHAPON, GashaponWin);
		this.register(ViewConst.GASHAPONRW, GashaponRwWin);
		this.register(ViewConst.GASHAPONBAG, GashaponBagWin);
		this.register(ViewConst.OTHERROLE, RoleOtherPannelInfoWin);
		this.register(ViewConst.EMAIL, EmailWin);
		this.register(ViewConst.EMAIL_DETAIL, EmailDetailWin);
		this.register(ViewConst.SUITPROPERTY, SuitPropertyWin);
		this.register(ViewConst.SUITRESOLVE, SuitResolveWin);
		this.register(ViewConst.COPYTOWERRW, CopyTowerRwWin);
		this.register(ViewConst.RANKMODELWINA, RankModelWinA);
		this.register(ViewConst.LUCKYDAIL, LuckyDail);
		this.register(ViewConst.DAILYSHOWTIP, DailyShowTipWin);
		this.register(ViewConst.DAILY, DailyWin);
		this.register(ViewConst.ADVENTURE, AdventureWin);
		this.register(ViewConst.MELT, BagRecycleWin);
		this.register(ViewConst.COPY, CopyWin);
		this.register(ViewConst.VIP, VipWin);
		this.register(ViewConst.RANK, RankWin);
		this.register(ViewConst.CHARGE, VipChargeWin);
		this.register(ViewConst.CHUANGGUAN, ChuangguanPannel);
		this.register(ViewConst.FIRSTCHARGE, FirstChargeWin);
		this.register(ViewConst.REWARDEX, RewardExWin);
		this.register(ViewConst.AWARDTIPS, AwardTips);
		this.register(ViewConst.MAPLOADING, MapLoadingView);
		this.register(ViewConst.STRENGTH, StrengthWin);
		this.register(ViewConst.INSTRUCTION, InstructionTips);
		this.register(ViewConst.TRANSFER, TransferWin);
		this.register(ViewConst.TRANSFERSHOW, TransferShowWin);
		this.register(ViewConst.TRANSFERUSE, TransferUseWin);
		this.register(ViewConst.STRENGTHMASTER, StrengthMasterTips);
		this.register(ViewConst.BOSS, BossWin);
		this.register(ViewConst.SHOPTIPS, ShopTips);
		this.register(ViewConst.SYSTIPS, SysTips);
		this.register(ViewConst.REVIVE, ReviveTips);
		this.register(ViewConst.WBREVIVE, WorldBossReviveTips);
		this.register(ViewConst.BAGEXPAND, BagExpand);
		this.register(ViewConst.COORDINATE, CoordinateTips);
		this.register(ViewConst.FASHIONBUY, FashionBuyTips);
		this.register(ViewConst.WBBUY, EnterBuyTips);
		this.register(ViewConst.WINGSKILL, WingSkillTips);
		this.register(ViewConst.WBINFO, WorldInfo);
		this.register(ViewConst.COPY, CopyWin);
		this.register(ViewConst.COPYMATERIALSINFO, CopyMaterialsInfo);
		this.register(ViewConst.FAIL, FailTips);
		this.register(ViewConst.TOTALPROP, PropTips);
		this.register(ViewConst.RESONANCE, ResonanceTips);
		this.register(ViewConst.OFFLINEAW, OffLineAward);
		this.register(ViewConst.COPYEXPINFO, CopyExpInfo);
		this.register(ViewConst.JINGJI, JingjiWin);
		this.register(ViewConst.BUYBUFF, CopyExpBuffBuy);
		this.register(ViewConst.JINGJIRANK, JingjiRankTips);
		this.register(ViewConst.JINGJIINFO, JingjiInfo);
		this.register(ViewConst.ITEMLISTTIPS, ItemListTips);
		this.register(ViewConst.JEWELREPLACE, JewelReplaceTips);
		this.register(ViewConst.RUNESKILL, RuneSkillTips);
		this.register(ViewConst.SYSOPENHINT, SysOpenHint);
		this.register(ViewConst.CHAT, ChatWin);
		this.register(ViewConst.EMOJI, EmojiPart);
		this.register(ViewConst.KFHD, KFHDWin);
		this.register(ViewConst.PURGATORY_UPGRADE, PurgatoryUpgrade);
		this.register(ViewConst.PURGATORY_RESONATE_PROP, PurgatoryResonateProp);
		this.register(ViewConst.RANKB, RankModeWinB);
		this.register(ViewConst.XSLB, XSLBWin);
		this.register(ViewConst.PURGATORY_BAG, PurgatoryBag);
		this.register(ViewConst.ACTIVITY_CATALOGUE, ActivityCatalogue);
		this.register(ViewConst.FASHIONCOPYINFO, FashionCopyInfo);
		this.register(ViewConst.FAMILY, FamilyWin);
		this.register(ViewConst.FAMILY_LIST, FamilyListPanel);
		this.register(ViewConst.FAMILY_CREATE, FamilyCreatePanel);
		this.register(ViewConst.FAMILY_SETTING, FamilyApplyConfigPanel);
		this.register(ViewConst.FAMILY_DISMISS, FamilyDismissTipsPanel);
		this.register(ViewConst.FAMILY_APPLY, FamilyApplyPanel);
		this.register(ViewConst.FAMILY_NOTICE, FamilyNoticePanel);
		Proxy.init();
		GameCache.init();
	}

	private static register(type: number, cl: any) {
		App.ViewManager.register(type, cl);
	}
}
