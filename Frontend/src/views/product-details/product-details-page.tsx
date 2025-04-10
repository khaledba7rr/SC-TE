import './product-details-page.scss';
import ProductDetail from '../../components/product-detail/product-detail';
import ErrorComponent from "../../components/error/error";
import Product from '../../types/product';

interface ProductDetailsProps
{
    product: Product;
}

const ProductDetailsPage: React.FC<ProductDetailsProps> = ({product}) =>
{

    if (!product) return <ErrorComponent />
    
    return (
        <div className="product-details-container">
            <ProductDetail product={product} />
        </div>
    );
};

export default ProductDetailsPage;