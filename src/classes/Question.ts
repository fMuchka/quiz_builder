import Media from "@/interfaces/Media";
import Points from "@/interfaces/Point";
import QuestionConfig from "@/interfaces/QuestionConfig";

export default class Question{
    private text: string;
    private answer: string;
    private media: Media["id"];
    private points: Points;
    public id: string;

    constructor (id : string, obj? : QuestionConfig){
        this.text = obj === undefined ? "" : obj.text;
        this.answer = obj === undefined ? "" : obj.answer;
        this.media = obj === undefined ? "" : obj.media;
        this.points = obj === undefined ? { max: 0, increment: 0 } as Points : obj.points;
        this.id = id;
    }

    setText(t: string): void { this.text = t }

    setAnswer(a: string): void { this.answer = a }

    setMax(m: number): void { this.points.max = m }

    setIncrement(i: number): void { this.points.increment = i }
    

    get pointsDetail(): Points { return this.points }

    get answerDetail(): string { return this.answer }

    get textDetail(): string { return this.text }
} 

