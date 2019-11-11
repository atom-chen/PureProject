/*
 * @Description: 实体属性集
 * @Author: guolinsen
 * @Date: 2019-08-13 10:06:31
 * @LastEditTime: 2019-09-26 20:23:00
 */
class PropertySet {
    /**唯一标识*/
    recog: number;
    kind: number;
    aiCamp: number = 0;
    charName: string;
    masterName: string;
    masterId: number;
    /**是否开启战斗ai*/
    fightAi: boolean = false;
    /**归属者*/
    gsName: string;
    isMainPlayer: boolean = null;
    isFlow: boolean = null;

    /**宠物 */
    petId: number[] = [];
    petStar: number[] = [];
    petName: string[] = [];

    /**血条颜色 1绿色，0或者没有就红色*/
    hpType: number;

    /**AI挂机使用的技能*/
    skillList: number[][];

    public setRoleName(str: string) {
        this.parseName(str);
    }

    /**
	 * 从服务器发来的名称字符串中解析各个名称 
	 * @param NameStr 解码后的名称字符串
	 * 
	 */
    protected parseName(str: string) {
		/**
		 * 名称字符串的格式为：
		 * "角色名称\主人名称"
		 */
        var strings: string[] = str.split("\\");
        this.charName = strings[0];
        this.masterName = strings.length > 1 ? strings[1] : null;
    }

    public clone(): PropertySet {
        let pro = new PropertySet();
        for (let type in this) {
            //console.log("clone", type);
            pro.pro(type, this.pro(type));
        }
        // pro.recog = this.recog;
        // pro.kind = this.kind;
        // pro.aiCamp = this.aiCamp;
        // pro.charName = this.charName;
        // pro.masterName = this.masterName;
        // pro.fightAi = this.fightAi;
        // pro.gsName = this.gsName;
        // pro.petId = this.petId;
        // pro.petName = this.petName;
        pro.isMainPlayer = null;


        return pro;
    }
    /**
     * 设置属性并返回新值，如果不设置新值则直接返回原来值
     * @param name
     * @param value
     * @param thing 有传这个则马上更新
     * @return 当前属性值
     */
    public pro(name: any, value?: number | string, thing?: AnimalThing): number {
        value != undefined && (this[name] = value);
        if (thing) thing.updateProperty(name, value);
        return this[name] || 0;
    }
    /**
     * 从字节流中读取指定ID的属性，并保存到属性集
     * @param propId
     * @param bytes
     * 
     */
    public readProperty(propId: number, bytes: GameByteArray): void {
        var propValue: any;
        var dt: number = PropertySet.getDataType(propId);
        switch (dt) {
            case enDt.DT_UNSIGNED_INT:
                propValue = bytes.readUnsignedInt();
                break;
            case enDt.DT_FLOAT:
                propValue = bytes.readFloat();
                break;
            case enDt.DT_DOUBLE:
                propValue = bytes.readDouble();
                break;
            default:
                propValue = bytes.readInt();
                break;
        }
        this[propId] = propValue;
    }
    /**
     * 从字节流中读取指定数量的属性，并保存到属性集
     * @param count
     * @param bytes
     * 
     */
    public readMultiProperty(count: number, bytes: GameByteArray): void {
        for (var i: number = 0; i < count; i++)
            this.readProperty(bytes.readUnsignedByte(), bytes);
    }

    get moveSpeed() {
        return this.pro(PropId.AP_MOVE_SPEED) || 150;
    }

    get job() {
        return this.pro(PropId.AP_JOB);
    }


	/**
     * 根据属性获取相关的金钱类型  -1代表不是
     * @param pro
     * @return
     *
     */
    static getGameMoneyType(pro: number): number {
        switch (pro) {
            case PropId.AP_COIN:
                return MoneyType.NON_BIND_COIN;
            case PropId.AP_YUANBAO:
                return MoneyType.NON_BIND_YUANBAO;
            case PropId.AP_BIND_YUANBAO:
                return MoneyType.BIND_YUANBAO;
            case PropId.AP_BIND_COIN:
                return MoneyType.BIND_COIN;
            // case PropId.AP_ACTOR_STOREPOINT:
            //     return enMoneyType.STONE_POINT;
        }
        return -1;
    }

	/**
     * 获取属性数据类型
     * @param value
     * @return
     *
     */
    static getDataType(value: number): number {

        switch (value) {

            case PropId.AP_X:
            case PropId.AP_Y:
            case PropId.AP_BODY_ID:
            case PropId.AP_DIR:
            case PropId.AP_WEAPON:
            case PropId.AP_MOUNT:
            case PropId.AP_SWING:
            case PropId.AP_PK_VALUE:
                //case PropId.AP_ZHAN_HUN_VALUE:
                //case PropId.AP_ACHIEVE_VALUE:
                //				case AP_TITLE_ID:
                // case PropId.AP_MOUNT_RIDE_TYPE:
                // case PropId.AP_ZY_ID:
                //case PropId.AP_ACTOR_SIGNIN:
                //case PropId.AP_CRIT_RATE:
                //case PropId.AP_CRIT_VALUE:
                // case PropId.AP_CRIT_RATE_DESC:
                return enDt.DT_INT;
            // case PropId.AP_MAGIC_HIT_RATE:
            // case PropId.AP_MAGIC_DOGERATE:
            // case PropId.AP_TOXIC_DOGERATE:
            // case PropId.AP_HP_RENEW:
            // case PropId.AP_MP_RENEW:
            // case PropId.AP_TOXIC_RENEW:
            //     return enDt.DT_FLOAT;
            default:
                return enDt.DT_UNSIGNED_INT;
        }
    }

}

enum enDt {
    DT_BOOLEAN = 1,
    DT_BYTE,
    DT_DOUBLE,
    DT_FLOAT,
    DT_INT,
    DT_SHORT,
    DT_UNSIGNED_BYTE,
    DT_UNSIGNED_INT,
    DT_UNSIGNED_SHORT,
    DT_STRING,
}