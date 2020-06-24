import Index from "@/views/games/Index.vue";
import SpeakIt from "@/views/games/SpeakIt.vue";
// eslint-disable-next-line
import EnglishPuzzle from "@/views/games/EnglishPuzzle.vue";
import Savana from "@/views/games/Savana.vue";
import AudioCall from "@/views/games/AudioCall.vue";
import Sprint from "@/views/games/Sprint.vue";
import OurGame from "@/views/games/OurGame.vue";

export default [
  {
    path: "",
    component: Index,
  },
  {
    path: "speak-it",
    component: SpeakIt,
  },
  {
    path: "english-puzzle",
    component: EnglishPuzzle,
  },
  {
    path: "savana",
    component: Savana,
  },
  {
    path: "audio-call",
    component: AudioCall,
  },
  {
    path: "sprint",
    component: Sprint,
  },
  {
    path: "our-game",
    component: OurGame,
  },
];
