export interface CompetitionItem {
  _id:string
  category: string;
  rating: number;
  fileUrl: string;
  ownerId: string;
  ownerEmail: string;
}

export interface Category {
  pictures: string;
  recipes: string; 
  exams: string;
}
export interface GenerateQuestionRequest {
  prompt: string;
}

export interface QuestionData {
  question: string;
  options: string[];
  correctAnswer: string;
}
export type CategoryKeys = keyof Category;
