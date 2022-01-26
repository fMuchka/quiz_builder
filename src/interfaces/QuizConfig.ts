import Theme from "@/classes/Theme";
import Question from "@/classes/Question";
import Media from "@/interfaces/Media";

export default interface QuizConfig{
    flow: Theme["id"][];   // Theme IDs in order
    themes: Record<Theme["id"], Theme>;   // Theme objects map
    questions: Record<Question["id"], Question>;   // Question objects map
    mediaFiles: Record<Media["id"], Media["path"]>;  // Media files
}