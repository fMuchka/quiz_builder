import Media from "./Media";
import Points from "./Point";

export default interface QuestionMessenger{
    text: string; 
    answer: string;
    media: Media["id"];
    points: Points;
}