import Attribute from "./attribute";
import Category from "./category";
import Image from "./image";
import Price from "./price";


type Product = {
    id: string;
    name: string;
    brand: string;
    description: string;
    in_stock: boolean;
    prices: Price[];
    images: Image[];
    attributes: Attribute[];
    category: Category;
    categoryId: number;
}


export default Product;