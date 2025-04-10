import React, { useState } from 'react';
import './product-detail.scss';
import Product from '../../types/product';
import Loading from '../loading/loading';
import parse from 'html-react-parser';
import AttributeValues from '../attribute-values/attribute-values';

interface ProductDetailProps {
    product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) =>
{
    
    const { price, symbol } = product.prices[0];
    const { name, description } = product;


    const HandleImageChange = (imageUrl: string) => {
        setCurrentImageUrl(imageUrl);
    };

    const HandleLoadImageValue = (value: boolean) => {
        setIsImageLoaded(value);
    };

    const [currentImageUrl, setCurrentImageUrl] = useState<string>(product.images[0].url);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);


    return (
        <div id="main-container" className="d-flex flex-column flex-md-row justify-between-md-around my-5">
            <div className="product-detail-image-container d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-center col-12 col-md-8">
                <div className="product-images-container p-3">
                    <div className="thumbs-container d-flex flex-wrap flex-md-column justify-content-end align-items-center">
                        {product.images.map((image) => (
                            <div key={image.url} className={`sinlge-thumb-container ${image.url === currentImageUrl && 'selected'} thumb-image m-1`} onClick={() => HandleImageChange(image.url)}>
                                { !isImageLoaded &&  <Loading />}
                                <img src={image.url} alt={product.name} onLoad={() => HandleLoadImageValue(true)} className="image" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="main-image p-3 w-75">
                    <div className="main-image-container d-flex justify-content-center align-items-center">
                        <img src={currentImageUrl} alt={product.name} className="main-image" />
                    </div>
                </div>
            </div>

            <div className="product-detail-info-container d-flex flex-column justify-content-between justify-content-md-around align-items-center align-items-md-start col-12 col-md-2">
                <div className="product-name w-100 d-flex">
                    <p>{name}</p>
                </div>

                <div className="product-attributes w-100 d-flex flex-column justify-content-md-between align-items-start align-items-md-start">
                    {product.attributes.map((attribute) => (
                        <div key={attribute.id} className="my-3">
                            <div className="attribute-name">{attribute.name}:</div>

                            <div className="attribute-values d-flex flex-wrap">
                                { <AttributeValues type={attribute.type} attributeValues={attribute.values} /> }
                            </div>
                        </div>
                    ))}
                </div>

                <div className="product-price w-100 d-flex flex-column">
                    <p className="product-price-title">Price:</p>
                    <div className="actual-price">
                        {symbol} {price}
                    </div>
                </div>

                <div className="product-add-to-cart-btn w-100">
                    <button className="w-100 my-5">Add to cart</button>
                </div>

                <div className="product-description w-100">{ parse(description) }</div>
            </div>
        </div>
    );
};

export default ProductDetail;
