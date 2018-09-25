<template>
  <div class="box">
    <div class="userNameBox">
      <div class="userNameTop">

      </div>
      <div class="userNameBottom">
        <div class="userName">
          <label for="userName">Your Name</label>
          <input type="text" id="userName" v-model="username">
          <button :disabled="!username" class="begin-button" @touchstart="play">PLAY</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "gameStart",
    data() {
      return {
        username: ''
      }
    },
    methods: {
      play() {
        this.$emit('play',2)
      }
    }
  }
</script>

<style scoped lang="scss">
  .box {
    width: 100%;
    height: 100%;
    background: url('../../../assets/img/hamster/gameStart.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    .userNameBox {
      width: 300px;
      max-width: 100%;
      /*height: 150px;*/
      margin: 0 auto;
      /*background: url('../../../../assets/img/demo/userName.png') no-repeat;*/
      /*background-size: 100% 100%;*/
      /*position: relative;*/
      .userNameTop {
        width: 233px;
        height: 80px;
        background: url('../../../assets/img/hamster/userNameTop.png') no-repeat;
        background-size: 100% 100%;
        margin: 0 auto;
      }
      .userNameBottom {
        width: 100%;
        height: 70px;
        background: url('../../../assets/img/hamster/userNameBottom.png') no-repeat;
        background-size: 100% 100%;
        margin-top: -24px;
        position: relative;
      }
      .userName {
        width: 100%;
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
          width: 100px;
          height: 33px;
          border: 1px solid #db9403;
          border-radius: 0 5px 5px 0;
          font-size: 16px;
          outline: none;
          margin-left: -7px;
          vertical-align: middle;
          padding:0 0 0 5px;
        }
      }
    }
    .begin-button {
      background: #db9403;
      color: #fff;
      padding: 10px;
      border:0;
      border-radius: 50%;
      outline: none;
    }
  }
</style>
