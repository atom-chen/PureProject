
/**
 * 颜色相关处理工具
 */
class ColorUtil {
	/////////////////////游戏中通用颜色//////////////
	/**白色   #ffffff*/
	public static C_WHITE: number = 0xffffff;
	/**黄色   #ffd823*/
	public static C_YELLOW: number = 0xffd823;
	/**黄色2  #fff600*/
	public static C_YELLOW2: number = 0xfff600;
	/**咖啡色 #4c2f27*/
	public static C_COFFEE: number = 0x4c2f27;
	/**红色   #ff0000*/
	public static C_RED: number = 0xff0000;
	/**绿色   #2aff00*/
	public static C_GREEN: number = 0x2aff00;
	/**蓝色   #00a2ff*/
	public static C_BLUE: number = 0x00a2ff;

	////////////////////模型上的名字颜色/////////////////////
	/**默认名字颜色 #ffc600*/
	public static TITLE_NORMAL = 0xffc600;
	/**npc名字颜色 #00ff06*/
	public static TITLE_NPC = 0x00ff06;
	/**主角名字颜色 #fffde0*/
	public static TITLE_HERO = 0xfffde0;


	///////////////////标准色值///////////////////////
	/**#FF000000*/
	public static ALPHA: number = 0xFF000000;
	/**#FF0000*/
	public static RED: number = 0xFF0000;
	/**#00FF00*/
	public static GREEN: number = 0x00FF00;
	/**#0000FF*/
	public static BLUE: number = 0x0000FF;


	/**
	 * 合并颜色值
	 */
	public static mergeARGB($a: number, $r: number, $g: number, $b: number): number {
		return ($a << 24) | ($r << 16) | ($g << 8) | $b;
	}

	/**
	 * 获取单个通道的颜色值
	 * @param $argb 颜色值
	 * @param $channel 要获取的颜色通道常量
	 */
	public static getChannel($argb: number, $channel: number): number {
		switch ($channel) {
			case this.ALPHA:
				return ($argb >> 24) & 0xff;
			case this.RED:
				return ($argb >> 16) & 0xff;
			case this.GREEN:
				return ($argb >> 8) & 0xff;
			case this.BLUE:
				return $argb & 0xff;
		}
		return 0;
	}

	/**
	 * 颜色值表示法转换number转String
	 * @param $number 需要转换的number值
	 * @param $prefix 字符串前缀
	 */
	public static numberToString($number: number, $prefix: String = "#"): String {
		return $prefix + $number.toString(16);
	}

	/**
	 * 统一颜色处理
	 * 根据获取任务显示颜色
	 */
	public static getColorByquality(quiality: number): number {
		// let len: number = ItemBase.QUALITY_COLOR.length - 1;
		// if (quiality > len) return ItemBase.QUALITY_COLOR[len];
		// return ItemBase.QUALITY_COLOR[quiality]
		return 0;
	}
	//////////////////////////////切记游戏中滤镜要少用，偶尔UI界面上用几个没事，但多地方用，会耗性能！/////////////////////////////
	/**灰色滤镜 */
	public static ColorGrayFlilter = [
		0.3, 0.6, 0, 0, 0,
		0.3, 0.6, 0, 0, 0,
		0.3, 0.6, 0, 0, 0,
		0, 0, 0, 1, 0
	];


}

