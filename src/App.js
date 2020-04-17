import React from 'react';
import './App.css';
import AgGridTable from './Components/AgGridTable';
import '@elastic/eui/dist/eui_theme_light.css'
import { EuiTitle, EuiSpacer, EuiHeader } from '@elastic/eui'; 
function App() {
  return (
    <div className="App">
      <EuiHeader position="static" sections={[
        {
          items:[ <EuiTitle size="l"><h1  style={{color:'#006BB4'}}>AG-GRID TABLE</h1></EuiTitle>]
        }
      ]}>
        </EuiHeader>
        <EuiSpacer />
        <AgGridTable />
    </div>
  );
}

export default App;
