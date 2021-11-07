import axios from 'axios';
// Use this to change the server that the API request is targeting.
const inDevelopment = false;
const host = inDevelopment ? 'http://localhost:3001' : 'https://construction-research.herokuapp.com/';


const pushChanges = (item) => {
    console.log("Update Server function firing", item);
    console.log("Targeting Development", inDevelopment);

    axios.put(host, item)
        .catch(err => console.log(err));

    return;
};


const fetchData = async (item) => {

    const data = await axios.get(host)
        .catch(err => console.log(err));
    return data;
}

const services = {pushChanges, fetchData};

export default services;
