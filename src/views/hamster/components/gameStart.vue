<template>
  <div class="box">
    <div class="userNameBox">
      <div class="userNameTop">

      </div>
      <div class="userNameBottom">
        <div class="userName">
          <div v-if="!nickname">
            <!--<label for="userName">Your Name</label>-->
            <input type="text" id="userName" v-model="username" @input="checkUserName">
            <button :disabled="!username" class="beginButton" @touchstart="go">GO</button>
            <span v-show="username && userNameExist" class="tip"></span>
          </div>
          <div v-else>
            <button class="ranking" @touchstart="ranking"></button>
            <button class="playButton" @touchstart="play">PLAY</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {addUser, getUserList} from "../../../api/hamster"
  import {to} from '../../../api/_util'

  export default {
    name: "gameStart",
    props:['step'],
    data() {
      return {
        nickname: '',
        username: '',
        userNameExist:false,
      }
    },
    watch: {
      'step': function (newVal) {
        if (newVal === 1) {
          this.nickname = window.localStorage.getItem('hamster_nickname')
        }
      }
    },
    methods: {
      async go() {
        let [err, res] = await to(addUser({nickname: this.username}))
        if (err) {
          alert(`addUser接口请求失败${err}`)
          return false;
        }
        window.localStorage.setItem('hamster_nickname', this.username)
        this.$emit('play', 2)
      },
      play() {
        this.$emit('play', 2)
      },
      ranking() {
        this.$emit('play', 3)
      },
      async checkUserName() {
        let [err, res] = await to(getUserList(this.username))
        if (err) {
          console.log('请求用户列表失败')
          return false;
        }
        console.log(JSON.stringify(res.data),'data')
        if (res.data && res.data.length) {
          this.userNameExist = true
        }else{
          this.userNameExist =false
        }
      }
    },
    mounted() {
      this.nickname = window.localStorage.getItem('hamster_nickname')
      // if(this.nickname){
      //   this.$emit('play', 2)
      // }
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
        /*label {*/
          /*background: #db9403;*/
          /*display: inline-block;*/
          /*width: 80px;*/
          /*height: 35px;*/
          /*text-align: center;*/
          /*line-height: 35px;*/
          /*border-radius: 5px 0 0 5px;*/
          /*color: #fff;*/
          /*margin: 0;*/
          /*vertical-align: middle;*/
          /*font-size: 14px;*/
        /*}*/
        input {
          width:150px;
          height: 34px;
          border: 1px solid #db9403;
          border-radius:5px 0 0 5px;
          font-size: 16px;
          outline: none;
          vertical-align: middle;
          padding: 0 0 0 5px;
        }
        .tip{
          display: inline-block;
          width:30px;
          height:30px;
          background: url('../../../assets/img/hamster/fail.png') no-repeat;
          background-size: 100% 100%;
          vertical-align: middle;
        }
      }
    }
    .beginButton, .playButton {
      background: #db9403;
      color: #fff;
      padding: 9px;
      border: 0;
      border-radius:0 5px 5px 0;
      outline: none;
      font-weight: 600;
      font-size: 16px;
      vertical-align: bottom;
      margin-left:-7px;
    }
    .playButton {
      border-radius: 5px;
      margin-top:5px;
    }
    .ranking {
      width: 35px;
      height: 35px;
      background: url('../../../assets/img/hamster/ranking.png') no-repeat;
      background-size: 100% 100%;
      border: none;
      outline: none;
      vertical-align: middle;
      margin-right: 20px;
      -webkit-animationn: rankingAni 2s infinite;
      -moz-animation: rankingAni 2s infinite;
      -o-animation: rankingAni 2s infinite;
      animation: rankingAni 2s infinite;
      -webkit-transform-origin: center center;
      transform-origin: center center;
    }
    @keyframes rankingAni {
      0% {
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
      }

    }

  }
</style>
