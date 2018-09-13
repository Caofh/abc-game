<template>
    <div class="box">
      <div class="begin">
        <mt-button class="begin-button" @click="beginGame">PLAY</mt-button>
      </div>

    </div>
</template>

<script>
  import { Button } from 'mint-ui';
  import Vue from 'vue';
  Vue.component(Button.name, Button);
  export default {
    name: "gameStart",
    methods:{
      beginGame(){
        console.log(this,'this is ')
        this.$router.push('userInfo')
      }
    }
  }
</script>

<style scoped lang="scss">
    .box{
      width: 100%;
      height:100%;
      background: url('../../../../assets/img/hamster/gameStart.jpg') no-repeat;
      background-size: 100% 100%;
      position:relative;
      .begin{
        position:absolute;
        bottom:30px;
        width:100%;
        .begin-button{
          margin:0 auto;
          background: #db9403;
          color:#fff;
        }
      }
    }
</style>
