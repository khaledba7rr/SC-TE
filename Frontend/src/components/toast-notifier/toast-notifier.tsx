import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    setOrderProccessFailed,
    setOrderProccessSuccess,
  } from '../../store/cart-slice';

interface ToasterNotifierArguments {
    title: string;
    messageDetails: string;
    isSuccess: boolean;
}

const ToasterNotifier: React.FC<ToasterNotifierArguments> = ({
    title,
    messageDetails,
    isSuccess,
}) => {
    const dispatch = useDispatch();

    const handleRemoveNotifiers = () => {
        dispatch(setOrderProccessFailed(false));
        dispatch(setOrderProccessSuccess(false));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            handleRemoveNotifiers();
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="error-popup-container d-block">
            <div className="toast-container d-block position-fixed bottom-0 end-0 p-4">
                <div id="liveToast" className="toast d-block">
                    <div
                        className={`toast-header ${!isSuccess ? 'bg-danger' : 'bg-success'}`}
                    >
                        <i className="bi bi-exclamation-octagon-fill px-2"></i>
                        <strong className="me-auto">{title}</strong>
                        <small>{!isSuccess ? 'Error' : 'Success'}</small>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={handleRemoveNotifiers}
                        ></button>
                    </div>
                    <div className="toast-body">{messageDetails}</div>
                </div>
            </div>
        </div>
    );
};

export default ToasterNotifier;