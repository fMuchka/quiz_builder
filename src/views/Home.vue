<template>
  <div id="main-menu">
      <button @click="createQuiz()">Create Quiz</button>

      <button disabled>Edit Quiz</button>
  </div>
</template>

<script>

import { ACTIONS } from "../store/actions.type"

export default {
    name: "Home",

    methods: {
        createQuiz(){
            this.$store.dispatch(ACTIONS.CREATE_QUIZ);

            this.goNext();
        },

        goNext(){
            this.$router.push("quizSetup")
        }
    }
}
</script>

<style scoped>

#main-menu{
    display: flex;
    margin: auto;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
}

button {
    grid-area: button;
    height: 5rem;
    width: 50rem;
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
    margin: 15px;
}

button:disabled{
    filter: grayscale(1);
}

button:hover{
    filter: brightness(0.8);
}
</style>