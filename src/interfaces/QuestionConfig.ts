import Media from "./Media";
import Points from "./Point";

export default interface QuestionConfig{
    text: string; 
    answer: string;
    media: Media["id"];
    points: Points;
}