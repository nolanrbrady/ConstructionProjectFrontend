const gdmOptions = {
    video: {
        cursor: "always"
    },
    audio: false
}

let stream = {};

const dumpOptionsInfo = () => {
    // const videoTrack = videoElem.srcObject.getVideoTracks()[0];

    // console.info("Track settings:");
    // console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
    // console.info("Track constraints:");
    // console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
}

const handleRecording = async (isRecording) => {
    console.log("Is Recording", isRecording)
    try {
        stream = await navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: "screen" }
        });
        const recorder = new MediaRecorder(stream);
        const chunks = [];
        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.start();
        recorder.onstop = e => {
            const completeBlob = new Blob(chunks, { type: chunks[0].type });
            console.log("Completed Blob", completeBlob);
            
            const videoUrl = URL.createObjectURL(completeBlob);
            console.log("Video", videoUrl);
            // const myFile = new File([completeBlob],"demo.mp4", { type: 'video/mp4' });
            this.setState ({fileDownloadUrl: videoUrl}, 
                () => {
                  this.dofileDownload.click(); 
                  URL.revokeObjectURL(videoUrl);  // free up storage--no longer needed.
                  this.setState({fileDownloadUrl: ""})
              });

            return videoUrl;
        }
        

    } catch (err) {
        console.log(`Recording failed: ${err}`);
        return null;
    }
}

const stopCapture = (stream) => {
    try {
        // console.log("Stop Capture Video Elements", videoElem);
        // const tracks = videoElem.srcObject.getTracks();
        // console.log("Tracks", tracks);
        // tracks.forEach(track => track.stop());
        // videoElem.srcObject = null;
    } catch (err) {
        console.log(`Stop Capture failed:${err}`);
        return null;
    }
}

const ScreenCapture = {
    handleRecording
}

module.exports = ScreenCapture;