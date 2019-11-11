
/**
 * 滤镜工具类
 * 
 */
class FilterUtils {

	private static _DefaultGrayFilters
	static get DefaultGrayFilters(): egret.ColorMatrixFilter[] {
		if (this._DefaultGrayFilters == null) {
			this._DefaultGrayFilters = [
				new egret.ColorMatrixFilter([
					0.3086, 0.6094, 0.082, 0, 0,
					0.3086, 0.6094, 0.082, 0, 0,
					0.3086, 0.6094, 0.082, 0, 0,
					0, 0, 0, 1, 0
				])
			];
		}
		return this._DefaultGrayFilters;
	}
	// //蓝色发光滤镜
	// static BlueGlowFilter0: egret.GlowFilter = new egret.GlowFilter(0xFF0000, 1, 1, 1, 10, 1);
	// //巧克力色发光滤镜
	// static PinkGlowFilter0: egret.GlowFilter = new egret.GlowFilter(0xCC5200, 1, 10, 10, 3);
	// //白色发光滤镜
	// static WhiteGlowFilter0: egret.GlowFilter = new egret.GlowFilter(0xFFFFFF, 1, 10, 10, 1);
	// //黑色发光滤镜
	// static BlackGlowFilter0: egret.GlowFilter = new egret.GlowFilter(0x000000, 0.6, 3, 3, 8);
	// //阴影滤镜
	// //static ShadowFilter0: DropShadowFilter = new DropShadowFilter(2, 90);

	// //绿色发光滤镜
	// static GreenGlowFilter: egret.GlowFilter = new egret.GlowFilter(0x00FF00, 1, 2, 2, 1);

	// //炫耀系统公告滤镜
	// static ShowyNoticeFilters0: egret.GlowFilter[] = [FilterUtils.BlueGlowFilter0];
	// //		static ShowyNoticeFilters1:Array = [PinkGlowFilter0,ShadowFilter0];
	// static ShowyNoticeFilters1: egret.GlowFilter[] = [FilterUtils.BlackGlowFilter0];//[BlackGlowFilter0,WhiteGlowFilter0];

	// //绿色滤镜
	// static GreeTextFilters: egret.GlowFilter[] = [FilterUtils.GreenGlowFilter];

	// //默认的文字描边滤镜
	// static DefaultTextFilters: egret.GlowFilter[] = [FilterUtils.BlackGlowFilter0];

	// //黑白滤镜
	// //public static const BLACK_WHITE: egret.ColorMatrixFilter = new egret.ColorMatrixFilter([0.5, 0.5, 0.082, 0, 0, 0.5, 0.5, 0.082, 0, 0, 0.5, 0.5, 0.082, 0, 0, 0, 0, 0, 1, 0]);

	// //默认的图像暗化滤镜（例如未学习的技能图标应当被暗化显示）
	// static DefaultGrayFilters: egret.ColorMatrixFilter[] = [
	// 	new egret.ColorMatrixFilter([
	// 		0.3086, 0.6094, 0.082, 0, 0,
	// 		0.3086, 0.6094, 0.082, 0, 0,
	// 		0.3086, 0.6094, 0.082, 0, 0,
	// 		0, 0, 0, 1, 0
	// 	])
	// ];

	// //转圈后选中的发光滤镜
	// static RoundSelectFilters: egret.GlowFilter[] = [new egret.GlowFilter(0x00FF00, 0.75, 15, 15)];//0x00FF00, 0.75,10,10

	// //选中角色的发光滤镜
	// static RoleSelectedFilters: egret.GlowFilter[] = [new egret.GlowFilter(0xFFFF00, 0.75)];
	// //导航按钮文字描边滤镜
	// static NavButtonTextFilters: egret.GlowFilter[] = [new egret.GlowFilter(0x002327, 1, 2, 2, 10, 1, false, false)];

	// //网格cell选中的滤镜
	// static CellSelectedFilters: egret.GlowFilter[] = [new egret.GlowFilter(0xFFCC00, 1, 6, 6, 2, 4, false)];

	// //网格cell选中的滤镜
	// static CellSelectedFilters_Fine: egret.GlowFilter[] = [new egret.GlowFilter(0xFFCC00, 1, 2, 2, 4, 4, false)];

	// //网格cell选中的滤镜-加粗
	// static CellSelectedFilters_Bloder: egret.GlowFilter[] = [new egret.GlowFilter(0xFFCC00, 1, 6, 6, 4, 4, false)];

	// /**果实选中的滤镜*/
	// static FruitSelectedFilters: egret.GlowFilter[] = [new egret.GlowFilter(0xFFFFFF, 1, 6, 6, 2)];

	// //白色发光滤镜
	// static WhiteSelectedFilters: egret.GlowFilter[] = [new egret.GlowFilter(0xFFFFFF, 1, 16, 16, 3)];

	// //原始的颜色矩阵,没做任何改变
	// static OriginalColorFilter: egret.ColorMatrixFilter = new egret.ColorMatrixFilter([
	// 	1, 0, 0, 0, 0,
	// 	0, 1, 0, 0, 0,
	// 	0, 0, 1, 0, 0,
	// 	0, 0, 0, 1, 0]);//颜色矩阵滤镜

	// static WBGlowFilter: egret.ColorMatrixFilter = new egret.ColorMatrixFilter([0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0, 0, 0, 1, 0]);
	// static ZDGlowFilter: egret.ColorMatrixFilter = new egret.ColorMatrixFilter(
	// 	[1, 0, 0, 0, -255, 
	//      0, 1, 0, 0, 0, 
	// 	 0, 0, 1, 0, -255,
	// 	 0, 0, 0, 1, 0]);

	// /**
	//  * 根据颜色创建一个颜色滤镜 
	//  * @param color
	//  * @return 
	//  * 
	//  */
	// static createColorFilter(color: number): egret.ColorMatrixFilter {
	// 	var filter: egret.ColorMatrixFilter = new egret.ColorMatrixFilter([
	// 	1, 0, 0, 0, 0,
	// 	0, 1, 0, 0, 0,
	// 	0, 0, 1, 0, 0,
	// 	0, 0, 0, 1, 0]);//颜色矩阵滤镜

	// 	var ma: number[] = filter.matrix.concat();
	// 	//分离并得到颜色的偏移量
	// 	ma[4] = ((color & 0xFF0000) >> 16) - 255;
	// 	ma[9] = ((color & 0xFF00) >> 8) - 255;
	// 	ma[14] = (color & 0xFF) - 255;

	// 	filter.matrix = ma;

	// 	if (color == 11645361)
	// 		filter = FilterUtils.WBGlowFilter;

	// 	return filter;
	// }
}
