<template>
  <div class="wrapper">
    <Controls
      :words="words"
      :round="round"
      :level="level"
      @changeWord="changeWord"
      @changeRound="changeRound"
      @changeLevel="changeLevel"
    />
    <RoundStatistic
      :roundModalActive="roundModalActive"
      :statistic="statistic"
      @closeModal="closeModal()"
    />
    <v-card class="content" v-if="!loading" :elevation="0">
      <Header v-if="!startGame" />
      <v-card :elevation="0" class="card rounded-t-xl transparent">
        <v-card :elevation="20" class="game" v-if="startGame">
          <StatusBar :streak="streak" :score="score" />
          <TextContent
            :exampleData="exampleData"
            :countWords="countWords"
            :sourceData="sourceData"
          />

          <div class="controls" v-if="startGame">
            <v-btn
              class="answer-btn"
              width="200px"
              v-on:click="checkAnswer(true)"
              :disabled="buttonActivity"
              large
              color="green darken-1"
              ><v-icon dark large>mdi-arrow-left-bold-box</v-icon>Верно</v-btn
            >
            <v-btn
              class="answer-btn"
              width="200px"
              v-on:click="checkAnswer(false)"
              :disabled="buttonActivity"
              large
              color="red darken-4"
              >Не Верно <v-icon dark large>mdi-arrow-right-bold-box</v-icon></v-btn
            >
          </div>
          <div class="timer">
            <v-progress-linear :value="timer" color="amber" height="20px"></v-progress-linear>
          </div>
        </v-card>
        <v-btn @click="gameStarted()" v-else width="200px" large color="blue">Начать</v-btn>
      </v-card>
      <v-btn width="200px" @click="checkAnswer()" large color="blue" class="next-btn hide"
        ><v-icon class="next-btn__icon" dark large>mdi-keyboard-space</v-icon>Дальше</v-btn
      >
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Controls from "./Controls.vue";
import Header from "./Header.vue";
import StatusBar from "./StatusBar.vue";
import TextContent from "./TextContent.vue";
import RoundStatistic from "./RoundStatistic.vue";

export default {
  data() {
    return {
      startGame: false,
      sourceData: [],
      exampleData: [],
      loading: true,
      countWords: 0,
      timer: 0,
      score: 0,
      streak: { count: 0, seriesCorrectAnswer: 0 },
      buttonActivity: false,
      interval: "",
      words: localStorage.getItem("SprintSettings")
        ? JSON.parse(localStorage.getItem("SprintSettings")).words
        : false,
      round: localStorage.getItem("SprintSettings")
        ? JSON.parse(localStorage.getItem("SprintSettings")).round
        : 0,
      level: localStorage.getItem("SprintSettings")
        ? JSON.parse(localStorage.getItem("SprintSettings")).level
        : 0,
      statistic: { correct: 0, wrong: 0, streak: 0 },
      roundModalActive: false,
    };
  },
  components: {
    Controls,
    Header,
    StatusBar,
    TextContent,
    RoundStatistic,
  },
  async mounted() {
    this.setLoading(true);
    this.getData();
    this.setLoading(false);
  },
  destroyed() {
    document.removeEventListener("keyup", this.keyControl, false);
    clearInterval(this.interval);
  },
  methods: {
    ...mapActions(["getLearnedWordsSortByRepeatDate", "addAnswerResult", "setLoading"]),
    changeWord(x) {
      this.words = x;
      this.timerBtnVisibility(true);
      this.getData();
      document.removeEventListener("keyup", this.keyControl, false);
    },
    changeRound(x) {
      this.round = x;
      this.loading = true;
      this.getData();
      document.removeEventListener("keyup", this.keyControl, false);
    },
    changeLevel(x) {
      this.level = x;
      this.loading = true;
      this.getData();
      document.removeEventListener("keyup", this.keyControl, false);
    },
    async getData() {
      function getRandom() {
        return Math.round(Math.random() * 19);
      }
      const learnedWords = await this.getLearnedWordsSortByRepeatDate({});
      if (this.words && learnedWords.success && learnedWords.result.length > 19) {
        this.sourceData = learnedWords.result.slice(0, 20);
        this.exampleData = learnedWords.result.map((el) => {
          return Math.random() > 0.5
            ? el.wordTranslate
            : learnedWords.result[getRandom()].wordTranslate;
        });
        this.loading = false;
      } else {
        const res = await fetch(
          `https://afternoon-falls-25894.herokuapp.com/words?page=${this.round}&group=${this.level}`
        );
        const data = await res.json();
        this.sourceData = data;
        this.exampleData = data.map((el) => {
          return Math.random() > 0.5 ? el.wordTranslate : data[getRandom()].wordTranslate;
        });
      }
      clearInterval(this.interval);
      this.startGame = false;
      this.countWords = 0;
      this.score = 0;
      this.streak = { count: 0, seriesCorrectAnswer: 0 };
      this.loading = false;
    },
    keyControl(e) {
      if (e.code === "Space") {
        this.checkAnswer();
      } else if (e.code === "ArrowRight") {
        this.checkAnswer(false);
      } else if (e.code === "ArrowLeft") {
        this.checkAnswer(true);
      }
    },
    gameStarted() {
      this.timer = 0;
      this.timerBtnVisibility(true);
      this.startGame = true;
      this.interval = setInterval(() => {
        this.timer += 5;
        if (this.timer === 100) {
          clearInterval(this.interval);
          this.timerBtnVisibility(false);
        }
      }, 1000);

      document.addEventListener("keyup", this.keyControl);
    },
    timerBtnVisibility(x) {
      if (x === true) {
        this.buttonActivity = false;
        document.querySelector(".next-btn").classList.add("hide");
        document.querySelector(".next-btn").disabled = true;
      } else {
        this.buttonActivity = true;
        document.querySelector(".next-btn").classList.remove("hide");
        document.querySelector(".next-btn").disabled = false;
      }
    },
    checkAnswer(x) {
      let answerId = this.words
        ? this.sourceData[this.countWords]._id
        : this.sourceData[this.countWords].id;
      if (!answerId) {
        answerId = this.sourceData[this.countWords].id;
      }
      const answer =
        document.querySelector(".word-translate").textContent.trim() ===
        this.sourceData[this.countWords].wordTranslate;
      if (x) {
        if (answer) {
          this.streakCount();
          this.score += 10 * (this.streak.count + 1);
          this.changeStatistic(true);
          this.addAnswerResult({
            wordId: answerId,
            isCorrectAnswer: true,
          });
        } else {
          this.streak = { count: 0, seriesCorrectAnswer: 0 };
          this.changeStatistic(false);
          this.addAnswerResult({
            wordId: answerId,
            isCorrectAnswer: false,
          });
        }
      } else if (x === false) {
        if (!answer) {
          this.streakCount();
          this.score += 10 + 10 * (this.streak.count + 1);
          this.changeStatistic(true);
          this.addAnswerResult({
            wordId: answerId,
            isCorrectAnswer: true,
          });
        } else {
          this.streak = { count: 0, seriesCorrectAnswer: 0 };
          this.changeStatistic(false);
          this.addAnswerResult({
            wordId: answerId,
            isCorrectAnswer: false,
          });
        }
      } else {
        this.streak = { count: 0, seriesCorrectAnswer: 0 };
        this.changeStatistic(false);
        this.addAnswerResult({
          wordId: answerId,
          isCorrectAnswer: false,
        });
      }
      clearInterval(this.interval);
      this.hideText();
      this.timerBtnVisibility(true);
      if (this.countWords !== 19) {
        this.countWords += 1;
        document.removeEventListener("keyup", this.keyControl, false);
        this.gameStarted();
      } else {
        this.sendLocalStatistic();
        this.roundModalActive = true;
        this.startGame = false;
        this.countWords = 0;
        this.score = 0;
        this.streak = { count: 0, seriesCorrectAnswer: 0 };
      }
    },
    streakCount() {
      this.streak.seriesCorrectAnswer += 1;
      if (this.streak.seriesCorrectAnswer % 4 === 0 && this.streak.seriesCorrectAnswer !== 0) {
        this.streak.count += 1;
      }
    },
    hideText() {
      document.querySelector(".text-example").classList.add("hide");
    },
    changeStatistic(x) {
      if (x === true) {
        this.statistic.correct += 1;
      } else {
        this.statistic.wrong += 1;
      }

      if (this.statistic.streak < this.streak.seriesCorrectAnswer) {
        this.statistic.streak = this.streak.seriesCorrectAnswer;
      }
    },
    closeModal() {
      this.roundModalActive = false;
      this.statistic = { correct: 0, wrong: 0, streak: 0 };
    },
    sendLocalStatistic() {
      const date = `${new Date().getDay()}.${new Date().getMonth()}.${new Date().getFullYear()}`;
      this.statistic.date = date;
      if (localStorage.getItem("SprintStatistic")) {
        const stat = JSON.parse(localStorage.getItem("SprintStatistic"));
        this.statistic.id = stat.length;
        stat.push(this.statistic);
        localStorage.setItem("SprintStatistic", JSON.stringify(stat));
      } else {
        this.statistic.id = 0;
        localStorage.setItem("SprintStatistic", JSON.stringify([this.statistic]));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(#00000099, #00000099),
    center/ cover url("../../../assets/images/sprint/fon.png");
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  background: none;
}
.content.visible {
  opacity: 1;
  transition: opacity 1s;
}
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 50vw;
  height: 50vh;
  background: #4e6a6ec4 !important;
}
.controls {
  position: static;
  display: flex;
  justify-content: space-around;
  width: 50%;
}
.timer {
  width: 50vw;
}
.next-btn {
  display: flex;
  align-items: center;
  margin-top: 10px;
  visibility: visible;
  transition: opacity 0.5s;
}
.next-btn.hide {
  visibility: hidden;
  cursor: default;
}
.next-btn__icon {
  padding-bottom: 15px;
  padding-right: 10px;
}

@media screen and (max-width: 980px) {
  .game {
    width: 90vw;
  }
  .timer {
    width: 90vw;
  }
}

@media screen and (max-height: 850px) {
  .game {
    height: 65vh;
  }
  .controls {
    width: 100%;
  }
  .answer-btn {
    width: 120px !important;
  }
}
@media screen and (max-width: 500px) {
  .game {
    height: 75vh;
  }
  .next-btn {
    position: absolute;
    bottom: 25px;
    width: 85% !important;
  }
  .controls {
    position: absolute;
    bottom: 25px;
  }
}
</style>
