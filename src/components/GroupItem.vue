<template>
    <div :class="{'group-item':true,'group-item-active':active}">
        <div class="group-item-icon">
            <img :src="chatImg" class="group-item-img"/>
        </div>
        <div class="group-item-left">
            <div class="group-item-name">大佬匿名交友群</div>
            <div class="group-item-last-msg">假期：哈哈哈哈哈哈哈哈嗝~~~</div>
        </div>
        <div class="group-item-right">
            <div class="group-item-time">18:00</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GroupItem",
        props: {
            initActive: Boolean
        },
        data() {
            return {
                chatImg: require("../assets/chat.png"),
                active: this.initActive
            }
        }
    }
</script>

<style scoped>
    .group-item {
        position: relative;
        width: 242px;
        height: 50px;
        padding-right: 8px;
    }

    .group-item:hover:not(.group-item-active) {
        background-color: #dbd9d9;
    }

    .group-item-active {
        background-color: #c6c6c6;
    }

    .group-item-left {
        position: relative;
        width: 150px;
        height: 50px;
        display: inline-block;
    }

    .group-item-right {
        position: relative;
        width: 42px;
        height: 50px;
        display: inline-block;
    }

    .group-item-time {
        position: absolute;
        top: 0;
        font-size: 14px;
        color: #999999;
        cursor: default;
    }

    .group-item-name {
        position: absolute;
        width: 140px;
        top: 5px;
        left: 10px;
        font-size: 16px;
        overflow: hidden; /*溢出隐藏*/
        text-overflow: ellipsis; /*以省略号...显示*/
        white-space: nowrap; /*强制不换行*/
        cursor: default;
    }

    .group-item-last-msg {
        position: absolute;
        width: 140px;
        bottom: 5px;
        left: 10px;
        font-size: 14px;
        color: #999999;
        overflow: hidden; /*溢出隐藏*/
        text-overflow: ellipsis; /*以省略号...显示*/
        white-space: nowrap; /*强制不换行*/
        cursor: default;
    }

    .group-item-icon {
        position: relative;
        width: 50px;
        height: 50px;
        display: inline-block;
    }

    .group-item-img {
        position: absolute;
        width: 40px;
        height: 40px;
        top: 5px;
        left: 10px;
        background-size: 40px 40px;
        border-radius: 4px;
    }
</style>
