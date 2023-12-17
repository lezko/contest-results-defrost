import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *, *:before, *:after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body {
        height: 100vh;
    }

    body {
        font-family: 'Roboto', sans-serif;
        background-color: #151c2c;
        color: #c6c7c8;
    }
`;