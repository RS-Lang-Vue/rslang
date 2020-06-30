<template>
  <div>
    <v-card class="mx-auto text-start" max-width="700">
      <!-- <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar
        color="primary lighten-2"
        class="subheading white--text"
        size="24"
        v-text="step"
      ></v-avatar>
    </v-card-title> -->
      <v-card-title class="cyan darken-1">
        <div class="dots">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>

        <span class="white--text">новое слово</span>

        <v-spacer></v-spacer>

        <v-btn dark icon title="Удалить слово из изучаемых">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item v-for="wordObject in wordsArray" :key="wordObject.id">
          <!-- <v-card-text>
          <v-text-field label="Email" value="john@vuetifyjs.com"></v-text-field>
          <span class="caption grey--text text--darken-1">
            This is the email you will use to login to your Vuetify account
          </span>
        </v-card-text> -->
          <div class="d-flex flex-no-wrap justify-space-between align-center">
            <v-btn icon class="ma-2">
              <v-icon>mdi-volume-high</v-icon>
            </v-btn>
            <v-card-text>
              <span class="text-sm-h4 text-h5">
                {{ wordObject.word }}
              </span>
              <p class="text-body-1">
                {{ wordObject.transcription }}
              </p>
              <div class="text-subtitle-1">{{ wordObject.wordTranslate }}</div>
            </v-card-text>
            <v-avatar class="ma-3" size="125" tile>
              <v-img src="@/assets/images/apartment.jpg"></v-img>
            </v-avatar>
          </div>

          <div class="d-flex flex-no-wrap justify-space-between align-center">
            <v-btn icon class="ma-2">
              <v-icon>mdi-volume-high</v-icon>
            </v-btn>
            <v-card-text class="text-body-1">
              <p class="text-body-1 mb-2">
                <span v-html="wordObject.textMeaning"></span>
              </p>
              <p class="text-body-2 mb-0">
                {{ wordObject.textMeaningTranslate }}
              </p>
            </v-card-text>
          </div>

          <div class="d-flex flex-no-wrap justify-space-between align-center">
            <v-btn icon class="ma-2">
              <v-icon>mdi-volume-high</v-icon>
            </v-btn>
            <v-card-text class="text-body-1">
              <p class="text-body-1 mb-2"><span v-html="wordObject.textExample"></span></p>
              <p class="text-body-2 mb-0">{{ wordObject.textMeaningTranslate }}</p>
            </v-card-text>
          </div>
        </v-window-item>

        <!-- <v-window-item :value="2">
        <v-card-text>
          <v-text-field label="Password" type="password"></v-text-field>
          <v-text-field label="Confirm Password" type="password"></v-text-field>
          <span class="caption grey--text text--darken-1">
            Please enter a password for your account
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="3">
        <div class="pa-4 text-center">
          <v-img
            class="mb-4"
            contain
            height="128"
            src="https://cdn.vuetifyjs.com/images/logos/v.svg"
          ></v-img>
          <h3 class="title font-weight-light mb-2">Welcome to Vuetify</h3>
          <span class="caption grey--text">Thanks for signing up!</span>
        </div>
      </v-window-item> -->
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text color="indigo accent-4" title="Добавить в раздел сложные слова">
          сложное
        </v-btn>
        <v-btn text color="indigo accent-4" title="Добавить в раздел сложные слова">
          показать ответ
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="indigo accent-4">
          Далее
        </v-btn>
      </v-card-actions>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn :disabled="step === 1" text @click="step--">
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="step === wordsArray.length - 1" color="primary" depressed @click="step++">
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
    <p>Степ = {{ step }}</p>
  </div>
</template>

<script>
const wordsArray = [
  {
    id: "5e9f5ee35eb9e72bc21af4b4",
    group: 0,
    page: 1,
    word: "adventure",
    image: "files/02_0021.jpg",
    audio: "files/02_0021.mp3",
    audioMeaning: "files/02_0021_meaning.mp3",
    audioExample: "files/02_0021_example.mp3",
    textMeaning: "An <i>adventure</i> is a fun or exciting thing that you do.",
    textExample: "Riding in the rough water was an <b>adventure</b>.",
    transcription: "[ədvéntʃər]",
    textExampleTranslate: "Езда в бурной воде была приключением",
    textMeaningTranslate: "Приключение - это забавная или захватывающая вещь, которую ты делаешь",
    wordTranslate: "приключение",
    wordsPerExampleSentence: 8,
  },
  {
    id: "5e9f5ee35eb9e72bc21af4b5",
    group: 0,
    page: 1,
    word: "approach",
    image: "files/02_0022.jpg",
    audio: "files/02_0022.mp3",
    audioMeaning: "files/02_0022_meaning.mp3",
    audioExample: "files/02_0022_example.mp3",
    textMeaning: "To <i>approach</i> something means to move close to it.",
    textExample: "The boy <b>approached</b> his school.",
    transcription: "[əpróutʃ]",
    textExampleTranslate: "Мальчик приблизился к своей школе",
    textMeaningTranslate: "Подойти к чему-то - значит приблизиться к нему",
    wordTranslate: "подходить",
    wordsPerExampleSentence: 5,
  },
  {
    id: "5e9f5ee35eb9e72bc21af4b6",
    group: 0,
    page: 1,
    word: "chemical",
    image: "files/02_0024.jpg",
    audio: "files/02_0024.mp3",
    audioMeaning: "files/02_0024_meaning.mp3",
    audioExample: "files/02_0024_example.mp3",
    textMeaning: "A <i>chemical</i> is something that scientists use in chemistry.",
    textExample: "The scientist mixed the <b>chemicals</b>.",
    transcription: "[kémikəl]",
    textExampleTranslate: "Ученый смешал химикаты",
    textMeaningTranslate: "Химическое вещество - это то, что ученые используют в химии",
    wordTranslate: "химический",
    wordsPerExampleSentence: 5,
  },
  {
    id: "5e9f5ee35eb9e72bc21af4b7",
    group: 0,
    page: 1,
    word: "carefully",
    image: "files/02_0023.jpg",
    audio: "files/02_0023.mp3",
    audioMeaning: "files/02_0023_meaning.mp3",
    audioExample: "files/02_0023_example.mp3",
    textMeaning: "<i>Carefully</i> means with great attention, especially to detail or safety.",
    textExample: "The baby <b>carefully</b> climbed down the stairs.",
    transcription: "[kɛ́ərfəli]",
    textExampleTranslate: "Малыш осторожно спускался по лестнице",
    textMeaningTranslate:
      "Осторожно означает с большим вниманием, особенно к деталям или безопасности",
    wordTranslate: "внимательно",
    wordsPerExampleSentence: 7,
  },
  {
    id: "5e9f5ee35eb9e72bc21af4b8",
    group: 0,
    page: 1,
    word: "create",
    image: "files/02_0025.jpg",
    audio: "files/02_0025.mp3",
    audioMeaning: "files/02_0025_meaning.mp3",
    audioExample: "files/02_0025_example.mp3",
    textMeaning: "To <i>create</i> means to make something new.",
    textExample: "She <b>created</b> an igloo from blocks of snow.",
    transcription: "[kriéit]",
    textExampleTranslate: "Она создала иглу из снежных глыб",
    textMeaningTranslate: "Создать значит создать что-то новое",
    wordTranslate: "создайте",
    wordsPerExampleSentence: 8,
  },
];

export default {
  data: () => ({
    wordsArray,
    step: 0,
  }),
};
</script>

<style scope>
.dots {
  margin-right: 0.5rem;
}

.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  margin-right: 0.3rem;
}

.dot:nth-child(1) {
  background-color: orange;
}
</style>
