import Index from "@/views/games/Index.vue";
import SpeakIt from "@/views/games/SpeakIt.vue";
import StartEnglishPuzzle from "@/views/games/EnglishPuzzle/Start.vue";
import EnglishPuzzle from "@/views/games/EnglishPuzzle/EnglishPuzzle.vue";
import Savannah from "@/views/games/Savannah.vue";
import StartFindThePair from "@/views/games/FindThePair/Start.vue";
import FindThePair from "@/views/games/FindThePair/FindThePair.vue";
import AudioCall from "@/views/games/AudioCall.vue";
import Sprint from "@/views/games/Sprint.vue";

export default [
  {
    path: "",
    component: Index,
  },
  {
    path: "speak-it",
    component: SpeakIt,
    meta: { title: 'Игра "SpeakIt"' },
  },
  {
    path: "start-english-puzzle",
    component: StartEnglishPuzzle,
    meta: { title: 'Игра "English puzzle"' },
  },
  {
    path: "english-puzzle",
    component: EnglishPuzzle,
    meta: { title: 'Игра "English puzzle"' },
  },
  {
    path: "savannah",
    component: Savannah,
    meta: { title: 'Игра "Саванна"' },
  },
  {
    path: "audio-call",
    component: AudioCall,
    meta: { title: 'Игра "Аудиовызов"' },
  },
  {
    path: "sprint",
    component: Sprint,
    meta: { title: 'Игра "Спринт"' },
  },
  {
    path: "start-find-the-pair",
    component: StartFindThePair,
    meta: { title: 'Игра "Find The Pair"' },
  },
  {
    path: "find-the-pair",
    component: FindThePair,
    meta: { title: 'Игра "Find The Pair"' },
  },
];
