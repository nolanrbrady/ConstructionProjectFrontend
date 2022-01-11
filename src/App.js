import React from 'react';
import './App.css';
import services from "./service/server.js";
const { DateTime } = require('luxon');
const { pushChanges, fetchData } = services;


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      lod: 200, // type int
      panel: 1, // type int
      previousLod: null,
      previousPanel: null,
      username: 'colinsoguero',
      password: 'Blewws49',
      studyInProgress: false,
    }
  }

  componentDidMount = async() => {
    const res = await fetchData();

    const { lod, panel } = res.data;

    this.setState({ lod, panel });
  }

  render () {
    
    const clickHandler = (item) => {
      // Send updates to the server
      const { id, type } = item;
      const previousLod = this.state.lod;
      const previousPanel = this.state.panel;

      this.setState({ [type]: id, previousLod, previousPanel}, (next) => {
        const { lod, panel } = this.state;
        pushChanges({ lod, panel, previousLod, previousPanel });
      });
    }

    const toggleActiveStudy = () => {
      if(this.state.studyInProgress) return alert("Please use screen capture panel to finish Study");
      this.setState({ studyInProgress: !this.state.studyInProgress });
      if (!this.state.studyInProgress) handleRecording();
    }


    const handleRecording = async () => {
      try {
          let stream = await navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: "screen" }
          });
          const recorder = new MediaRecorder(stream);
          let chunks = [];
          recorder.ondataavailable = e => {
            chunks.push(e.data)
          };
          recorder.start();
        
          // Event listener for recording to stop
          recorder.onstop = e => {
              const completeBlob = new Blob(chunks, { type: chunks[0].type });
              let video = {};
              const url = URL.createObjectURL(completeBlob);
              video.url = url;
              const fileName = `sessionRecording_${DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}`;
              this.setState({ studyInProgress: false });

              // Save Video
              services.saveVideo(fileName, completeBlob, video);
              // console.log("Error in when saving video", err);

              // // Save Video Locally
              // if (err) {
              //   downloadVideoLocally(fileName, video);              
              // }
              return video;
          }
      } catch (err) {
          console.log(`Recording failed: ${err}`);
          return null;
      }
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
        <header className="App-body">
          <div className="App-main">
            <h1>Select Level of Detail</h1>
            <h3>{`LOD: ${this.state.lod}, Panel: ${this.state.panel}`}</h3>
            <div className="Button-container">
              {renderLODButtons()}
            </div>
            <h1>Select Panel</h1>
            <div className="Button-container">
              {renderPanelButtons()}
            </div>
            <div style={{ paddingTop: '2em' }}>
              <button 
              onClick={() => toggleActiveStudy()} 
              className={this.state.studyInProgress ? "Active-study" : "Inactive-study"}>
                <h3 style={{ color: 'white' }}>{this.state.studyInProgress ? "End Study" : "Begin Study"}</h3>
              </button>
            </div>
          </div>
          <div className="Video-container">
          <video autoPlay controls className="Live-stream">
            <source type="video/mp4" src={`https://${this.state.username}:${this.state.password}@10.201.58.95//api/holographic/stream/live_high.mp4?holo=true&pv=true&mic=true&loopback=true`}/>
          </video>
        </div>       
        </header>
      </div>
    );
  }
}

export default App;
