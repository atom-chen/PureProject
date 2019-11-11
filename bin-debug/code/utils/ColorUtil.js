var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 颜色相关处理工具
 */
var ColorUtil = (function () {
    function ColorUtil() {
    }
    /**
     * 合并颜色值
     */
    ColorUtil.mergeARGB = function ($a, $r, $g, $b) {
        return ($a << 24) | ($r << 16) | ($g << 8) | $b;
    };
    /**
     * 获取单个通道的颜色值
     * @param $argb 颜色值
     * @param $channel 要获取的颜色通道常量
     */
    ColorUtil.getChannel = function ($argb, $channel) {
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
    };
    /**
     * 颜色值表示法转换number转String
     * @param $number 需要转换的number值
     * @param $prefix 字符串前缀
     */
    ColorUtil.numberToString = function ($number, $prefix) {
        if ($prefix === void 0) { $prefix = "#"; }
        return $prefix + $number.toString(16);
    };
    /**
     * 统一颜色处理
     * 根据获取任务显示颜色
     */
    ColorUtil.getColorByquality = function (quiality) {
        // let len: number = ItemBase.QUALITY_COLOR.length - 1;
        // if (quiality > len) return ItemBase.QUALITY_COLOR[len];
        // return ItemBase.QUALITY_COLOR[quiality]
        return 0;
    };
    /////////////////////游戏中通用颜色//////////////
    /**白色   #ffffff*/
    ColorUtil.C_WHITE = 0xffffff;
    /**黄色   #ffd823*/
    ColorUtil.C_YELLOW = 0xffd823;
    /**黄色2  #fff600*/
    ColorUtil.C_YELLOW2 = 0xfff600;
    /**咖啡色 #4c2f27*/
    ColorUtil.C_COFFEE = 0x4c2f27;
    /**红色   #ff0000*/
    ColorUtil.C_RED = 0xff0000;
    /**绿色   #2aff00*/
    ColorUtil.C_GREEN = 0x2aff00;
    /**蓝色   #00a2ff*/
    ColorUtil.C_BLUE = 0x00a2ff;
    ////////////////////模型上的名字颜色/////////////////////
    /**默认名字颜色 #ffc600*/
    ColorUtil.TITLE_NORMAL = 0xffc600;
    /**npc名字颜色 #00ff06*/
    ColorUtil.TITLE_NPC = 0x00ff06;
    /**主角名字颜色 #fffde0*/
    ColorUtil.TITLE_HERO = 0xfffde0;
    ///////////////////标准色值///////////////////////
    /**#FF000000*/
    ColorUtil.ALPHA = 0xFF000000;
    /**#FF0000*/
    ColorUtil.RED = 0xFF0000;
    /**#00FF00*/
    ColorUtil.GREEN = 0x00FF00;
    /**#0000FF*/
    ColorUtil.BLUE = 0x0000FF;
    //////////////////////////////切记游戏中滤镜要少用，偶尔UI界面上用几个没事，但多地方用，会耗性能！/////////////////////////////
    /**灰色滤镜 */
    ColorUtil.ColorGrayFlilter = [
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0, 0, 0, 1, 0
    ];
    return ColorUtil;
}());
__reflect(ColorUtil.prototype, "ColorUtil");
//# sourceMappingURL=ColorUtil.js.map