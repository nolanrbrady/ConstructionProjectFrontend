import axios from 'axios';
// Use this to change the server that the API request is targeting.
const inDevelopment = false;
const host = inDevelopment ? 'http://localhost:3001' : 'https://construction-research.herokuapp.com';


const pushChanges = (item) => {
    const { lod, panel } = item;
    axios.put(host, { lod, panel })
        .catch(err => console.log(err));

    console.log(item);
    logConfigurationChange({...item, timeChanged: new Date()});

    return;
};

const logConfigurationChange = (item) => {
    const data = {
        ...item,
        currentPanel: item.panel,
        currentLod: item.lod
    }

    axios.put(`${host}/config-change-log`, data)
        .catch(err => console.log(err));
}

const fetchData = async (item) => {

    const data = await axios.get(host)
        .catch(err => console.log(err));
    return data;
}

const saveVideo = (fileName, blob, video) => {
  // convert blob to Base64
  const a = new FileReader();
  a.readAsDataURL(blob);
  let error = null;

  a.addEventListener("load", () => {
    let url = a.result;

    const data = { fileName, url };

    axios.post(`${host}/session-recording`, data)
        .catch(err => {
            console.log(err);
            error = err;
        });

    if (error) {
        alert(`There was an error: ${error}. Local Download Starting`);
        downloadVideoLocally(fileName, video);
    } else alert("Video uploaded Successfully!");

    error = null;
  });

  return;
}


// Back up download incase the server goes down or something
const downloadVideoLocally = (fileName, video) => {
    const { url } = video;
    const a = document.createElement("a");
    // Add Props to "a" element
    a.href = url;
    a.download = `${fileName}.webm`;

    // Click Event
    a.click();

    a.remove();
    return;
}

const fetchRecordings= async() => {
    const data = await axios.get(`${host}/session-recording`)
        .catch(err => console.log(err));
    return data;
}

const services = {
    pushChanges, 
    fetchData, 
    saveVideo,
    fetchRecordings
};

export default services;
