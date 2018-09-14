<template>
  <div class="box">
    <header class="header">
      <div class="time">倒计时：{{countDown}}</div>
      <div class="score">得分：{{score}}</div>
    </header>
    <div class="selectWord">
      <span>
        {{selectWord}}
      </span>
    </div>
    <div class="wordImg">
      <img v-show="wordImg" style="width:100px;height:100px;vertical-align: middle" :src='wordImg' alt="单词对应的图片">
    </div>
    <div class="content">
      <div class="hole-box">
        <div>
          <div @click="choseWord(index,letter.letter)" v-for="(letter,index) in letters" class="hole">
            <div class="hamster" ref="hamster">
              <span class="word">{{letter.letter}}</span>
            </div>
            <div class="slice-hole"></div>
          </div>
        </div>
      </div>

    </div>
    <div class="footer">
      <div class="go">
        <button class="begin" @click="begin" v-show="!isBegin">GO</button>
        <button class="beging" v-show="isBegin">
          <span></span>
        </button>
      </div>
      <button class="back" @click="back">
      </button>
      <div class="next">
        <button @click="nextWord">next</button>
      </div>
    </div>
    <div class="congratulate" v-show="good">
      <div>good</div>
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

  .header {
    overflow: hidden;
    padding: 10px;
    .score, .time {
      float: right;
      color: #ffc107;
      font-weight: 600;
      font-size: 16px;
    }
    .time {
      float: left;
    }
  }

  .selectWord {
    text-align: center;
    font-weight: 600;
    color: #1389cf;
    font-size: 18px;
    height: 60px;
    line-height: 60px;
  }

  .congratulate {
    position: absolute;
    z-index: 100;
    width: 100px;
    height: 60px;
    background: #ffc107;
    opacity: 0.8;
    top: 30%;
    left: 50%;
    margin-left: -50px;
    color: #fff;
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
    margin-bottom: 20px;
    color: #fff;
    position: relative;

    overflow: hidden;
    .hamster {
      width: 80px;
      height: 70px;
      background: red;
      /*display: block;*/
      background: url('../../../../assets/img/hamster/hamster_2.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left:50%;
      margin-left:-40px;
      top: 20px;
      transition: top 0.2s;
      -moz-transition: top 0.2s; /* Firefox 4 */
      -webkit-transition: top 0.2s; /* Safari and Chrome */
      -o-transition: top 0.2s; /* Opera */
      .word {
        position: absolute;
        width: 20px;
        height: 20px;
        background: #fff;
        border-radius: 50%;
        top: -20px;
        color: #ffa61f;
      }
    }
    .slice-hole {
      width: 100px;
      height: 20px;
      background: url('../../../../assets/img/hamster/slice-holes.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      bottom: 0;
    }

  }

  .footer {
    overflow: hidden;
    padding: 20px;
    button {
      width: 60px;
      height: 40px;
      border-radius: 10px;
      background: #ffc107;
      color: #fff;
      font-size: 18px;
      outline: none;
      font-weight: 600;
      border: none;
      outline: none;
    }
    .go {
      float: left;
      .beging span {
        display: inline-block;
        width: 30px;
        height: 30px;
        background: url('../../../../assets/img/hamster/horn.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .next {
      float: right;
    }
    .back {
      margin: 0 auto;
      width: 40px;
      height: 40px;
      background: url('../../../../assets/img/hamster/back.png');
      background-size: 100% 100%;
      border-radius: 10px;
      vertical-align: middle;
    }
  }
</style>
<script>
  import {MessageBox} from 'mint-ui';
  //获取随机数
  let random = (n, m) => {
    return Math.random() * (m - n) + n;
  }
  import allWords from './words.json'

  let wordLength = allWords.length;
  let trueWord = '';
  // let thisGameWords = [], randomIndex;
  // //获取本轮游戏的10个单词
  // for (let n = 0; n < 10; n++) {
  //   randomIndex = Math.floor(random(0, allWords.length - 1))
  //   thisGameWords.push(allWords[randomIndex])
  // }

  let initWords = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'


  let num = 0
  let giveLetterTimer, hideHamsterTime
  export default {
    name: "HamsterItem",
    data() {
      return {
        //单词对应的图片
        wordImg: '',
        //洞中对应的单词队列
        letters: [{letter: '', showTime: 0}, {letter: '', showTime: 0}, {letter: '', showTime: 0}, {
          letter: '',
          showTime: 0
        }, {letter: '', showTime: 0}, {letter: '', showTime: 0}, {letter: '', showTime: 0}, {
          letter: '',
          showTime: 0
        }, {letter: '', showTime: 0}],
        //倒计时
        time: 180000,
        //得分
        score: 0,
        holeNum: 9,
        good: false,
        isBegin: false,
        selectWord: ''
      }
    },
    computed: {
      countDown() {
        let m = Math.floor(this.time / 1000 / 60),
          s = (this.time - m * 60 * 1000) / 1000;
        return `${m}′${s}″`
      }
    },
    mounted() {

    },
    beforeDestroy() {
      clearTimeout(giveLetterTimer)
      clearTimeout(hideHamsterTime)
    },

    methods: {
      //根据单词获取对应的图片
      getImg(word) {
        this.wordImg = require(`../../../../assets/img/hamster/${word}.jpeg`)
      },
      gameOver() {
        MessageBox({
          title: 'game over',
          message: `恭喜，你的得分是 ${this.score}，你可以邀请你的小伙伴一起玩，或者查看你的排名哦`,
          showCancelButton: true,
          confirmButtonText: '邀请',
          cancelButtonText: '排行'
        });
      },
      /*
      * 游戏开始
      * 获取对应的图片
      * 洞中出现字母
      * */
      begin() {
        this.isBegin = true
        clearInterval(giveLetterTimer)
        clearInterval(hideHamsterTime)
        this.getTrueWord();
        console.log(trueWord, 'trueWord is ')
        this.getImg(trueWord);
        this.giveLetter(trueWord);
        this.hideHamster();
      },
      hideHamster() {
        let len = this.letters.length
        hideHamsterTime = setInterval(() => {
          let i = 0
          for (; i < len; i++) {
            let item = this.letters[i]
            if (item.letter && (Date.now() - item.showTime > 2000)) {
              this.letters.splice(i, 1, {letter: '', showTime: 0})
              this.showHamster(i, false)
              console.log(i, 'index is :======')
              break;
            }
          }
        }, 1500)
      },
      getTrueWord() {
        trueWord = allWords[Math.floor(random(0, wordLength))]
      },
      /*下一个单词*/
      nextWord() {
        this.selectWord = ''
        this.begin()
      },
      back() {
        this.selectWord = this.selectWord.substr(0, this.selectWord.length - 1)
      },
      giveLetter(word) {
        let _this = this;
        setTimeout(() => {
          giveLetterTimer = setInterval(() => {
            let index = Math.floor(random(0, 9))
            let letterIndex = Math.floor(random(0, word.length))
            let letter = word[letterIndex]
            this.letters.splice(index, 1, {letter: letter, showTime: Date.now()})
            if (this.$refs['hamster'][index].style.top === '-35px') {
              this.showHamster(index, false)
              setTimeout(() => {
                this.showHamster(index, true)
              }, 300)

            } else {
              this.showHamster(index, true)
            }
            this.time -= 1000
            if (this.time <= 0) {
              clearInterval(giveLetterTimer)
              this.gameOver()
            }
          }, 1000)
        }, 500)
      },
      showHamster(index, isShow) {
        this.$refs['hamster'][index].style.top = isShow ? '-35px' : '20px';
      },
      /*
      * 选择正确时，得分，开始下一个单词
      * */
      choseWord(index, letter) {
        this.showHamster(index, false)
        this.letters.splice(index, 1, {letter: '', showTime: 0})
        this.selectWord += letter
        console.log(this.selectWord, 'selectWord')
        if (this.selectWord === trueWord) {
          this.score++
          this.selectWord = ''
          this.good = true
          let time = setTimeout(() => {
            this.good = false
            clearTimeout(time)
            this.begin()
          }, 1000)
        }
      }
    }
  }
</script>

