<template>
  <div class="savannah-container">
    <v-btn class="close-btn" color="transparent" elevation="0" @click="closeGame">
      <v-icon large color="#ffffff">mdi-close</v-icon>
    </v-btn>
    <div class="field" v-if="!loading">
      <v-btn class="source-word" color="transparent" elevation="0">{{
        sourceData[countWords].word
      }}</v-btn>
      <hr class="line" />
    </div>
    <v-card v-if="!loading" color="transparent" elevation="0" class="content">
      <v-container>
        <v-row class="example__container">
          <v-col class="example__container-col" v-for="item in exampleData[countWords]" :key="item">
            <v-btn
              v-bind:class="{ small: item.length > 12 }"
              class="example-btn"
              @click="checkAnswer($event)"
            >
              {{ item }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <div class="score">{{ this.score }} из 20</div>
    <RoundStatistic
      :roundModalActive="roundModalActive"
      :statistic="stat"
      @atStart="atStart"
      @next="nextGame"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import RoundStatistic from "./components/RoundStatistic.vue";

export default {
  props: ["startPage"],
  computed: mapGetters(["getSavannahStatistic", "getSavannahSettings"]),
  components: {
    RoundStatistic,
  },
  data() {
    return {
      score: 0,
      ainmated: undefined,
      position: 0,
      loading: true,
      sourceData: [],
      exampleData: {},
      newWords: true,
      countWords: 0,
      settings: {},
      stat: { correct: 0, wrong: 0 },
      roundModalActive: false,
    };
  },
  async mounted() {
    this.setLoading(true);
    await this.getSettings();
    await this.getData();
    this.setLoading(false);
    this.moveBlock();
  },
  destroyed() {
    this.destroy();
  },
  methods: {
    ...mapActions([
      "downloadSettings",
      "getLearnedWordsSortByRepeatDate",
      "addAnswerResult",
      "setLoading",
      "setGameSetting",
    ]),
    ...mapMutations(["addSavannahStatistic"]),
    async getSettings() {
      await this.downloadSettings();
      this.settings = this.getSavannahSettings;
      this.newWords = this.settings.newWords;
    },
    async getData() {
      function getRandom(x) {
        return Math.round(Math.random() * x);
      }
      function randomWords() {
        return 0.5 - Math.random();
      }
      const learnedWords = await this.getLearnedWordsSortByRepeatDate({});
      if (!this.newWords && learnedWords.success && learnedWords.result.length > 19) {
        const { result } = learnedWords;
        this.sourceData = result.slice(0, 20);
        this.exampleData = result.map((el) => {
          const set = new Set();
          set.add(el.wordTranslate);
          while (set.size < 4) {
            set.add(result[getRandom(result.length - 1)].wordTranslate);
          }
          return Array.from(set).sort(randomWords);
        });
      } else {
        const res = await fetch(
          `https://afternoon-falls-25894.herokuapp.com/words?page=${
            this.settings.round[this.settings.level]
          }&group=${this.settings.level}`
        );
        const data = await res.json();
        this.sourceData = data;
        this.exampleData = data.map((el) => {
          const set = new Set();
          set.add(el.wordTranslate);
          while (set.size < 4) {
            set.add(data[getRandom(data.length - 1)].wordTranslate);
          }
          return Array.from(set).sort(randomWords);
        });
      }
      this.loading = false;
    },
    async checkAnswer(x) {
      let answer;
      if (x) {
        answer = x.target.textContent.trim() === this.sourceData[this.countWords].wordTranslate;
      }
      if (answer) {
        this.changeStatistic(true);
      } else {
        this.changeStatistic(false);
      }
      this.addAnswerResult({
        wordId: this.newWords
          ? this.sourceData[this.countWords].id
          : this.sourceData[this.countWords]._id,
        isCorrectAnswer: answer,
      });
      this.destroy();
      await this.btnActivity();
      if (this.countWords !== 19) {
        this.countWords += 1;
        this.position = 0;
        this.moveBlock();
      } else {
        this.sendStatistic();
        if (this.newWords) {
          this.saveGameSettings();
        }
        this.roundModalActive = true;
        this.score = 0;
      }
    },
    async btnActivity() {
      const buttons = document.querySelectorAll(".example-btn");
      buttons.forEach((el) => {
        if (el.textContent.trim() === this.sourceData[this.countWords].wordTranslate) {
          el.classList.add("correct");
        } else {
          el.classList.add("incorrect");
        }
        el.setAttribute("disabled", "true");
      });
      const wait = async () => {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        await delay(800);
        buttons.forEach((el) => {
          el.removeAttribute("disabled");
          el.classList.remove("correct");
          el.classList.remove("incorrect");
        });
      };
      await wait();
    },
    closeGame() {
      this.$emit("changeStartPage", false);
    },
    changeStatistic(x) {
      if (x === true) {
        this.stat.correct += 1;
        this.score += 1;
      } else {
        this.stat.wrong += 1;
      }
    },
    sendStatistic() {
      const date = new Date().toLocaleString("ru").split(",")[0];
      this.stat.date = date;
      if (localStorage.getItem("SavannahStatistic")) {
        const localStat = JSON.parse(localStorage.getItem("SavannahStatistic"));
        this.stat.id = localStat.length;
        localStat.push(this.stat);
        localStorage.setItem("SavannahStatistic", JSON.stringify(localStat));
      } else {
        this.stat.id = 0;
        localStorage.setItem("SavannahStatistic", JSON.stringify([this.stat]));
      }
      this.addSavannahStatistic(this.stat);
    },
    saveGameSettings() {
      if (this.settings.round[this.settings.level] < 29) {
        this.settings.round[this.settings.level] += 1;
      } else if (this.settings.level < 5) {
        this.settings.level += 1;
        this.settings.round[this.settings.level] = 0;
      } else {
        this.settings.level = 0;
        this.settings.round[this.settings.level] = 0;
      }
      this.setGameSetting({ gameName: "gameSavannah", gameSettings: this.settings });
    },
    async nextGame() {
      this.stat = { correct: 0, wrong: 0 };
      this.countWords = 0;
      this.position = 0;
      this.roundModalActive = false;
      this.setLoading(true);
      await this.getData();
      this.setLoading(false);
      this.moveBlock();
    },
    atStart() {
      this.closeGame();
    },
    moveBlock() {
      this.ainmated = window.requestAnimationFrame(this.move);
    },
    move() {
      this.position += 0.1;
      document.querySelector(".source-word").style.top = `${this.position}%`;
      if (this.position < 80) {
        this.ainmated = window.requestAnimationFrame(this.move);
      } else {
        this.checkAnswer();
      }
    },
    destroy() {
      cancelAnimationFrame(this.ainmated);
    },
  },
};
</script>

<style lang="scss">
.savannah-container {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.field {
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0;
  .line {
    position: absolute;
    bottom: 20%;
    width: 100%;
  }
}
.source-word {
  color: #e5fd0a !important;
  position: relative;
  cursor: default;
  top: 0px;
}
.close-btn {
  position: absolute !important;
  right: 5px;
  top: 80px;
  :hover {
    cursor: pointer;
  }
}
.content {
  width: 100vw;
}
.example__container {
  text-align: center;
}
.example-btn {
  width: 150px;
}
.small {
  font-size: 8px !important;
}
.example-btn.correct {
  background-color: #4ffd0a !important;
}
.example-btn.incorrect {
  opacity: 0.5;
}
.score {
  position: absolute;
  bottom: 50px;
  right: 100px;
  color: #ffffff;
}
@media screen and (max-width: 500px) {
  .savannah-container {
    justify-content: flex-start !important;
  }
  .example__container {
    text-align: right;
    flex-direction: column;
  }
  .example-btn {
    width: 120px;
    font-size: 10px !important;
  }
  .score {
    right: 20px;
  }
}
</style>
