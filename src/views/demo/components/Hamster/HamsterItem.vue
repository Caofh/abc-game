<template>
  <div class="box">
    <header class="header">
      <div class="go">
        <button class="begin" @click="begin">GO</button>
      </div>
      <div class="score">
        <div>倒计时：{{time}}</div>
        <div>得分：{{score}}</div>
      </div>
    </header>
    <div class="wordImg">
      <img v-show="wordImg" style="width:100px;height:100px;vertical-align: middle" :src='wordImg' alt="单词对应的图片">
    </div>
    <div class="content">
      <div class="hole-box">
        <div>
          <div @click="choseWord(index,word)" v-for="(word,index) in words" class="hole" >
            <div class="hamster" ref="hamster">
              <span class="word">{{word}}</span>
            </div>
            <div class="slice-hole"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<style lang="scss" scoped>
  .box {
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: url('../../../../assets/img/hamster/grassland.png');
  }
  .header{
    overflow: hidden;
    padding:10px;
    .go{
      float: left;
    }
    .score{
      float:right;
      color:#ffc107;
      font-weight: 600;
    }
  }
  .begin{
    width:60px;
    height:40px;
    border-radius:10px;
    background:#ffc107;
    color:#fff;
    font-size: 18px;
    outline: none;
    font-weight: 600;
  }
  .content {
    position: relative;
    flex-grow: 1;
    /*background: url('../../../../assets/img/hamster/grassland.jpg');*/
    background-size: 100% 100%;
  }

  .hole-box {
    position: absolute;
    bottom: 40px;
    text-align: center;
    width: 100%
  }

  .hole {
    float: left;
    width: 100px;
    height: 43px;
    background: url('../../../../assets/img/hamster/hole.png');
    background-size: 100% 100%;
    margin-left: 20px;
    margin-bottom: 40px;
    color: #fff;
    position: relative;
    //overflow: hidden;
    .hamster{
      width:90px;
      height:80px;
      margin:0 auto;
      background:red;
      display: none;
      background: url('../../../../assets/img/hamster/hamster_0.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top:-35px;
      /*transition:top 0.2s;*/
      /*-moz-transition:top 0.2s; !* Firefox 4 *!*/
      /*-webkit-transition:top 0.2s; !* Safari and Chrome *!*/
      /*-o-transition:top 0.2s; !* Opera *!*/
      .word{
        position: absolute;
        width:20px;
        height:20px;
        background:#fff;
        border-radius: 50%;
        top:-20px;
        color:#ffa61f;
      }
    }
    .slice-hole{
      width:100px;
      height:20px;
      background:url('../../../../assets/img/hamster/slice-holes.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      bottom:0;
    }

  }
</style>
<script>
  import { MessageBox } from 'mint-ui';
  //获取随机数
  let random = (n, m) => {
    return Math.random() * (m - n) + n;
  }
  import allWords from './words.json'

  let thisGameWords = [], randomIndex;
  //获取本轮游戏的10个单词
  for (let n = 0; n < 10; n++) {
    randomIndex = Math.floor(random(0,allWords.length-1))
    thisGameWords.push(allWords[randomIndex])
  }

  let initWords = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  let selectWord = ''

  let num=0

  export default {
    name: "HamsterItem",
    data() {
      return {
        //单词对应的图片
        wordImg: '',
        //洞中对应的单词队列
        words: ['', '', '', '', '', '', '', '', ''],
        //倒计时
        time: 20,
        //得分
        score:0,
        holeNum:9
      }
    },
    mounted() {

    },
    methods: {
      //根据单词获取对应的图片
      getImg(word){
        this.wordImg = require(`../../../../assets/img/hamster/${word}.jpeg`)
      },
      gameOver(){
        MessageBox({
          title: 'game over',
          message: `恭喜，你的得分是 ${this.score}，你可以邀请你的小伙伴一起玩，或者查看你的排名哦`,
          showCancelButton: true,
          confirmButtonText:'邀请',
          cancelButtonText:'排行'
        });
      },
      /*
      * 游戏开始
      * 倒计时结束后重置倒计时，开始下一个单词
      * 获取对应的图片
      * 洞中出现字母
      * 是个字母都出现完时结束游戏
      * */
      begin(){
        if(num>9){this.gameOver();return false;}
        this.time=20;
        this.getImg(thisGameWords[num]);
        this.giveWord(thisGameWords[num]);
        num++;
      },
      /*
      * 计算正确的单词每个字母出现的时间
      * */
      // trueWordsTime(word){
      //   //计算每个单词出现的平均时间段
      //   let averageTime = Math.floor(this.time / word.length);
      //   let times = []
      //   for (let i = 0; i < word.length; i++) {
      //     let n,m;
      //     //获取每个单词对应出现的时间段的随机时间
      //     //设置一些边界值，避免正确的字母出现在第一个（还没准备好），最后一个（已经来不及）
      //     n=i===0?1:averageTime * i;
      //     m=i===word.length-1?averageTime * (i+1)-2:averageTime * (i+1);
      //     let timeSection = Math.floor(random(n,m))
      //     times.push({word: word[i], time: timeSection})
      //   }
      //   return times;
      // },
      // giveWord(word) {
      //   console.log(word)
      //   let times = this.trueWordsTime(word);
      //   let n = 0;
      //   console.log(times, 'times is :')
      //   let timer = setInterval(() => {
      //     this.time--
      //     n++;
      //     let isTrueWord = false;
      //     /*
      //     * 如果此时是正确字母应该出现的时间，把正确字母随机地放到洞中
      //     * */
      //     times.forEach((item) => {
      //       if (n === item.time) {
      //         let index = Math.floor(Math.random() * 9);
      //         this.words.splice(index, 1, item.word)
      //         isTrueWord = true;
      //         this.showHamster(index,'block')
      //       }
      //     })
      //     //如果没有出正确的单词，就在随机的洞中出现一个随机的单词
      //     if (!isTrueWord) {
      //       let index = Math.floor(Math.random() * 9);
      //       let wordIndex = Math.floor(Math.random() * 25);
      //       this.words.splice(index, 1, initWords[wordIndex])
      //       this.showHamster(index,'block')
      //     }
      //     //倒计时结束时，清除定时器，开始下一个单词
      //     if (this.time <= 0) {
      //       clearInterval(timer)
      //       //alert('fail')
      //       this.begin();
      //     }
      //   }, 1000)
      // },
      giveWord(word){  //stars

      },
      showHamster(index,style){
        //console.log(this.$refs['hole'][index].style.top,'hole is :========')
        this.$refs['hamster'][index].style.display=style;
      },
      /*
      * 选择正确时，得分，开始下一个单词
      * */
      choseWord(index, word) {
        this.showHamster(index,'none')
        this.words.splice(index, 1, '')
        selectWord += word;
        if (selectWord === thisGameWords[num-1]) {
          this.score++;
          //alert('Congratulations')
          this.begin();
          selectWord =''
        }
      }
    }
  }
</script>

