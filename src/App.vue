<template>
    <div id="app">
        <div class="main">
            <div class="left">
                <img :src="chatImg" class="chat-logo"/>
            </div>
            <div class="right">
                <div class="group">
                    <div class="group-header">
                        <input class="group-header-search" type="text" v-model="groupNameAdd"/>
                        <div class="group-header-add" @click="addGroup()">+</div>
                    </div>
                    <div class="group-items">
                        <template v-for="(group,index) in groups">
                            <GroupItem :key="'group-item-'+index" :init-active="groupActive == index"
                                       :name="group.name" :lastMsg="group.lastMsg" :lastTime="group.lastTime"
                                       @click.native="setGroupActive(index)"></GroupItem>
                        </template>
                    </div>
                </div>
                <div class="chat-main">
                    <div class="text-main">
                        <div class="chat-header">
                            <div class="group-name">{{groupName}}</div>
                        </div>
                        <div id="chatMain" class="chat-main-text">
                            <template v-for="(bubbles,index) in chatBubbles">
                                <ChatBubble :key="'bubbles-'+index" :isRight="bubbles.userId == userId"
                                            :userName="bubbles.userName" :text="bubbles.content"></ChatBubble>
                            </template>
                        </div>
                    </div>
                    <div class="input">
                        <div class="input-utils"></div>
                        <div class="input-text">
                            <textarea :style="{fontSize:fontSize+'px'}" class="input-text-area"
                                      v-model="textareaMsg"></textarea>
                            <input class="input-text-send" type="button" @click="sendTextMsg()" value="发送"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GroupItem from './components/GroupItem.vue'
    import ChatBubble from './components/ChatBubble.vue'

    let USER_ID = "userId"

    let GROUP_LIST = "GROUP_LIST"
    let CREATE_GROUP = "CREATE_GROUP"
    let REGISTER = "REGISTER"
    let MSG_TEXT = "TEXT"

    export default {
        name: 'App',
        data() {
            return {
                websock: null,
                chatImg: require("./assets/chat-trans.png"),
                fontSize: 18,
                groupName: "大佬匿名交友群",
                groupActive: 0,
                groups: [],
                groupNameAdd: "",
                userId: null,
                textareaMsg: ""
            }
        },
        computed: {
            chatBubbles: function () {
                if (this.groupActive < this.groups.length) {
                    return this.groups[this.groupActive].msgs
                } else {
                    return []
                }
            }
        },
        watch: {
            chatBubbles() {
                this.$nextTick(() => {
                    this.chatRefresh()
                })
            }
        },
        components: {GroupItem, ChatBubble},
        created() {
            this.initWebSocket();
        },
        destroyed() {
            this.websock.close() //离开路由之后断开websocket连接
        },
        methods: {
            initWebSocket() { //初始化weosocket
                const wsuri = "ws://localhost:8848";
                this.websock = new WebSocket(wsuri);
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onopen = this.websocketonopen;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;
            },
            websocketonopen() { //连接建立之后执行send方法发送数据
                let actions = {"type": GROUP_LIST};
                this.websocketsend(JSON.stringify(actions));

                let userId = this.$cookies.get(USER_ID)
                if (userId) {
                    this.userId = userId
                } else {
                    let actions = {"type": REGISTER, "userName": "匿名用户"};
                    this.websocketsend(JSON.stringify(actions));
                }
            },
            websocketonerror() {//连接建立失败重连
                this.initWebSocket();
            },
            websocketonmessage(e) { //数据接收
                const recevie = e.data;
                console.log('收到', recevie)
                let data = JSON.parse(recevie);
                if (data.type == GROUP_LIST) {
                    this.handleGroupListMsg(data)
                } else if (data.type == CREATE_GROUP) {
                    this.handleCreateGroupMsg(data)
                } else if (data.type == REGISTER) {
                    this.handleRegisterMsg(data)
                } else if (data.type == MSG_TEXT) {
                    this.handleTextMsg(data)
                }
            },
            handleTextMsg(data) {
                if (data.success) {
                    let group = data.group
                    let name = group.name
                    for (let i = 0; i < this.groups.length; i++) {
                        if (this.groups[i].name == name) {
                            this.groups[i].lastMsg = group.lastMsg
                            this.groups[i].lastTime = group.lastTime
                            this.groups[i].msgs = group.msgs
                            return
                        }
                    }
                    // 如果未找到该群则添加到群组中
                    this.groups.push(group)
                } else if (data.msgResCode == "501") {
                    console.log("未找到群错误")
                } else if (data.msgResCode == "502") {
                    console.log("未找到用户错误")
                    // 尝试重新进行注册
                    let actions = {"type": REGISTER, "userName": "匿名用户"};
                    this.websocketsend(JSON.stringify(actions));
                }
            },
            handleRegisterMsg(data) {
                if (data.success && data.userId) {
                    this.userId = data.userId
                    this.$cookies.set(USER_ID, data.userId)
                }
            },
            handleGroupListMsg(data) {
                this.groupActive = 0
                if (data.groups) {
                    this.groups = data.groups
                } else {
                    this.groups = []
                }
            },
            handleCreateGroupMsg(data) {
                if (data.success) {
                    let flag = false
                    for (let i = 0; i < this.groups.length; i++) {
                        if (this.groups[i].name == data.groupName) {
                            flag = true
                        }
                    }
                    if (flag) {
                        console.log("聊天室[" + data.groupName + "]已存在")
                    } else {
                        this.groups.push({
                            name: data.groupName,
                            msgs: []
                        })
                        console.log("添加聊天室[" + data.groupName + "]成功")
                    }
                } else {
                    console.log("添加聊天室[" + data.groupName + "]失败")
                }
            },
            websocketsend(Data) {//数据发送
                this.websock.send(Data);
            },
            websocketclose(e) {  //关闭
                console.log('断开连接', e);
            },
            setGroupActive(index) {
                console.log('点击group事件')
                this.groupActive = index
                this.groupName = this.groups[index].name
            },
            chatRefresh() {
                let div = document.getElementById("chatMain");
                div.scrollTop = div.scrollHeight;
            },
            addGroup() {
                if (this.groupNameAdd) {
                    let actions = {"type": CREATE_GROUP, "groupName": this.groupNameAdd};
                    this.websocketsend(JSON.stringify(actions));
                    this.groupNameAdd = ""
                } else {
                    console.log("添加组名为空")
                }
            },
            sendTextMsg() {
                let actions = {
                    "type": MSG_TEXT,
                    "msg": {
                        "userId": this.userId,
                        "groupName": this.groupName,
                        "content": this.textareaMsg
                    }
                };
                this.websocketsend(JSON.stringify(actions));
                this.textareaMsg = ""
            }
        }
    }
</script>

<style>
    body {
        position: absolute;
        width: 100%;
        height: 100%;
        margin: 0px;
    }

    #app {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #DDDDDD;
    }

    .main {
        position: absolute;
        width: 1000px;
        height: 500px;
        top: 100px;
        left: 0;
        right: 0;
        margin: auto;
        background-color: #FFFFFF;
        border: 1px solid #eaeefb;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .left {
        position: absolute;
        width: 100px;
        top: 0;
        left: 0;
        bottom: 0;
        background-color: #25282c;
        border: 0px;
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
    }

    .chat-logo {
        position: absolute;
        width: 60px;
        border-radius: 5px;
        left: 20px;
        top: 10px;
    }

    .right {
        position: absolute;
        width: 900px;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: #edeae8;
        border: 0px;
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
    }

    .group {
        position: absolute;
        width: 250px;
        top: 0;
        left: 0;
        bottom: 0;
    }

    .chat-main {
        position: absolute;
        width: 650px;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: #ffffff;
        border: 0px;
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
    }

    .text-main {
        position: absolute;
        width: 650px;
        height: 350px;
        top: 0;
        background-color: #f5f5f5;
    }

    .input {
        position: absolute;
        width: 620px;
        height: 150px;
        bottom: 0;
        padding: 0px 15px;
        box-shadow: 1px 0 10px 0 rgba(0, 0, 0, .1);
    }

    .input-utils {
        position: absolute;
        width: 620px;
        height: 40px;
        top: 0;
        /*background-color: #f5f5f5;*/
    }

    .input-text {
        position: absolute;
        width: 620px;
        height: 110px;
        top: 40px;
        /*background-color: cadetblue;*/
    }

    .input-text-send {
        position: absolute;
        width: 50px;
        height: 25px;
        bottom: 5px;
        right: 0;
        cursor: pointer;
        background-color: #f5f5f5;
        border: 1px solid #eaeefb;
    }

    .input-text-send:focus {
        outline-offset: 0px;
        outline: none;
    }

    .input-text-send:hover {
        background-color: #129611;
        color: #FFFFFF;
    }

    .input-text-area {
        position: absolute;
        width: 620px;
        height: 75px;
        top: 0;
        padding: 0px;

        outline-color: invert;
        outline-style: none;
        outline-width: 0px;
        border: none;
        border-style: none;
        text-shadow: none;
        -webkit-appearance: none;
        -webkit-user-select: text;
        outline-color: transparent;
        box-shadow: none;
        resize: none
    }


    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background-color: transparent;
    }

    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
        box-shadow: none;
        -webkit-box-shadow: none;
        border-radius: 0px;
        background-color: transparent;
    }

    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
        background-color: rgba(200, 200, 200, 0.71);
    }

    .chat-header {
        position: absolute;
        width: 650px;
        height: 60px;
        top: 0px;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .1);
    }

    .group-name {
        position: absolute;
        left: 20px;
        bottom: 10px;
        font-size: 20px;
    }

    .group-header {
        position: absolute;
        width: 250px;
        height: 60px;
        top: 0px;
    }

    .group-header-search {
        position: absolute;
        width: 160px;
        height: 20px;
        bottom: 10px;
        left: 20px;
        background-color: #dbd9d8;
        border-radius: 4px;

        outline-color: invert;
        outline-style: none;
        outline-width: 0px;
        border: none;
        border-style: none;
        text-shadow: none;
        -webkit-appearance: none;
        -webkit-user-select: text;
        outline-color: transparent;
        box-shadow: none;
    }

    .group-header-search:focus {
        background-color: #FFFFFF;
        border: 1px solid #dbd9d8;
    }

    .group-header-add {
        position: absolute;
        width: 22px;
        height: 22px;
        right: 20px;
        bottom: 10px;
        font-size: 22px;
        font-weight: 100;
        line-height: 20px;
        text-align: center;
        background-color: #dbd9d8;
        cursor: pointer;
        border-radius: 4px;
    }

    .group-header-add:hover {
        background-color: #d1d1d1;
    }

    .group-items {
        position: absolute;
        width: 242px;
        height: 440px;
        padding-right: 8px;
        top: 60px;
        overflow: hidden;
    }

    .group-items:hover {
        overflow: auto;
        width: 250px;
        padding-right: 0px;
    }

    .chat-main-text {
        position: absolute;
        width: 622px;
        height: 290px;
        bottom: 0px;
        padding-left: 20px;
        padding-right: 8px;
        overflow: hidden;
    }

    .chat-main-text:hover {
        overflow: auto;
        width: 630px;
        padding-right: 0px;
    }
</style>
