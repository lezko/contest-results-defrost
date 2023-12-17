import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/App.tsx';
import { Provider } from 'react-redux';
import { persistor, store } from '@/redux';
import { GlobalStyle } from '@/styles/GlobalStyle.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { SelectFile } from '@/pages/select-file.tsx';
import { ConfigProvider } from 'antd';

const router = createHashRouter([
    {
        path: '/select-file',
        element: <SelectFile />
    },
    {
        path: '/results',
        element: <App />
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ConfigProvider theme={{
                    token: {
                        colorBgBase: '#151c2c',
                        colorTextBase: '#c6c7c8'
                    }
                }}>
                    < GlobalStyle / >
                        < RouterProvider router={router} />
                </ConfigProvider>
            </PersistGate>
        </Provider>
    </StrictMode>
,
);
