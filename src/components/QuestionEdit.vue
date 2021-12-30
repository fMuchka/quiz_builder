<template>
  <div>
    <label id="question-id"> {{ question.id }} </label>
    <label for="question-text">Text:</label>
    <textarea
      name="question-text"
      :value="text"
      @change="updateText()"
    ></textarea>

    <label for="question-answer">Answer:</label>
    <textarea
      name="question-answer"
      :value="answer"
      @change="updateAnswer()"
    ></textarea>

    <label for="question-points-max">Max Points:</label>
    <input
      name="question-points-max"
      type="number"
      :value="points.max"
      @change="updateMax()"
    />

    <label for="question-points-increment">Points Increment:</label>
    <input
      name="question-points-increment"
      type="number"
      :value="points.increment"
      @change="updateIncrement()"
    />
  </div>
</template>

<script>
import Question from "@/classes/Question";
export default {
  name: "QuestionEdit",

  props: {
    question: {
      type: Question,
      required: true,
    },
  },

  computed: {
    points() {
      return this.question.pointsDetail;
    },

    answer() {
      return this.question.answerDetail;
    },

    text() {
      return this.question.textDetail;
    },
  },

  methods: {
    updateText() {
      const value = event.target.value;
      const question = this.question;

      this.$store.commit("updateQuestionText", { question, value });
    },

    updateAnswer() {
      const value = event.target.value;
      const question = this.question;

      this.$store.commit("updateQuestionAnswer", { question, value });
    },

    updateMax() {
      const value = event.target.value;
      const question = this.question;

      this.$store.commit("updateQuestionMax", { question, value });
    },

    updateIncrement() {
      const value = event.target.value;
      const question = this.question;

      this.$store.commit("updateQuestionIncrement", { question, value });
    },
  },
};
</script>

<style scoped>
label {
    font-size: 20px;
    font-weight: bold;
}

#question-id {
    margin-bottom: 15px;
}

textarea{
    height: 80px;
}
</style>
