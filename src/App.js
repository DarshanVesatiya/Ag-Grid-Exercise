import React from 'react';
import './App.css';
import AgGridTable from './Components/AgGridTable';
import '@elastic/eui/dist/eui_theme_light.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ag-Grid Table</h1>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <AgGridTable />
      </header>
    </div>
  );
}

export default App;
