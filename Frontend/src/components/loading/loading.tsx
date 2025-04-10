import React from 'react';
import './loading.scss';

const Loading: React.FC = () =>
{
    return (
        <div className='loading-container d-flex justify-content-center align-items-center'>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;