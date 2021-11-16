import axios from 'axios';
// Use this to change the server that the API request is targeting.
const inDevelopment = false;
const host = inDevelopment ? 'http://localhost:3001' : 'https://construction-research.herokuapp.com/';


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

    axios.put(`${host}config-change-log`, data)
        .catch(err => console.log(err));
}

const fetchData = async (item) => {

    const data = await axios.get(host)
        .catch(err => console.log(err));
    return data;
}

const services = {pushChanges, fetchData};

export default services;
