//#region [ Import React ]
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//#endregion

//#region [ Import Material UI ]
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
//#endregion

import { IndexView } from './views/IndexView';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#52B0C9",
        }
    }
});
ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <IndexView />
    </MuiThemeProvider>,
    document.getElementById('app')
);