<template>
  <div>

    <div 
        v-for="(item, key) in themes" 
        :key="key"
    >
        {{ key }}
    </div>

    <button @click="addTheme()">T++</button>

  </div>
</template>

<script>
import Theme from '@/classes/Theme'
export default {
    name: "QuizSetup",

    computed: {
        quiz(){
            return this.$store.getters["quiz"]
        },

        themes(){
            return this.quiz.quizThemes
        }
    },

    methods: {
        addTheme(){
            const id = this.$store.getters["themeID"];
            const theme = new Theme(`t${id}`, "", []);

            this.$store.commit( "addTheme", theme );
            this.$store.commit( "incrementThemeID" );
        }
    }
}
</script>

<style>

</style>