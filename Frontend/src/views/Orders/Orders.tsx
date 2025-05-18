import OrderItems from '../../components/order-card/order-items';
import './orders.scss';

const Orders: React.FC = () => {
    return (
        <div id='main-container' className="orders-listing p-5">
            <div className="orders-container d-flex align-items-center flex-column mt-5">

                <div className='heading fs-2 border-bottom border-3 border-black pb-2'>
                    <h1> Orders </h1>
                </div>

                <div className="orders-content mt-3 w-100 border p-3 rounded">
                    <OrderItems />
                </div>
            </div>
        </div>
    );
};

export default Orders;