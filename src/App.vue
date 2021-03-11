<template>
    <div id="app">
        <div class="main">
            <div class="left">
                <img :src="chatImg" class="chat-logo"/>
            </div>
            <div class="right">
                <div class="group">
                    <div class="group-header">
                        <input class="group-header-search" type="text"/>
                        <div class="group-header-add">+</div>
                    </div>
                    <div class="group-items">
                        <GroupItem :initActive="true"></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                        <GroupItem></GroupItem>
                    </div>
                </div>
                <div class="chat-main">
                    <div class="text-main">
                        <div class="chat-header">
                            <div class="group-name">{{groupName}}</div>
                        </div>
                        <div class="chat-main-text">
                            <ChatBubble></ChatBubble>
                            <ChatBubble></ChatBubble>
                            <ChatBubble isRight></ChatBubble>
                            <ChatBubble></ChatBubble>
                            <ChatBubble></ChatBubble>
                            <ChatBubble></ChatBubble>
                            <ChatBubble isRight></ChatBubble>
                            <ChatBubble></ChatBubble>
                            <ChatBubble isRight></ChatBubble>
                            <ChatBubble isRight></ChatBubble>
                        </div>
                    </div>
                    <div class="input">
                        <div class="input-utils"></div>
                        <div class="input-text">
                            <textarea :style="{fontSize:fontSize+'px'}" class="input-text-area"></textarea>
                            <input class="input-text-send" type="button" value="发送"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    import GroupItem from './components/GroupItem.vue'
    import ChatBubble from './components/ChatBubble.vue'


    export default {
        name: 'App',
        data() {
            return {
                chatImg: require("./assets/chat-trans.png"),
                fontSize: 18,
                groupName: "大佬匿名交友群"
            }
        },
        components: {GroupItem, ChatBubble}
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
