import Theme from "./Theme";
import Question from "./Question";
import QuizMessenger from "@/interfaces/QuizMessenger";
import Media from "@/interfaces/Media";

export default class Quiz {
    private flow: Theme["id"][] = [];   // Theme IDs in order
    private themes: Record<Theme["id"], Theme> = {};   // Theme objects map
    private questions: Record<Question["id"], Question> = {};   // Question objects map
    private mediaFiles: Record<Media["id"], Media["path"]> = {};  // Media files

    constructor(obj?: QuizMessenger) {
        this.flow = obj === undefined ? [] : obj?.flow;
        this.themes = obj === undefined ? {} : obj?.themes;
        this.questions = obj === undefined ? {} : obj?.questions;
        this.mediaFiles = obj === undefined ? {} : obj?.mediaFiles;
    }


    addTheme(t: Theme): void {
        this.themes[t.id] = t;
    }

    get quizThemes() : Record<Theme["id"], Theme> { return this.themes }
}
