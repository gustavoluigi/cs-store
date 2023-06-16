import { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';

import Router from '../../routes';

function App() {
  return (

    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <HashRouter>
        <Suspense fallback={<h1>Carregando...</h1>}>
          <Router />
        </Suspense>
      </HashRouter>
    </ThemeProvider>

  );
}
export default App;
