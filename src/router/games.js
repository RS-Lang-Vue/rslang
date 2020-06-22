import Index from "@/views/games/Index.vue";
import SpeakIt from "@/views/games/SpeakIt.vue";
import EnglishForKids from "@/views/games/EnglishForKids.vue";
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
    path: "english-for-kids",
    component: EnglishForKids,
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
