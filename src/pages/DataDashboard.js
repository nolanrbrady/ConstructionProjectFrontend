import React from "react";
import services from "../service/server";

class DataDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            recordings: [],
        }
    }

    componentDidMount = async () => {
        const res = await services.fetchRecordings();
        console.log(res);
        if (res.data) this.setState({ recordings: res.data });
    }

    render() {

        const downloadVideo = (video) => {
            const { fileName, url } = video;

            const a = document.createElement("a");

              // Add Props to "a" element
              a.href = url;
              a.download = fileName

              // Click Event
              a.click();

              a.remove();      
        }

        const renderRecordings = () => {
            if(!this.state.recordings.length) {
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