<template>
  <div class="box">
    <gameStart @play="play" v-show="step===1"></gameStart>
    <hamsterItem @rank="play" v-show="step===2" :bgMusic="bgMusic"></hamsterItem>
    <rankings @onceMore="play" v-show="step===3"></rankings>
  </div>
</template>

<script>
  import gameStart from './gameStart'
  import rankings from './rankings'
  import hamsterItem from './hamsterItem'

  export default {
    name: "hamster",
    components: {gameStart, rankings, hamsterItem},
    data() {
      return {
        step: 1,
        bgMusic:require('../../../assets/music/hamster.mp3')
      }
    },
    methods:{
      play(step){
        console.log(step,'step is :=========')
        this.step=step;
      }
    }
  }
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100%;
  }
</style>
