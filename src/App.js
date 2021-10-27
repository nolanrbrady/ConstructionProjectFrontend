import './App.css';


function App() {

  const clickHandler = (item) => {
    console.log(item);
  }

  const renderLODButtons = () => {
    const lodOptions = [
        {name: "LOD 200", id: "lod200"},
        {name: 'LOD 300', id: "lod300"}
      ];
    return lodOptions.map((item) => {
      return(
        <div>       
          <button onClick={() => clickHandler(item)} className="Button">
          <p>{item.name}</p>
        </button>
        </div>
      )
    });
  };

  const renderPanelButtons = () => {
    const panelOptions = [
      {name: 'Panel 1', id: 'panel1'}, 
      { name: 'Panel 2', id: 'panel2'},
      { name: 'Panel 3', id: 'panel3'},
    ];

    return panelOptions.map(item => {
      return (
        <button onClick={() => clickHandler(item)} className="Button">
          <p>{item.name}</p>
        </button>
      )
    })
    
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Select Level of Detail</h1>
        <div className="Button-container">
          {renderLODButtons()}
        </div>
        <h1>Select Panel</h1>
        <div className="Button-container">
          {renderPanelButtons()}
        </div>       
      </header>
    </div>
  );
}

export default App;
