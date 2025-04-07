export interface Restaurant {
  id: string;
  name: string;
}

export interface Menu {
  id: number | null;
  name: string;
  starter: string;
  starterPrice: number;
  salad: string;
  saladPrice: number;
  mainCourse: string;
  mainCoursePrice: number;
  dessert: string;
  dessertPrice: number;
  totalPrice: number;
  imageUrl: string;
  restaurantId: string;
}

export interface Drink {
  id: number | null;
  name: string;
  description: string;
  price: number;
  category: string;
  wineType: string;
  restaurantId: string;
}
