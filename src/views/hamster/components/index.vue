<template>
  <div class="box">
    <gameStart @play="play" v-show="step===1"></gameStart>
    <hamsterItem @rank="play" v-show="step===2"  :step="step"></hamsterItem>
    <rankings @onceMore="play" v-show="step===3"></rankings>
  </div>
</template>

<script>
  import gameStart from './gameStart'
  import rankings from './rankings'
  import hamsterItem from './hamsterItem'
  import allWords from './words.json'
  let trueWordObj
  let random = (n, m) => {
    return Math.random() * (m - n) + n;
  }
  export default {
    name: "hamster",
    components: {gameStart, rankings, hamsterItem},
    data() {
      return {
        step: 1,
      }
    },
    methods: {
      play(step) {
        this.step = step;
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
