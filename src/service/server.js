import axios from 'axios';
const inDevelopment = true;
const host = inDevelopment ? 'http://localhost:3001' : 'dev server url';


const pushChanges = (item) => {
    console.log("Update Server function firing");

    // axios.get(host, item)
    //     .then(res => { console.log(res)})
    //     .catch(err => console.log("There was an error:", err));

    // const options = {
    //     method: 'POST',
    //     body: JSON.stringify(item),
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': 'http://localhost:3001/',
    //         'Access-Control-Allow-Methods': 'POST',
    //         'Access-Control-Allow-Headers': 'Content-Type'
    //     }
    // }

    axios.put(host, { test: 'hello world' }).catch(err => console.log(err));

    return;
};


const fetchData = (item) => {
    console.log("Fetch Data is firing");
    return;
}

const services = {pushChanges, fetchData};

export default services;
