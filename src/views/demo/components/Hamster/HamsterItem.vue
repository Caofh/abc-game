<template>
  <div class="box">
    <header class="header">
      <button class="begin" @click="begin">begin</button>
      <img v-show="wordImg" style="width:60px;height:60px;vertical-align: middle" :src='wordImg' alt="单词对应的图片">
      <span>倒计时：{{time}}</span>
      <span>得分：{{score}}</span>
    </header>
    <div class="content">
      <div class="hole-box">
        <div>
          <div @click="choseWord(index,word)" v-for="(word,index) in words" class="hole">
            <span>{{word}}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<style>
  .box {
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  .begin{
    width:60px;
    height:60px;
    border-radius: 50%;
    background:green;
  }
  .content {
    position: relative;
    flex-grow: 1;
    background: url('../../../../assets/img/hamster/grassland.jpg');
    background-size: 100% 100%;
  }

  .hole-box {
    position: absolute;
    bottom: 40px;
    text-align: center;
    width: 100%;
  }

  .hole {
    float: left;
    width: 100px;
    height: 60px;
    background: url('../../../../assets/img/hamster/hole.jpg');
    background-size: 100% 100%;
    margin-left: 20px;
    margin-bottom: 40px;
    color: #fff;

  }
</style>
<script>
  let random = (n, m) => {
    return Math.random() * (m - n) + n;
  }
  import allWords from './words.json'

  let thisGameWords = [], randomIndex;
  for (let n = 0; n < 10; n++) {
    randomIndex = Math.floor(random(0,allWords.length-1))
    thisGameWords.push(allWords[randomIndex])
  }
  let initWords = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  // let time =20
  let selectWord = ''
  let num=0
  export default {
    name: "HamsterItem",
    data() {
      return {
        trueWord: 'sheep',
        wordImg: '',
        words: ['', '', '', '', '', '', '', '', '', ''],
        time: 20,
        score:0
      }
    },
    mounted() {

    },
    methods: {
      getImg(word){
        this.wordImg = require(`../../../../assets/img/hamster/${word}.jpeg`)
      },
      begin(){
        this.time=20;
        console.log(thisGameWords,num,thisGameWords[num],'hahahah')
        this.getImg(thisGameWords[num]);
        this.giveWord(thisGameWords[num]);
        num++;
      },
      giveWord(word) {
        let averageTime = Math.floor(this.time / word.length);
        let times = []
        let n = -1;
        for (let i = 0; i < word.length; i++) {
          let n,m;
          //设置一些边界值，避免正确的字母出现在第一个（还没准备好），最后一个（已经来不及）
          n=i===0?1:averageTime * i;
          m=i===word.length-1?averageTime * (i+1)-2:averageTime * (i+1);
          let timeSection = Math.floor(random(n,m))
          times.push({word: word[i], time: timeSection})
        }
        console.log(times, 'times is :')
        let timer = setInterval(() => {
          this.time--
          n++;
          let isTrueWord = false;
          times.forEach((item) => {
            if (n === item.time) {
              let index = Math.floor(Math.random() * 10);
              //alert(item.word)
              this.words.splice(index, 1, item.word)
              isTrueWord = true;
            }
          })
          if (!isTrueWord) {
            let index = Math.floor(Math.random() * 10);
            let wordIndex = Math.floor(Math.random() * 25);
            this.words.splice(index, 1, initWords[wordIndex])
          }
          if (this.time <= 0) {
            clearInterval(timer)
            this.begin();
          }
        }, 1000)
      },
      choseWord(index, word) {
        this.words.splice(index, 1, '')
        selectWord += word;
        console.log(selectWord,thisGameWords[num-1],num-1,'selectWord')
        if (selectWord === thisGameWords[num-1]) {
          this.score++;
          alert('Congratulations')
          this.begin();
          selectWord =''
        }
      }
    }
  }
</script>

<style scoped>

</style>
