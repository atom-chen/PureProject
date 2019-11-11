/**
 * 游戏socket接口
 * @author linsen
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameSocket = (function (_super) {
    __extends(GameSocket, _super);
    function GameSocket() {
        var _this = _super.call(this) || this;
        _this._socketStatus = 0;
        _this._lastReceiveTime = 0;
        _this.pid = 0;
        /**
         * 服务器协议处理注册表
         * 格式
         * PACK_HANDLER[sysId][msgId] = [fun,funThisObj]
         */
        _this.PACK_HANDLER = [];
        _this._serverId = 0;
        _this._user = "";
        _this._pwd = "";
        _this.reLoginCount = 0;
        _this.newSocket();
        _this.recvPack = new GameByteArray();
        _this._packets = [];
        return _this;
    }
    GameSocket.ins = function () {
        if (!GameSocket._ins) {
            GameSocket._ins = new GameSocket();
        }
        return GameSocket._ins;
    };
    GameSocket.prototype.newSocket = function () {
        this.socket_ = new egret.WebSocket;
        this.socket_.type = egret.WebSocket.TYPE_BINARY;
        this.socket_.addEventListener(egret.Event.CONNECT, this.onSocketConnected, this);
        this.socket_.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.socket_.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketRead, this);
        this.socket_.addEventListener(egret.IOErrorEvent.IO_ERROR, this.connectError, this);
    };
    GameSocket.prototype.removeSocket = function () {
        if (this.socket_) {
            this.socket_.removeEventListener(egret.Event.CONNECT, this.onSocketConnected, this);
            this.socket_.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.socket_.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketRead, this);
            this.socket_.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.connectError, this);
            this.socket_ = null;
        }
    };
    /**
     * 发送到服务器
     * @param bytes
     */
    GameSocket.prototype.sendToServer = function (bytes) {
        this.send(bytes);
        GameByteArray.recycleByte(bytes);
    };
    GameSocket.prototype.connectError = function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        //alert(`网络中断--${this._host}:${this._port}`);
        //window["connectError"]();
        //App.TimerManager.remove(this.reLogin, this);
        //App.TimerManager.add(5000, this.reLogin, this, 1);
        this.onDisconnected();
    };
    GameSocket.prototype.connect = function (host, port) {
        this.updateStatus(GameSocket.STATUS_CONNECTING);
        this._host = host;
        this._port = port;
        this.socket_.connect(host, port);
    };
    GameSocket.prototype.close = function () {
        console.log("close socket！ip:" + this._host + " port:" + this._port);
        this.socket_.close();
    };
    GameSocket.prototype.send = function (message) {
        if (this._socketStatus == GameSocket.STATUS_COMMUNICATION) {
            this.sendPack(message);
            return true;
        }
        else {
            console.log("发送数据时没和服务连接或者未进入通信状态");
            return false;
        }
    };
    GameSocket.prototype.onSocketConnected = function (e) {
        console.log("Server connected! ip:" + this._host + " port:" + this._port);
        App.TimerManager.remove(this.reLogin, this);
        this.reLoginCount = 0;
        GameCache.global.disconnectedType = -1;
        this.updateStatus(GameSocket.STATUS_CHECKING);
        var bytes = new GameByteArray;
        bytes.writeUnsignedInt(Encrypt.getSelfSalt());
        this.socket_.writeBytes(bytes);
        this.socket_.flush();
    };
    // private big: number = 0;
    // private small: number = 0;
    // private mid: number = 0;
    GameSocket.prototype.onSocketRead = function (e) {
        // 检验阶段
        if (this._socketStatus < GameSocket.STATUS_COMMUNICATION) {
            this.sendKeyToServer();
            return;
        }
        var bytesCache = this.recvPack;
        // 记录接收数据包时间
        //this._lastReceiveTime = egret.getTimer();
        // 将收到的字节流写入到存储接收到服务器数据包的字节流
        this.socket_.readBytes(bytesCache, bytesCache.length);
        // 截取完成数据包并派发
        var pos = 0;
        bytesCache.position = 0;
        // 处理数据包数量
        while (bytesCache.bytesAvailable > GameSocket.HEAD_SIZE) {
            // 识别并记录包起始位置
            pos = bytesCache.position;
            var tag = bytesCache.readUnsignedShort();
            if (tag != GameSocket.DEFAULT_TAG)
                continue;
            // 读取数据包buff长度
            var buffLen = bytesCache.readUnsignedShort();
            // 预留4字节
            bytesCache.position += 12;
            // 读取buffLen长度的数据
            if (buffLen > bytesCache.bytesAvailable) {
                break;
            }
            var datasize = buffLen + GameSocket.HEAD_SIZE;
            if ((2 * datasize) > bytesCache.bytesAvailable) {
                // this.big++;
                var newbuff = ObjectPool.get(GameByteArray);
                newbuff.clear();
                if (bytesCache.bytesAvailable > buffLen) {
                    var curpos = bytesCache.position;
                    bytesCache.position += buffLen;
                    bytesCache.readBytes(newbuff, 0, bytesCache.bytesAvailable);
                    bytesCache.position = curpos;
                    // this.mid++;
                }
                this._packets.push(bytesCache);
                bytesCache = this.recvPack = newbuff;
                bytesCache.position = 0;
            }
            else {
                // this.small++;
                // 读取包的数据
                var buff = ObjectPool.get(GameByteArray);
                buff.clear();
                bytesCache.readBytes(buff, 0, buffLen);
                // 收集完成的消息包，然后一次性派发，这样也便于外部模块处理异常
                this._packets.push(buff);
            }
            // 记录截取位置，即下一个包的起始位置
            pos = bytesCache.position;
            // debug.log(`big:${this.big},small:${this.small}, mid:${this.mid}`);
        }
        // 输出处理消息包的数量
        // debug.log("收包时间：" + this._lastReceiveTime, "包数量：" + numPackets);
        if (pos) {
            bytesCache.position = pos;
            bytesCache.readBytes(bytesCache);
            bytesCache.length -= pos;
        }
        // 派发消息包
        while (this._packets.length > 0) {
            var pack = this._packets.shift();
            this.processRecvPacket(pack);
            GameByteArray.recycleByte(pack);
        }
        this._packets.length = 0;
    };
    GameSocket.prototype.sendKeyToServer = function () {
        var pack = new GameByteArray;
        this.socket_.readBytes(pack);
        pack.position = 0;
        var salt = pack.readUnsignedInt();
        //let salt:string = pack.readString();
        Encrypt.setTargetSalt(salt);
        // 发送检验码到服务器
        pack.position = 0;
        var ss = Encrypt.getCheckKey();
        pack.writeShort(ss);
        this.socket_.writeBytes(pack, 0, 2);
        // 进入通信状态
        this.updateStatus(GameSocket.STATUS_COMMUNICATION);
    };
    GameSocket.prototype.onSocketClose = function (e) {
        console.log("Server disconnected! ip:" + this._host + " port:" + this._port);
        this.updateStatus(GameSocket.STATUS_DISCONNECT);
        App.TimerManager.remove(this.reLogin, this);
        this.onDisconnected();
    };
    GameSocket.prototype.reLogin = function () {
        this.close();
        this.removeSocket();
        this.newSocket();
        this.reLoginCount++;
        GlobalFun.SysMsg(Language.lang.socket3);
        this.login(this._user, this._pwd, this._serverId, this._host, this._port);
    };
    GameSocket.prototype.updateStatus = function (status) {
        if (this._socketStatus != status) {
            var old = this._socketStatus;
            this._socketStatus = status;
            this.onFinishCheck(status, old);
        }
    };
    GameSocket.prototype.onFinishCheck = function (newStatus, oldStatus) {
        if (newStatus == GameSocket.STATUS_COMMUNICATION) {
            this.sendCheckAccount(this._user, this._pwd);
        }
        else if (newStatus == GameSocket.STATUS_DISCONNECT) {
            // TODO: output error message
        }
    };
    Object.defineProperty(GameSocket.prototype, "host", {
        get: function () {
            return this._host;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameSocket.prototype, "port", {
        get: function () {
            return this._port;
        },
        enumerable: true,
        configurable: true
    });
    GameSocket.prototype.sendCheckAccount = function (user, pwd) {
        console.log("account：", user, pwd);
        var bytes = GameByteArray.getBytes();
        bytes.writeCmd(255, 1);
        bytes.writeString(user);
        bytes.writeString(pwd);
        bytes.writeUnsignedInt(this._serverId);
        bytes.writeUnsignedInt(this._serverId);
        this.sendToServer(bytes);
    };
    GameSocket.prototype.login = function (user, pwd, serverID, ip, port) {
        this._user = user;
        this._pwd = pwd;
        this._serverId = serverID;
        if (ip.split(":")[1] && ip.split(":")[1].length)
            port = parseInt(ip.split(":")[1]);
        if (!this.socket_.connected) {
            console.log("connect to " + ip + " ,port: " + port);
            this.connect(ip, port);
        }
        else {
            this.sendCheckAccount(user, pwd);
        }
    };
    GameSocket.prototype.processRecvPacket = function (packet) {
        var sysId = packet.readUnsignedByte();
        var msgId = packet.readUnsignedByte();
        //console.log("收到协议", sysId, msgId);
        this.dispatch(sysId, msgId, packet);
    };
    /** 派发协议 */
    GameSocket.prototype.dispatch = function (sysId, msgId, byte) {
        // console.log(">>>>>>>>>--sysId：" + sysId + "  >>  msgId：" + msgId );
        if (!this.PACK_HANDLER[sysId] || !this.PACK_HANDLER[sysId][msgId]) {
            // egret.log("未处理服务器协议：" + sysId + "-" + msgId);
            return;
        }
        var arr = this.PACK_HANDLER[sysId][msgId];
        arr[0].call(arr[1], byte, msgId);
    };
    /**
     * 注册一个服务器发送到客户端的消息处理
     * @param msgId
     * @param fun
     * @param thisObj
     */
    GameSocket.prototype.registerSTCFunc = function (sysId, msgId, fun, sysClass) {
        if (!this.PACK_HANDLER[sysId]) {
            this.PACK_HANDLER[sysId] = [];
        }
        else if (this.PACK_HANDLER[sysId][msgId]) {
            console.log("\u91CD\u590D\u6CE8\u518C\u534F\u8BAE\u63A5\u53E3" + sysId + "-" + msgId);
            return;
        }
        this.PACK_HANDLER[sysId][msgId] = [fun, sysClass];
    };
    GameSocket.prototype.sendPack = function (pack) {
        if (pack == null || pack.length == 0) {
            throw new egret.error("创建客户端数据包时数据不能为空！");
        }
        // 初始化包头
        var headsize = GameSocket.HEAD_SIZE;
        pack.position = 2;
        pack.writeShort(pack.length - headsize);
        // 计算数据CRC
        var msgCK = Encrypt.getCRC16ByPos(pack, headsize);
        pack.position = 4;
        pack.writeShort(msgCK);
        // 计算包头CRC
        var headerCRC = Encrypt.getCRC16(pack, headsize);
        // 将计算出来的包头CRC替换默认包头CRC
        pack.position = 6;
        pack.writeShort(headerCRC);
        // 对数据CRC和包头CRC进行加密
        Encrypt.encode(pack, 4, 4);
        this.socket_.writeBytes(pack);
    };
    GameSocket.prototype.onDisconnected = function () {
        if (this.reLoginCount > 30) {
            GlobalFun.alert(Language.lang.socket3, null, null, 1);
            return;
        }
        else if (this.reLoginCount != 0) {
            this.delayRelogin();
            return;
        }
        App.MessageCenter.dispatch(MsgConst.RECONNECTED);
        //被顶号
        if (GameCache.global.disconnectedType == 1) {
            GlobalFun.alert(Language.lang.socket1, null, null, 1);
        }
        else {
            GlobalFun.alert(Language.lang.socket2, this.delayRelogin, this, 1);
        }
    };
    GameSocket.prototype.delayRelogin = function () {
        App.TimerManager.addDelay(1000, 1, 1, this.reLogin, this);
    };
    GameSocket.DEFAULT_TAG = 0xCCEE; // 约定的信息头
    GameSocket.DEFAULT_CRC_KEY = 0x7C58; // 默认包头校验
    GameSocket.HEAD_SIZE = 16; // 最小通信封包字节长度
    /** 连接中 */
    GameSocket.STATUS_CONNECTING = 1;
    /** 检验中 */
    GameSocket.STATUS_CHECKING = 2;
    /** 连接生效 */
    GameSocket.STATUS_COMMUNICATION = 3;
    /** 关闭连接 */
    GameSocket.STATUS_DISCONNECT = 4;
    return GameSocket;
}(egret.HashObject));
__reflect(GameSocket.prototype, "GameSocket");
//# sourceMappingURL=GameSocket.js.map