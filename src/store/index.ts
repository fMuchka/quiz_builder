import { InjectionKey } from 'vue'
import { createStore, Store } from "vuex";
import { State } from '@/interfaces/State';
import Quiz from '@/classes/Quiz';
import Theme from '@/classes/Theme';
import Question from '@/classes/Question';


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
      state.tID++;
    },

    deleteTheme(state, t) {
      const tIndex = state.themes.findIndex(e => e === t);
      state.themes.splice(tIndex, 1);

      state.quiz.removeTheme(t);
    },

    addQuestion(state, { question, theme }) {
      state.questions.push(question);

      state.quiz.addQuestion(question);
      state.qID++;

      // due to private State, we cannot add questions to themes outside State
      if (theme !== undefined) {
        theme.addQuestion(question);
      }
    },

    deleteQuestion(state, { question, theme }) {
      const qIndex = state.questions.findIndex(e => e === question);
      state.questions.splice(qIndex, 1);

      state.quiz.removeQuestion(question);
      theme.removeQuestion(question);
    },

    updateThemeLabel(state, { newLabel, theme }) {
      theme.setLabel(newLabel)
    },

    updateQuestionText(state, { question, value }) {
      question.setText(value);
    },

    updateQuestionAnswer(state, { question, value }) {
      question.setAnswer(value);
    },

    updateQuestionMax(state, { question, value }) {
      question.setMax(value);
    },

    updateQuestionIncrement(state, { question, value }) {
      question.setIncrement(value);
    }
  },
  actions: {
    createQuiz( { commit, getters } ) {
      commit( "setQuiz", new Quiz );

      // make sure Quiz has atleast one Theme.ts to start with
      const themeID = getters["themeID"];
      const theme = new Theme(themeID, "", []);

      // and atleast one Question.ts
      const questionID = getters["questionID"];
      const question = new Question(questionID, undefined);

      theme.addQuestion(question);
      
      commit("addTheme", theme);
      commit("addQuestion", {question});
    }
  },
  modules: {},
  getters: {
    quiz: ( state ) => { return state.quiz },
    themeID: (state) => { return `t${state.tID}` },
    questionID: ( state ) => { return `q${state.qID}` },
  }
});