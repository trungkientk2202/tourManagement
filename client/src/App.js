/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react';
import './App.css';
import Routes from './routes/routes.component';
import ThemeCustomization from './themes/theme.component';
import { useNavigate } from 'react-router-dom';
import { getItem } from './services/local.service';
import { URL_PATHS } from './constants/routes.constant';
import { LOCAL_STORAGE } from './constants/common.constant';
// import { useAppDispatch } from './hooks/hooks';
// import { getMeThunk } from '@features/auth/auth.slice';
// import { selectCurrentUser } from '@features/auth/auth.selectors';
// import { useSelector } from 'react-redux';
import ScrollTop from './components/shared/scroll-top/scroll-top.component';

function App() {
    const navigate = useNavigate();
    // const dispatch = useAppDispatch();
    // const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        const _accessToken = getItem(LOCAL_STORAGE.accessToken);
        if (_accessToken) {
            // if (!currentUser) dispatch(getMeThunk());
            if (location.pathname === URL_PATHS.HOME) {
                navigate('/dashboard');
            }
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
