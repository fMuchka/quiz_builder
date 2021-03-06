import Theme from "./Theme";
import Question from "./Question";
import QuizConfig from "@/interfaces/QuizConfig";
import Media from "@/interfaces/Media";

export default class Quiz {
    private flow: Theme["id"][] = [];   // Theme IDs in order
    private themes: Record<Theme["id"], Theme> = {};   // Theme objects map
    private questions: Record<Question["id"], Question> = {};   // Question objects map
    private mediaFiles: Record<Media["id"], Media["path"]> = {};  // Media files

    constructor(obj?: QuizConfig) {
        this.flow = obj === undefined ? [] : obj?.flow;
        this.themes = obj === undefined ? {} : obj?.themes;
        this.questions = obj === undefined ? {} : obj?.questions;
        this.mediaFiles = obj === undefined ? {} : obj?.mediaFiles;
    }


    addTheme(t: Theme): void {
        this.themes[t.id] = t;
    }

    addQuestion(q: Question): void {
        this.questions[q.id] = q;
    }

    removeQuestion(q: Question): void {
        delete this.questions[q.id];
    }

    removeTheme(t: Theme): void{
        delete this.themes[t.id];
    }

    get quizThemes() : Record<Theme["id"], Theme> { return this.themes }
}
