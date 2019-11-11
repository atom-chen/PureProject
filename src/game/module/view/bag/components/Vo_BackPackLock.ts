/**
 * create by junwei on 07/05/2019
 */
class BackPackLockVO extends BaseClass {
    public freeNum: number;  //可以激活开启的格子数
    public leftTime: number;  //剩余倒计时
    public allTime: number;  //格子总的倒计时

    public constructor() {
        super();
    }
}