import Question from "./Question";
import ThemeConfig from "@/interfaces/ThemeConfig"


export default class Theme {
    public id: string;
    private text: string;
    private questions: Question[];

    constructor(id: string, obj? : ThemeConfig) {
        this.id = id;
        this.text = obj === undefined ? "" : obj?.text;
        this.questions = obj === undefined ? [] : obj?.questions;
    }

    setLabel(t: string): void{
        this.text = t;
    }

    addQuestion(q: Question): void {
        this.questions.push(q);
    }

    removeQuestion(q: Question): void {
        const index = this.questions.findIndex(e => e === q);

        this.questions.splice(index, 1);
    }

    get label() : string { return this.text }

    get questionList(): Question[] { return this.questions };
}
