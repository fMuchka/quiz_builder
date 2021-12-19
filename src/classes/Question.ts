import Media from "@/interfaces/Media";
import Points from "@/interfaces/Point";

export default class Question{
    private text: string;
    private answer: string;
    private media: Media["id"];
    private points: Points;
    public id: string;

    constructor (text: string, answer: string, media: Media["id"], points: Points, id: string){
        this.text = text;
        this.answer = answer;
        this.media = media;
        this.points = points;
        this.id = id;
    }
} 

