import { InjectionKey } from 'vue'
import { createStore, Store } from "vuex";
import { State } from '@/interfaces/State';
import Quiz from '@/classes/Quiz';
import Theme from '@/classes/Theme';
import Question from '@/classes/Question';

import { MUTATIONS } from "./mutations.type";
import { ACTIONS } from "./actions.type";

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
    [MUTATIONS.SET_QUIZ](state, q) {
      state.quiz = q;
    },

    [MUTATIONS.ADD_THEME](state, t) {
      state.themes.push(t);

      state.quiz.addTheme(t);
      state.tID++;
    },

    [MUTATIONS.DELETE_THEME](state, t) {
      const tIndex = state.themes.findIndex(e => e === t);
      state.themes.splice(tIndex, 1);

      state.quiz.removeTheme(t);
    },

    [MUTATIONS.ADD_QUESTION](state, { question, theme }) {
      state.questions.push(question);

      state.quiz.addQuestion(question);
      state.qID++;

      // due to private State, we cannot add questions to themes outside State
      if (theme !== undefined) {
        theme.addQuestion(question);
      }
    },

    [MUTATIONS.DELETE_QUESTION](state, { question, theme }) {
      const qIndex = state.questions.findIndex(e => e === question);
      state.questions.splice(qIndex, 1);

      state.quiz.removeQuestion(question);
      theme.removeQuestion(question);
    },

    [MUTATIONS.UPDATE_THEME_LABEL](state, { newLabel, theme }) {
      theme.setLabel(newLabel)
    },

    [MUTATIONS.UPDATE_QUESTION_TEXT](state, { question, value }) {
      question.setText(value);
    },

    [MUTATIONS.UPDATE_QUESTION_ANSWER](state, { question, value }) {
      question.setAnswer(value);
    },

    [MUTATIONS.UPDATE_QUESTION_MAX](state, { question, value }) {
      question.setMax(value);
    },

    [MUTATIONS.UPDATE_QUESTION_INCREMENT](state, { question, value }) {
      question.setIncrement(value);
    }
  },
  actions: {
    [ACTIONS.CREATE_QUIZ]( { commit, getters } ) {
      commit( MUTATIONS.SET_QUIZ, new Quiz );

      // make sure Quiz has atleast one Theme.ts to start with
      const themeID = getters["themeID"];
      const theme = new Theme(themeID, undefined);

      // and atleast one Question.ts
      const questionID = getters["questionID"];
      const question = new Question(questionID, undefined);

      theme.addQuestion(question);
      
      commit(MUTATIONS.ADD_THEME, theme);
      commit(MUTATIONS.ADD_QUESTION, {question});
    }
  },
  modules: {},
  getters: {
    quiz: ( state ) => { return state.quiz },
    themeID: (state) => { return `t${state.tID}` },
    questionID: ( state ) => { return `q${state.qID}` },
  }
});