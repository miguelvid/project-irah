//MENUS
export interface Menu {
  id: number;
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
}
// BEBIDAS
export interface Drink {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'WINE' | 'SPARKLING' | 'BEER' | 'DIVERSE';
  wineType: 'RED' | 'WHITE' | 'ROSE';
}


// FORMULÁRIOS MENUS
export interface MenuFormData {
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
}

// FORMULÁRIOS BEBIDAS
export interface DrinkFormData {
  name: string;
  description: string;
  price: number;
  category: 'WINE' | 'SPARKLING' | 'BEER' | 'DIVERSE';
  wineType: 'RED' | 'WHITE' | 'ROSE';
}

// NOTIFICAÇÕES
export interface NotificationType {
  type: 'success' | 'error';
  message: string;
}