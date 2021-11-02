import axios from 'axios';
const inDevelopment = true;
const host = inDevelopment ? 'http://localhost:3001' : 'dev server url';


const pushChanges = (item) => {
    console.log("Update Server function firing", item);

    axios.put(host, item)
        .catch(err => console.log(err));

    return;
};


const fetchData = (item) => {
    console.log("Fetch Data is firing");
    return;
}

const services = {pushChanges, fetchData};

export default services;
