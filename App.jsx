import React from 'react';
import 'react-native-gesture-handler';
import MainContainer from './src/Navigation/MainContainer';

import AppFieldsProvider from './src/Context/ContextContainer';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <AppFieldsProvider>
        <MainContainer />
      </AppFieldsProvider>
    </PaperProvider>
  );
};

export default App;
