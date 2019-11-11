/**
 * 通用信息通道
*/
class MessageCenter extends BaseClass {
    private _dic: Object = {};
    /**存储变化的消息列表 */
    public changeDic: Object = {};
    private _targetDic: Object = {};

    private _type: number = 1;
    private _msgVo: MessageVo[] = [];
    public constructor() {
        super();
        if (this._type == 0) {
            //App.TimerManager.add(1, this.onRun, this);
            egret.startTick(this.onRun, this);
        }
    }

    /**添加一个事件侦听，type事件类型, call回调函数, thisc回调函数所属, once只侦听一次 **/
    public addListener(type: string, call: Function, thisc: any, once: boolean = false): void {
        let arr: Handler[] = this._dic[type];
        if (arr == null) {
            arr = [];
            this._dic[type] = arr;
        }
        let hashCode = thisc && thisc["hashCode"];
        if (hashCode) {
            let typeArr: string[] = this._targetDic[hashCode];
            if (typeArr == null) {
                typeArr = [];
                this._targetDic[hashCode] = typeArr;
            }
            typeArr.push(type);
        }
        let han: Handler = Handler.create(thisc, call, null, once);
        arr.push(han);
    }
    /**移除一个侦听 type事件类型 thisc回调函数所属**/
    public removeListener(type: string, thisc: any): void {
        let arr: Handler[] = this._dic[type];
        if (arr) {
            let i: number = 0;
            let len: number = arr.length;
            for (; i < len; i++) {
                let han: Handler = arr[i];
                if (han.caller === thisc) {
                    han.dispose();
                    arr.splice(i, 1);
                    if (arr.length == 0) {
                        delete this._dic[type];
                    }
                    return;
                }
            }
        }
    }
    /**移除该对象所有侦听**/
    public removeAll(thisc: any): void {
        let hashCode = thisc && thisc["hashCode"];
        if (hashCode) {
            let typeArr: string[] = this._targetDic[hashCode];
            if (typeArr) {
                for (let type of typeArr) {
                    this.removeListener(type, thisc);
                }
                delete this._targetDic[hashCode];
            }
        } else {
            for (let key in this._dic) {
                this.removeListener(key, thisc);
            }
        }
    }

    /**派发事件,type事件类型 data可选参数**/
    public dispatch(type: string, ...data): void {
        if (this._type == 0) {
            this._msgVo.push(this.getMessageVo(type, data));
        } else {
            this.doMsg(type, data);
        }
    }

    private doMsg(type: string, data): void {
        let arr: Handler[] = this._dic[type];
        if (arr && arr.length) {
            let i: number = arr.length - 1;
            // let len: number = arr.length;
            let han: Handler;
            for (; i >= 0; i--) {
                han = arr[i];
                if (!han) {
                    arr.splice(i, 1);
                    continue;
                }
                if (data == null) {
                    han.run();
                } else {
                    han.args = data;
                    han.run();
                    han.args = null;
                }
                if (han.once) {
                    arr.splice(i, 1);
                }
            }
        }
        this.changeDic[type] = type;
    }

    private onRun() {
        var currTime: number = App.TimerManager.getSyncTime();
        let list = this._msgVo;
        while (list.length > 0) {
            let vo = list.shift();
            this.doMsg(vo.type, vo.param);
            this._msgPool.push(vo);
            let t = egret.getTimer() - currTime;
            if (t > 5) {
                break;
            }
        }
        return true;
    }
    /**属性变更回调*/
    public addProperty(call: Function, thisc: any, ...pros: number[]): void {
        let len = pros.length;
        for (let i = 0; i < len; i++) {
            this.addListener(MsgConst.PROPERTY + pros[i], call, thisc);
        }
    }

    private _msgPool: MessageVo[] = [];
    private getMessageVo(type, param): MessageVo {
        let vo = this._msgPool.pop();
        if (!vo) {
            vo = new MessageVo();
        }
        vo.type = type;
        vo.param = param;
        return vo;
    }

    /**获取协议变化 */
    public getMsgList() {
        return this._dic;
    }
}

class MessageVo {
    public type: string;
    public param: any[];

    public constructor() {
    }

    public dispose(): void {
        this.type = null
        this.param = null;
    }
}