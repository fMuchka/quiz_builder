<template>
  <div>
      <button @click="createQuiz()">Create Quiz</button>

      <button disabled>Edit Quiz</button>
  </div>
</template>

<script>
export default {
    name: "Home",

    methods: {
        createQuiz(){
            this.$store.dispatch("createQuiz");

            this.goNext();
        },

        goNext(){
            this.$router.push("quizSetup")
        }
    }
}
</script>

<style>

</style>