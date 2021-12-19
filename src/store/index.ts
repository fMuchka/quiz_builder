import { InjectionKey } from 'vue'
import { createStore, Store } from "vuex";
import { State } from '@/interfaces/State';
import Quiz from '@/classes/Quiz';


export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    questions: [], // storage of all questions created
    themes: [],
    mediaFiles: [],
    quiz: new Quiz(),

    tID: 0,
    qID: 0,
    mID: 0

  },
  mutations: {
    setQuiz(state, q) {
      state.quiz = q;
    },

    addTheme(state, t) {
      state.themes.push(t);

      state.quiz.addTheme(t);
    },

    incrementThemeID(state) {
      state.tID++;
    }
  },
  actions: {
    createQuiz( { commit } ) {
      commit("setQuiz", new Quiz);
    }
  },
  modules: {},
  getters: {
    quiz: ( state ) => { return state.quiz },

    themeID: ( state ) => { return state.tID }
  }
});