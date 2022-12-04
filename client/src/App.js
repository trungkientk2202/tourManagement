/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react';
import './App.css';
import Routes from './routes/routes.component';
import ThemeCustomization from './themes/theme.component';
import { useNavigate } from 'react-router-dom';
import { getItem } from './services/local.service';
import { URL_PATHS } from './constants/routes.constant';
import { LOCAL_STORAGE } from './constants/common.constant';
import { useDispatch, useSelector } from 'react-redux';
import ScrollTop from './components/shared/scroll-top/scroll-top.component';
import { selectCurrentUser } from './redux/auth/auth.selectors';
import { logInThunk } from './redux/auth/auth.slice';

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        const _currentUser = getItem(LOCAL_STORAGE.currentUser);
        if (_currentUser) {
            if (!currentUser) dispatch(logInThunk());
            if (location.pathname === URL_PATHS.HOME) {
                navigate('/dashboard');
            }
        } else {
            dispatch(logInThunk());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    return (
        <ThemeCustomization>
            <Routes />
            <ScrollTop />
        </ThemeCustomization>
    );
}

export default App;
