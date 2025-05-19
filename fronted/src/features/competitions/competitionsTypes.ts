export interface CompetitionItem {
  _id:string
  category: string;
  rating: number;
  file: string;
  ownerId: string;
  ownerEmail: string;
}

export interface Category {
  pictures: string;
  recipes: string; 
  exams: string;
}
export type CategoryKeys = keyof Category;
