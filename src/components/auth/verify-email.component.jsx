import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { verifyThunk } from '../../redux/auth/auth.slice';
import selectAuth from '../../redux/auth/auth.selectors';
import { get } from 'lodash';

const VerifyEmail = () => {
    const [message, setMessage] = useState('Verify Successfully!');
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    const { error } = useSelector(selectAuth);
    console.log(error);

    useEffect(() => {
        if (email && token) {
            dispatch(verifyThunk({ email, token }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (error) {
            const _message = get(error, 'message', 'error').toString();
            setMessage(_message);
        }
    }, [error]);

    return <>{message}</>;
};

export default VerifyEmail;
