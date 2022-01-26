<template>
  <div id="quiz-setup">
    <div id="top-panel">
      <span class="section-title">Themes</span>
      
      <div class="theme-id-wrapper">
        <div
          v-for="(item, key) in themes"
          :key="key"

          class="theme-id"
          :class="item.id === currentThemeID ? 'currentTheme' : ''"
        >
          <span
              @click="currentThemeID = item.id"
          >{{ key }}</span>

          <span @click="deleteTheme(item)" class="delete-theme">Delete</span>
        </div>
      </div>
        

      <button @click="addTheme()">Add Theme</button>
    </div>


    <div id="label-wrapper">
      <label for="theme-label">Theme label:</label>
      <input
        type="text"
        id="theme-label"
        @change="updateThemeLabel()"
        :value="currentTheme.label"
      />
    </div>

    <!-- Question list is visible if specific question isn't clicked for edit -->
    <div id="question-list" v-if="editQuestionActive === false">
      <span class="section-title">Questions</span>
      
      <div id="questions-wrapper">
        <div
        v-for="(item, key) in currentTheme.questionList"
        :key="key"
        @click="editQuestion(item)"
      >
        <span class="question-id">{{ item.id }}</span> : {{ (item.textDetail.length > 0 ? item.textDetail : "Question Text Placeholder") }}
      </div>
      </div>
    </div>

    <div id="question-edit" v-else>
        <div id="back-button" @click="editQuestionActive = false">View Question List</div>

        <question-edit id="form" :question="editQuestionObject"></question-edit>       

        <div id="bottom-panel">
            <button @click="previousQuestion()">&#60;</button>
            <div id="delete-question" @click="deleteQuestion()">Delete</div>
            <button @click="nextQuestion()">&#62;</button>
        </div>
        
    </div>

    <button @click="addQuestion()">Add Question</button>
  </div>
</template>

<script>
import Theme from "@/classes/Theme";
import Question from "@/classes/Question";

import QuestionEdit from "@/components/QuestionEdit.vue";

import { MUTATIONS } from "@/store/mutations.type";
import { mapGetters } from "vuex";

export default {
  name: "QuizSetup",

  components:{
      QuestionEdit
  },

  data() {
    return {
        editQuestionActive: false,
        editQuestionObject: {}, // question which is being edited in edit window
        currentThemeID: "t0" // this should be default first theme ID
    };
  },

  computed: {
    ...mapGetters(["quiz", "themeID", "questionID"]),
    
    themes() {
      return this.quiz.quizThemes;
    },

    // get current ID from state and lookup the Theme in component
    currentTheme() {
      return this.themes[this.currentThemeID];
    }
  },

  methods: {
    addTheme() {
      const id = this.themeID;
      const theme = new Theme(id, "", []);

      this.$store.commit(MUTATIONS.ADD_THEME, theme);
    },

    addQuestion() {
      const id = this.questionID;
      const question = new Question(id, undefined);
      const theme = this.currentTheme;

      this.$store.commit(MUTATIONS.ADD_QUESTION, { question, theme });
    },

    updateThemeLabel() {
      const theme = this.currentTheme;
      const newLabel = event.target.value;

      this.$store.commit(MUTATIONS.UPDATE_THEME_LABEL, { newLabel, theme });
    },

    editQuestion(item){
        this.editQuestionObject = item;
        this.editQuestionActive = true;
    },

    previousQuestion(){
        const theme = this.currentTheme;
        const questions = theme.questions;
        const currentQ = this.editQuestionObject;

        const currentQindex = questions.findIndex( e => e === currentQ );
    
        if (currentQindex > 0) {
            this.editQuestionObject = questions[currentQindex - 1];
        }else{
            this.editQuestionObject = questions[questions.length - 1];
        }
    },

    nextQuestion(){
        const theme = this.currentTheme;
        const questions = theme.questions;
        const currentQ = this.editQuestionObject;

        const currentQindex = questions.findIndex( e => e === currentQ );
    
        if (currentQindex < questions.length) {
            this.editQuestionObject = questions[currentQindex + 1];
        }else{
            this.editQuestionObject = questions[0];
        }
    },

    deleteQuestion(){
        const question = this.editQuestionObject;
        const theme = this.currentTheme;

        this.$store.commit(MUTATIONS.DELETE_QUESTION, { question, theme });

        this.editQuestionActive = false;
    },

    deleteTheme(theme){
        this.$store.commit(MUTATIONS.DELETE_THEME, theme);

        const themeKeys = Object.keys(this.themes);
        const nextKey = themeKeys.indexOf(theme) + 1;

        this.currentThemeID = themeKeys[nextKey];
    }
  },
};
</script>

<style scoped>
.currentTheme {
  background-color: initial !important;
  border: 1px solid #dbd6d6;
}

#top-panel {
  width: 98vw;
  height: 175px;
  display: grid;
  margin: auto;
  grid-template-areas:
      "title title title"
      "theme theme button";
  grid-template-columns: 1fr 1fr 0.25fr;
  grid-area: top;
  border-bottom: 1px solid black;
}

body {
    margin: 0;
}

.section-title {
  display: grid;
  grid-area: title;
  place-content: center;
  font-size: 35px;
  font-weight: bold;
}

button {
  grid-area: button;
  height: 3.25rem;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #ece8e8;
  font-size: 24px;
  color: #0d5b9e;
  font-weight: bold;
  filter: drop-shadow(1px 1px 1px black);
  cursor: pointer;
}

button:hover{
  filter: grayscale(0.8)
}

.theme-id-wrapper {
  grid-area: theme;
  display: flex;
  align-self: center;
  font-size: 20px;
  overflow-y: scroll;
  max-width: 85vw;
}

.delete-theme {
  visibility: hidden;
  display: flex;
  background-color: #ece8e8;
  width: 60px;
  height: 30px;
  color: red;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  filter: drop-shadow(1px 1px 1px black);
}

.delete-theme:hover {
  filter: brightness(0.8);
}

.theme-id:hover .delete-theme {
  visibility: visible;
}

.theme-id {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  height: 5rem;
  cursor: pointer;
  font-size: 20px;
  margin: 0 5px;
  min-width: 5rem;
  background-color: #dbd6d6;
  border-radius: 5px;
}

.theme-id span:first-child {
  height: 60px;
  display: flex;
  width: 100%;
  place-content: center;
}

#quiz-setup {
  display: grid;
  height: 98vh;
  grid-template-areas:
      "top top top"
      ". label ."
      "question question question"
      ". button .";
  grid-template-rows: 175px 1.25fr 1fr 0.25fr;
}

#quiz-setup > label[for="theme-label"] {
    grid-area: label;
}

#theme-label {
  width: 75%;
}

#question-list {
    grid-area: question;
}

#quiz-setup button {
    grid-area: button;
}

#label-wrapper {
    grid-area: label;
    width: 50rem;
    height: 3rem;
    align-self: center;
    display: flex;
    justify-content: center;
}

#label-wrapper > label {
    display: flex;
    align-items: center;
    font-size: 24px;
}

#question-list .section-title {
    grid-area: title;
    align-content: center;
    justify-self: center;
    font-size: 24px;
    align-self: center;
    font-weight: bold;
}

#questions-wrapper {
  grid-area: question;
  display: grid;
  grid-template-columns: 1fr;
  max-height: 50vh;
  height: 50vh;
  width: 80vw;
  overflow-y: scroll;
  justify-items: center;
  margin: 10px auto;
  align-content: start;
}

#questions-wrapper div {
  background-color: #dbd6d6;
  width: 95%;
  margin: 5px;
  height: 3.5rem;
  line-height: 3.5rem;
  display: block;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0px 25px;
  cursor: pointer;
}

#questions-wrapper div:hover{
  filter: brightness(0.8);
}

.question-id {
  font-weight: bold;
}

#question-edit {
  display: grid;
  grid-area: question;
  grid-template-areas:
      "back . ."
      "form form form"
      "panel panel panel";
  width: 70%;
  margin: auto;
  height: 550px;
}

#bottom-panel {
    display: flex;
    grid-area: panel;
    align-items: center;
    justify-content: center;
    width: 100%;
    justify-content: space-around;
}

#back-button:hover, #delete-question:hover{
  filter: brightness(0.8);
}

#back-button, #delete-question {
    grid-area: back !important;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: #ece8e8;
    font-size: 18px;
    color: #0d5b9e;
    font-weight: bold;
    filter: drop-shadow(1px 1px 1px black);
    cursor: pointer;
    width: 170px;
    height: 40px;
}

#form {
    grid-area: form;
    display: flex;
    flex-direction: column;
}

#form input, #form textarea {
    margin-bottom: 20px;
}

#question-id {
    margin-bottom: 5px;
    font-size: 25px;
    font-weight: bold;
}

textarea[name="question-text"] {
    height: 100px;
}

#bottom-panel button {
    grid-area: none !important;
    width: 200px;
}
</style>