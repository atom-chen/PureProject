/*
 * @Description: 聊天频道类型
 * @Author: xiejunwei
 * @Date: 2019-10-08 17:25:36
 */
enum ChatType {
    SYSTEM,  //系统频道
    WORLD,   //世界频道
    GUILD,   //工会，帮派
    CS,      //跨服
}


enum SysMessageType {
    CHAT_PANEL_RIGHT = 1,         //聊天框右边
    SYSTEM_SCENE_CENTER,      //屏幕中央下面
    CHAT_PANEL_SYS,           //聊天栏系统频道
    SYSTEM_BARRAGE,			  //弹幕，走马灯
    SYSTEM_BARRAGE_NOW,       //弹幕，走马灯，马上播放

    length			//保留最后，总长度
}
