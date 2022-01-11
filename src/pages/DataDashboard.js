import React from "react";
import services from "../service/server";
import '../App.css';
import Spinner from 'react-bootstrap/Spinner';
const R = require('ramda');
const dataURLtoBlob = require('dataurl-to-blob');

class DataDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            recordings: [],
            loading: false,
            error: null,
        }
    }

    componentDidMount = async () => {
        this.setState({ loading: true }, async () => {
            const res = await services.fetchRecordings();
            console.log(res);
            
            // Handle errors from server
            res.status === 200 ? this.setState({ error: false}) : this.setState({ error: res.statusText})

            if (res.data) this.setState({ recordings: R.reverse(res.data), loading: false });
            else return;
        });
    }

    render() {

        const downloadVideo = (video) => {
            const { fileName, url } = video;

            const blob = dataURLtoBlob(url);

            const downloadURL = URL.createObjectURL(blob);

            const a = document.createElement("a");

              // Add Props to "a" element
              a.href = downloadURL;
              a.download = `${fileName}.webm`

              // Click Event
              a.click();

              a.remove();      
        }

        const renderRecordings = () => {
            if(this.state.loading) {
                return (
                    <div className="Spinner-container">
                        <Spinner animation="border" />
                        <h3>Loading Videos. This may take several minutes. Thank you</h3>
                    </div>
                )
            } else if (this.state.error) {
                return <h3>{this.state.error}</h3>
            } else if(!this.state.recordings.length) {
                return <h3>No Recordings to Display</h3>
            } else {
                console.log(this.state.recordings);
                return this.state.recordings.map(video => {
                    return (
                        <button onClick={() => downloadVideo(video)}>
                            <p>{video.fileName}</p>
                        </button>
                    )
                });
            }
        }

        return (
            <div>
                <h1>Data</h1>
                <div>{renderRecordings()}</div>
            </div>
        )
    }
}

export default DataDashboard;
