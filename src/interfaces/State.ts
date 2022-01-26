import Question from "@/classes/Question";
import Quiz from "@/classes/Quiz";
import Theme from "@/classes/Theme";

// defined state Types
export interface State {
  questions: Question[], // storage of all questions created
  themes: Theme[],
  mediaFiles: [],
  quiz: Quiz,

  tID: number,
  qID: number,
  mID: number
}