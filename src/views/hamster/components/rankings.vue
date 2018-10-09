<template>
  <div class="rank">
    <h3>排行榜</h3>
    <div class="rankData">
      <table>
        <thead>
        <tr>
          <th>昵称</th>
          <th>得分</th>
          <th>排行</th>
          <th>奖励</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in rank">
          <td>{{item.nickname}}</td>
          <td>{{item.use_time}}</td>
          <td>{{item.ranking}}</td>
          <td><a class="exchange">兑换</a></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="userInfo">
      <span class="name">{{userInfo.nickname}}</span>
      <span class="score">{{userInfo.use_time==='null'?0:userInfo.use_time}}</span>
    </div>
    <div class="footer">
      <button class="onceMore" @touchstart="onceMore">再来一局</button>
    </div>
  </div>
</template>

<script>
  import {getUserList} from '../../../api/hamster'
  import {to} from '../../../api/_util'

  export default {
    name: "rankings",
    props: ['step'],
    data() {
      return {
        rank: [],
        userInfo: {},
      }
    },
    methods: {
      onceMore() {
        this.$emit('onceMore', 1)
      }
    },
    watch: {
      'step': function (newVal) {
        if (newVal === 3) {
          getUserList()
            .then((res) => {
              this.rank = res.data || []
            }).catch((err) => {
            console.log(err)
          })
          getUserList(window.localStorage.getItem('hamster_nickname'))
            .then((res) => {
              this.userInfo = res.data[0]
            }).catch((err) => {
            console.log(err)
          })
        }
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
    justify-content:space-between;
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
      flex: 1 1 auto;
      overflow: auto;
      table{
        flex: 1 1 auto;
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
    }
    .userInfo {
      flex: 0 0 auto;
      width:80%;
      padding:0 20px;
      height:50px;
      line-height:50px;
      margin:0 auto;
      overflow: hidden;
      background: rgba(204,204,204,0.4);
      background-size: 100% 100%;
      border-radius: 5px;
      color:#00abfb;
      font-weight: 600;
      .name{
        float:left;
      }
      .score{
        float:right;
      }
    }
    .footer{
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
