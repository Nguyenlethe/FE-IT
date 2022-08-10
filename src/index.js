import React from 'react';
import ReactDOM from 'react-dom';
// import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.scss';
import { ToastContainer } from 'react-toastify'
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import IntlProviderWrapper from "./hoc/IntlProviderWrapper";
import GlobalStyle from './components/GlobalStyle/GlobalStyle';

import { Provider } from 'react-redux';
import reduxStore, { persistor } from './redux';

import 'react-toastify/dist/ReactToastify.css';

const renderApp = () => {
    ReactDOM.render(
        <Provider store={reduxStore}>
            <IntlProviderWrapper>
                <GlobalStyle>
                    <App persistor={persistor}/>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </GlobalStyle>
            </IntlProviderWrapper>
        </Provider>,
        document.getElementById('root')
    );
};

renderApp();
serviceWorker.unregister();
