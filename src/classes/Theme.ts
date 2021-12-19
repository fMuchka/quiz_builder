import Question from "./Question";

export default class Theme {
    public id: string;
    private text: string;
    private questions: Question[];

    constructor(id: string, text: string, questions: Question[]) {
        this.id = id;
        this.text = text;
        this.questions = questions;
    }
}
