<template>
  <div class="box">
    <div class="userNameBox">
      <div class="userNameTop">

      </div>
      <div class="userNameBottom">
        <div class="userName">
          <label for="userName">Your Name</label>
          <input type="text" id="userName" v-model="username">
        </div>
      </div>
    </div>
    <div class="begin">
      <mt-button :disabled="!username" class="begin-button" @click="beginGame">PLAY</mt-button>
    </div>

  </div>
</template>

<script>
  import {Button} from 'mint-ui';
  import Vue from 'vue';

  Vue.component(Button.name, Button);
  export default {
    name: "gameStart",
    data() {
      return {
        username: ''
      }
    },
    methods: {
      beginGame() {
        console.log(this, 'this is ')
        this.$router.push({name: 'Hamster', params: {username: this.username}})
      }
    }
  }
</script>

<style scoped lang="scss">
  .box {
    width: 100%;
    height: 100%;
    background: url('../../../../assets/img/hamster/gameStart.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    .userNameBox {
      width: 300px;
      max-width: 100%;
      /*height: 150px;*/
      margin: 0 auto;
      /*background: url('../../../../assets/img/hamster/userName.png') no-repeat;*/
      /*background-size: 100% 100%;*/
      /*position: relative;*/
      .userNameTop {
        width: 233px;
        height: 80px;
        background: url('../../../../assets/img/hamster/userNameTop.png') no-repeat;
        background-size: 100% 100%;
        margin: 0 auto;
      }
      .userNameBottom {
        width: 100%;
        height: 70px;
        background: url('../../../../assets/img/hamster/userNameBottom.png') no-repeat;
        background-size: 100% 100%;
        margin-top: -24px;
        position: relative;
      }
      .userName {
        width: 290px;
        margin: 0 auto;
        position: absolute;
        bottom: 10px;
        label {
          background: #db9403;
          display: inline-block;
          width: 80px;
          height: 35px;
          text-align: center;
          line-height: 35px;
          border-radius: 5px 0 0 5px;
          color: #fff;
          margin: 0;
          vertical-align: middle;
          font-size: 14px;
        }
        input {
          width: 120px;
          height: 31px;
          border: 1px solid #db9403;
          border-radius: 0 5px 5px 0;
          font-size: 16px;
          outline: none;
          margin-left: -7px;
          vertical-align: middle;
          padding-left: 5px;
        }
      }
    }
    .begin {
      position: absolute;
      bottom: 30px;
      width: 100%;
      .begin-button {
        margin: 0 auto;
        background: #db9403;
        color: #fff;
      }
    }
  }
</style>
