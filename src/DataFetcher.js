import axios from 'axios';

let LINK = 'https://4rqervoat2.execute-api.us-east-1.amazonaws.com/dev'; //todo

export default async function fetchData() {
    // let apiData = getDataFromAPI();
    let myData = null;
    try {
        let resp = await axios.get(LINK);
        myData = resp.data;
    } catch (err) {
        console.error(err);
        console.log('Could not fetch from API.');
    }

    let drugs = [];

    for (let dName in myData) {
        drugs.push({ drugName: dName, drugDesc: myData[dName] });
    }

    return drugs;
}



