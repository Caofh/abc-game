<template>
  <div class="box">
    <header class="header">
      <div class="timeAndScore">
        <div class="time">倒计时：{{countDown}}</div>
        <div class="score">得分：{{score}}</div>
      </div>
      <div class="bgMusic bgMusicAnimate" @touchstart="togglePlay" ref="bgMusicBox" id="bgMusicBox">
        <audio loop  ref="bgMusic">
          <source src="../../../assets/music/hamster.mp3" >
          您的浏览器不支持 audio 元素。
        </audio>
      </div>
    </header>
    <div class="selectWord">
      <span>
        {{selectWord}}
      </span>
    </div>
    <div class="wordImg" v-for="(word,index) in wordsList" v-show="showIndex===index">
      <img :src='word.imgUrl' alt="单词对应的图片">
      <audio hidden :id="`${word.word}${index}`" controls >
        <source :src="word.pronunciation">
        您的浏览器不支持 audio 元素。
      </audio>
    </div>
    <div class="content">
      <div class="hole-box">
        <div class="first-row">
          <div @touchstart="choseWord(index,letter.letter)" v-for="(letter,index) in letters" class="hole"
               v-if="index===0||index===1||index===2">
            <div class="hole-img"></div>
            <div class="slice-hole-img"></div>
            <div class="hamster" ref="hamster">
              <span class="word">{{letter.letter}}</span>
            </div>
          </div>
        </div>
        <div class="two-row">
          <div v-if="index===3||index===4||index===5" @touchstart="choseWord(index,letter.letter)"
               v-for="(letter,index) in letters" class="hole">
            <div class="hole-img"></div>
            <div class="slice-hole-img"></div>
            <div class="hamster" ref="hamster">
              <span class="word" v-show="letter.letter">{{letter.letter}}</span>
            </div>
          </div>
        </div>
        <div class="three-row">
          <div v-if="index===6||index===7||index===8" @touchstart="choseWord(index,letter.letter)"
               v-for="(letter,index) in letters" class="hole">
            <div class="hole-img"></div>
            <div class="slice-hole-img"></div>
            <div class="hamster" ref="hamster">
              <span class="word" v-show="letter.letter">
                {{letter.letter}}
                <i></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="back">
        <button @touchstart="back"></button>
      </div>
      <div class="next">
        <button @touchstart="nextWord">next</button>
      </div>
    </div>
    <div class="congratulate" v-show="good">
      <div>good</div>
    </div>
    <div class="gameOver" v-show="isGameOver">
      <p class="score">
        得分:{{score}}
      </p>
      <div class="buttonBox">
        <button class="onceMore" @touchstart="onceMore"></button>
        <button class="rank" @touchstart="goToRank"></button>
      </div>
    </div>
    <div class="go" v-show="!isBegin">
       <button @touchstart="begin"></button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .box {
    width: 100%;
    height: 100%;
    background: url('../../../assets/img/hamster/grassland.png');
    background-size: cover;
    position: relative;
    .header {
      width: 100%;
      overflow: hidden;
      color: #ffa61f;
      font-weight: 600;
      padding: 10px;
      box-sizing: border-box;
      .timeAndScore{
        float:left;
      }
      .bgMusic{
        position: relative;
        z-index:3;
        float: right;
        width:30px;
        height:30px;
        border-radius: 50%;
        background:url('../../../assets/img/hamster/music.png') no-repeat;
        background-size: cover;
      }
      .bgMusicAnimate{
        animation:mymove 3s infinite linear;
        -webkit-animation:mymove 3s infinite linear; /*Safari and Chrome*/
      }
      @keyframes mymove
      {
        from {
          -webkit-transform: rotate(0deg);
        }
        to {
          -webkit-transform: rotate(360deg);
        }
      }

      @-webkit-keyframes mymove /*Safari and Chrome*/
      {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
    .selectWord {
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      color: #1389cf;
      font-weight: 600;
      text-align: center;
    }
    .wordImg {
      width: 100%;
      height: 100px;
      text-align: center;
      img {
        width: 100px;
        height: 100px;
      }
    }
    .content {
      position: absolute;
      top: 180px;
      left: 0;
      right: 0;
      bottom: 60px;
      .hole-box {
        position: absolute;
        bottom: 20px;
        width: 100%;
        .first-row, .two-row, .three-row {
          display: flex;
          display: -webkit-flex;
          justify-content: space-around;
        }
        .hole {
          width: 70px;
          height: 85px;
          position: relative;
          overflow: hidden;
          .hole-img {
            width: 100%;
            height: 40px;
            background: url('../../../assets/img/hamster/hole.png');
            background-size: 100% 100%;
            position: absolute;
            bottom: 0;
          }
          .slice-hole-img {
            width: 100%;
            height: 20px;
            background: url('../../../assets/img/hamster/slice-holes.png');
            background-size: 100% 100%;
            position: absolute;
            bottom: 0;
            z-index: 1;
          }
          .hamster {
            width: 50px;
            height: 50px;
            background: url('../../../assets/img/hamster/hamster_2.png');
            background-size: 100% 100%;
            position: absolute;
            left: 50%;
            margin-left: -25px;
            top: 120px;
            transition: top 0.2s;
            -moz-transition: top .2s; /* Firefox 4 */
            -webkit-transition: top .2s; /* Safari 和 Chrome */
            -o-transition: top .2s; /* Opera */
            .word {
              position: absolute;
              width: 40px;
              height: 25px;
              text-align: center;
              background: url('../../../assets/img/hamster/wordbg.png');
              background-size: 100% 100%;
              top: -25px;
              left: 15px;
              transform: rotate(15deg);
              color: #007aff;
              font-weight: 600;
            }
          }
        }
      }
    }
    .footer {
      box-sizing: border-box;
      width: 100%;
      height: 60px;
      position: absolute;
      bottom: 0;
      padding: 10px;
      .next {
        float: right;
      }
      .back{
        float: left;
      }
      .next button {
        padding:8px;
        background: #ffa61f;
        border-radius: 5px;
        color: #fff;
        border: none;
        font-size: 16px;
        outline: none;
        font-weight: 600;
        text-align: center;
      }
      .back button {
        margin: 0 auto;
        width: 35px;
        height: 35px;
        background: url('../../../assets/img/hamster/back.png');
        background-size: 100% 100%;
        border: none;
        outline: none;
      }
    }
    .gameOver {
      position: absolute;
      width: 220px;
      height: 300px;
      top: 40%;
      left: 50%;
      margin-top: -150px;
      margin-left: -100px;
      /*background: #d8d8d8;*/
      background: url('../../../assets/img/hamster/dialog.png') no-repeat;
      background-size: 100% 100%;
      z-index: 100;
      .score {
        width: 100px;
        padding: 0;
        color: #9b6412;
        font-size: 16px;
        font-weight: 600;
        position: absolute;
        left: 50%;
        margin: 0 0 0 -50px;
        bottom: 75px;
      }
      .buttonBox {
        position: absolute;
        width: 110px;
        bottom: 20px;
        left: 50%;
        margin-left: -55px;
        button {
          border: none;
          outline: none;
          width: 30px;
          height: 30px;
        }
        .onceMore {
          background: url('../../../assets/img/hamster/onceMore.png') no-repeat;
          background-size: 100% 100%;
          margin-right: 10px;
        }
        .rank {
          background: url('../../../assets/img/hamster/rankBtn.png') no-repeat;
          background-size: 100% 100%;
          margin-left: 10px;
        }
      }
    }
    .go{
      position: absolute;
      top:0;
      left:0;
      bottom:0;
      right:0;
      z-index:2;
      button{
        position: absolute;
        width:80px;
        height:80px;
        background: url('../../../assets/img/hamster/go.png') no-repeat;
        background-size: 100% 100%;
        border-radius: 50%;
        top:50%;
        left:50%;
        margin-left:-40px;
        margin-top:-40px;
        border: none;
        outline: none;
      }
    }
  }
</style>
<script>
  //获取随机数
  let random = (n, m) => {
    return Math.random() * (m - n) + n;
  }
  import allWords from './words.json'

  let wordLength = allWords.length;

  let trueWordObj = {};

  let giveLetterTimer, hideHamsterTime;

  let time = 1 * 60 * 1000;

  let wordAudio;
  export default {
    name: "HamsterItem",
    props:['trueWordPronunciation','trueWordImgUrl','step'],
    data() {
      return {
        //洞中对应的单词队列
        letters: [{letter: 'a', showTime: 0}, {letter: 'b', showTime: 0}, {letter: 'c', showTime: 0}, {
          letter: 'd',
          showTime: 0
        }, {letter: 'e', showTime: 0}, {letter: 'f', showTime: 0}, {letter: 'g', showTime: 0}, {
          letter: 'h',
          showTime: 0
        }, {letter: 'i', showTime: 0}],
        //倒计时
        time: time,
        //得分
        score: 0,
        holeNum: 9,
        good: false,
        isBegin: false,
        selectWord: '',
        isGameOver: false,
        wordsList:[],
        showIndex:-1
      }
    },
    computed: {
      countDown() {
        let m = Math.floor(this.time / 1000 / 60),
          s = (this.time - m * 60 * 1000) / 1000;
        return `${m}′${s}″`
      }
    },
    watch:{
      'step':function (newVal) {
        if(newVal===2){
          let bgMusic=this.$refs['bgMusic'];
          bgMusic.play();
        }
      }
    },
    mounted() {
      console.log('哈哈哈')
      wordAudio=this.$refs['audio']
      this.isGameOver=false;
      this.getTrueWord(10);
    },
    beforeDestroy() {
      clearTimeout(giveLetterTimer)
      clearTimeout(hideHamsterTime)
    },

    methods: {
      togglePlay(e){
        let bgMusic=this.$refs['bgMusic'];
        let bgMusicBox=this.$refs['bgMusicBox'];
        if(bgMusic.paused){
          bgMusic.play();
          bgMusicBox.classList.add('bgMusicAnimate')
        }else{
          bgMusic.pause();
          bgMusicBox.classList.remove('bgMusicAnimate')
        }
      },
      playAudioSource(index,showWord){
        console.log(`${showWord.word}${index}`)
        document.querySelector(`#${showWord.word}${index}`).play();

      },
      gameOver() {
        this.isGameOver = true;
        this.isBegin = false;
        this.wordImg = '';
      },
      goToRank() {
        this.$emit('rank',3)
      },
      /*
      * 游戏开始
      * 获取对应的图片
      * 洞中出现字母
      * */
      begin() {
        this.isBegin = true
        if(this.showIndex%5===0){
          this.getTrueWord(5,true)
        }
        this.showIndex+=1
        let showWord=this.wordsList[this.showIndex]
        clearInterval(giveLetterTimer)
        clearInterval(hideHamsterTime)
        this.playAudioSource(this.showIndex,showWord)
        this.giveLetter(showWord)
        this.hideHamster();
      },
      hideHamster() {
        let len = this.letters.length
        hideHamsterTime = setInterval(() => {
          let i = 0
          for (; i < len; i++) {
            let item = this.letters[i]
            if (item.letter && item.showTime && (Date.now() - item.showTime > 2000)) {
              this.letters.splice(i, 1, {letter: '', showTime: 0})
              this.toggleHamster(i, false)
            }
          }
        }, 1500)
      },
      getTrueWord(len) {
        let word;
        for(let i=0;i<len;i++){
          word=allWords[Math.floor(random(0, wordLength))]
          word.imgUrl=require(`../../../assets/img/hamster/${word.word}.jpeg`)
          word.pronunciation=require(`../../../assets/pronunciation/${word.word}.mp3`)
          this.wordsList.push(word)
        }
      },
      /*下一个单词*/
      nextWord() {
        console.log(this.isBegin,'isBegin is ')
        if(this.isBegin){
          this.selectWord = ''
          this.begin()
        }
      },
      back() {
        this.selectWord = this.selectWord.substr(0, this.selectWord.length - 1)
      },
      giveLetter(trueWordObj) {
        let word = trueWordObj.word;
        setTimeout(() => {
          giveLetterTimer = setInterval(() => {
            let index = Math.floor(random(0, 9))
            let letterIndex = Math.floor(random(0, word.length))
            let letter = word[letterIndex]
            this.letters.splice(index, 1, {letter: letter, showTime: Date.now()})
            if (this.$refs['hamster'][index].style.top === '25px') {
              this.toggleHamster(index, false)
              setTimeout(() => {
                this.toggleHamster(index, true)
              }, 400)

            } else {
              this.toggleHamster(index, true)
            }
            this.time -= 1000
            if (this.time <= 0) {
              clearInterval(giveLetterTimer)
              this.gameOver()
            }
          }, 500)
        }, 500)
      },
      toggleHamster(index, isShow) {
        this.$refs['hamster'][index].style.top = isShow ? '25px' : '120px';
      },
      /*
      * 选择正确时，得分，开始下一个单词
      * */
      choseWord(index, letter) {
        if (!this.isBegin) {
          return false;
        }
        this.toggleHamster(index, false)
        this.letters.splice(index, 1, {letter: '', showTime: 0})
        this.selectWord += letter
        console.log(this.selectWord, 'selectWord')
        if (this.selectWord === trueWordObj.word) {
          this.score++
          this.nextWord();
          this.good = true
          let time = setTimeout(() => {
            this.good = false
            clearTimeout(time)
          }, 1000)
        }
      },
      onceMore() {
        this.isGameOver = false;
        this.time = time;
        this.selectWord = '';
        this.score = 0;
      }
    }

  }
</script>

