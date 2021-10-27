import axios from 'axios';
const inDevelopment = true;
const host = inDevelopment ? 'http://localhost:3001/' : 'dev server url';


const pushChanges = (item) => {
    console.log("Update Server function firing");

    axios.post(host, item)
        .then(res => { console.log(res)})
        .catch(err => console.log("There was an error", err));

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

    // fetch(host, options)
    //     .then(res => {
    //         if (!res.ok) {
    //             console.log(res); 
    //         }

    //     })
    //     .catch(err => console.log(err));

    return;
};


const fetchData = (item) => {
    console.log("Fetch Data is firing");
    return;
}

const services = {pushChanges, fetchData};

export default services;
