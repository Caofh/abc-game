<template>
  <div class="rank">
    <h3>排行榜</h3>
    <div class="rankData">
      <table>
        <thead>
        <tr>
          <th>昵称</th>
          <th>得分</th>
          <th>积分</th>
          <th>奖励</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in rank">
          <td>{{item.name}}</td>
          <td>{{item.score}}</td>
          <td>{{item.integral}}</td>
          <td><a class="exchange">兑换</a></td>
        </tr>
        </tbody>
      </table>
    </div>
    <button class="onceMore" @touchstart="onceMore">再来一局</button>
  </div>
</template>

<script>
  export default {
    name: "rankings",
    data() {
      return {
        rank: [
          {name: 'haha', score: 10, integral: 0},
          {name: 'hehe', score: 10, integral: 2},
          {name: 'hehe1', score: 10, integral: 3},
          {name: 'hehe2', score: 10, integral: 4},
          {name: 'hehe3', score: 10, integral: 5},
          {name: 'hehe4', score: 10, integral: 6},
          {name: 'hehe5', score: 10, integral: 7},
          {name: 'hehe6', score: 10, integral: 8},
          {name: 'hehe7', score: 10, integral: 9},
          {name: 'hehe8', score: 10, integral: 10},
          {name: 'hehe9', score: 10, integral: 11},
          {name: 'hehe10', score: 10, integral: 12},
          {name: 'hehe11', score: 10, integral: 13},
          {name: 'hehe12', score: 10, integral: 14},
          {name: 'hehe13', score: 10, integral: 15},
          {name: 'hehe13', score: 10, integral: 15},
          {name: 'hehe13', score: 10, integral: 15},
          {name: 'hehe13', score: 10, integral: 15},
        ]
      }
    },
    methods: {
      onceMore() {
        this.$emit('onceMore',2)
      }
    }
  }
</script>

<style scoped lang="scss">
  .rank {
    width: 100%;
    height: 100%;
    background: url('../../../assets/img/hamster/rank.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    ul, li {
      list-style: none;
    }
    h3 {
      height: 50px;
      padding-top: 30px;
      font-size: 20px;
      margin: 0;
    }
    .rankData {
      height: 500px;
      overflow: auto;
      flex: 0 1 auto;
    }
    table, thead, tbody {
      width: 100%;
    }
    tbody {
      font-size: 16px;
      .exchange {
        display: inline-block;
        padding: 5px;
        background: #ffa61f;
        color: #fff;
        border-radius: 5px;
        font-weight: 600;
      }
    }
    .onceMore {
      width: 80px;
      height: 35px;
      background: #03a9f4;
      border-radius: 10px;
      margin: 20px auto;
      font-weight: 600;
      color: #fff;
      border: none;
      outerline: none;
    }
    /*.rank {*/
    /*width: 100%;*/
    /*height:80%;*/
    /*h3 {*/
    /*height: 30px;*/
    /*line-height: 30px;*/
    /*margin: 0;*/
    /*color: #03a9f4;*/
    /*padding-top: 40px;*/
    /*}*/
    /*.rankData{*/
    /*height:500px;*/
    /*overflow: auto;*/
    /*}*/
    /*table,thead,tbody{*/
    /*width:100%;*/
    /*}*/
    /*tbody {*/
    /*height: 300px;*/
    /*font-size: 16px;*/
    /*.exchange {*/
    /*display: inline-block;*/
    /*padding: 5px;*/
    /*background: #ffa61f;*/
    /*color: #fff;*/
    /*border-radius: 5px;*/
    /*font-weight: 600;*/
    /*}*/
    /*}*/
    /*}*/
  }
</style>
