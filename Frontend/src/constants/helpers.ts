
import Category from "../types/category";


export const defaultCategory: Category = { id: 1, name: 'all' };

export const getCategoryObjectByName = (categoryName: string): Category =>
  {
    const categories: Category[] = [
      { id: 1, name: 'all' },
      { id: 2, name: 'clothes' },
      { id: 3, name: 'tech' },
    ];

    const foundCategory = categories.find(
      (category) => category.name.toLowerCase() === categoryName.toLowerCase(),
    );

    return foundCategory || defaultCategory;
  }