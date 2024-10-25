export interface Fruit {
    name: string;
    id: number;
    Family: string;
    Order: string;
    Genus: string;
    nutritions: {
      calories: number;
      fat: number;
      sugar: number;
      carbohydrates: number;
      protein: number;
    };
  }