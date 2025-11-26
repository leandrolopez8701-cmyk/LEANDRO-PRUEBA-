export enum Category {
  RANDOM = 'Aleatorio',
  SCIENCE = 'Ciencia',
  HISTORY = 'Historia',
  NATURE = 'Naturaleza',
  TECH = 'Tecnología',
  SPACE = 'Espacio',
  ART = 'Arte'
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface FactData {
  text: string;
  sources: GroundingSource[];
  category: Category;
  timestamp: number;
}

export interface AppState {
  currentFact: FactData | null;
  history: FactData[];
  isLoading: boolean;
  selectedCategory: Category;
  error: string | null;
}