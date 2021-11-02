import React from 'react';
import './App.css';
import services from "./service/server.js";
const { pushChanges } = services;


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      lod: 200, // type int
      panel: 1 // type int
    }
  }

  render () {

    const clickHandler = (item) => {
      // Send updates to the server
      pushChanges(item);
      const { id, type } = item;
      console.log(item);
      this.setState({ [type]: id});
    }
  
    const renderLODButtons = () => {
      const lodOptions = [
          {name: "LOD 200", id: 200, type: 'lod'},
          {name: 'LOD 300', id: 300, type: 'lod'}
        ];

      return lodOptions.map((item) => {
        const { lod } = this.state;
        const style = lod === item.id ? "ActiveButton" : "Button";

        return(
          <div>       
            <button onClick={() => clickHandler(item)} className={style}>
            <p>{item.name}</p>
          </button>
          </div>
        )
      });
    };
  
    const renderPanelButtons = () => {
      const panelOptions = [
        {name: 'Panel 1', id: 1, type: 'panel'}, 
        { name: 'Panel 2', id: 2, type: 'panel'},
        { name: 'Panel 3', id: 3, type: 'panel'},
      ];
  
      return panelOptions.map(item => {
        const panel = this.state.panel;
        const style = panel === item.id ? "ActiveButton": "Button"
        return (
          <button onClick={() => clickHandler(item)} className={style}>
            <p>{item.name}</p>
          </button>
        )
      })
      
      
    }
  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Select Level of Detail</h1>
          <h3>{`LOD: ${this.state.lod}, Panel: ${this.state.panel}`}</h3>
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
}

export default App;
