export interface CompetitionItem {
  _id:string
  category: CategoryKeys;
  rating: number;
  fileUrl?: string;
  ownerId: string;
  ownerEmail: string;
}

export interface Category {
  pictures: string;
  recipes: string; 
  exams: string;
}
export type CategoryKeys = keyof Category;

export interface GenerateQuestionRequest {
  prompt: string;
}

export interface QuestionData {
  question: string;
  options: string[];
  correctAnswer: string;
}