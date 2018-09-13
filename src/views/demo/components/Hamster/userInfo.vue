<template>
    <div class="box">
      <div class="userInfo">
        <label class="userName" for="userName">Your Name</label>
        <input class="userNameInput" type="text" id="userName" v-model="username">
        <div>
          <button class="start" @click="start">START</button>
        </div>

      </div>
    </div>
</template>

<script>
  import { Field } from 'mint-ui';
  import Vue from 'vue';
  Vue.component(Field.name, Field);
  export default {
    name: "userInfo",
    data(){
      return {
        username:'sdfsdf'
      }
    },
    methods:{
      start(){
        this.$router.push('hamster')
      }
    }
  }
</script>

<style scoped lang="scss">
  .box{
    width: 100%;
    height:100%;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    .userInfo{
      .userName{
        background: #ffc107;
        display: inline-block;
        width:100px;
        height:50px;
        text-align: center;
        line-height: 50px;
        border-radius: 5px 0 0 5px;
        color:#fff;
        margin:0;
        vertical-align: middle;
      }
      .userNameInput{
        width:200px;
        height:46px;
        border:1px solid  #ffc107;
        border-radius: 0 5px 5px 0;
        font-size: 16px;
        outline:none;
        margin-left:-7px;
        vertical-align: middle;
        padding-left:5px;
      }
      .start{
        margin-top:30px;
        width:70px;
        height:70px;
        border-radius: 50%;
        background: #ffc107;
        border:none;
        outline: none;
        color:#fff;
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
</style>
