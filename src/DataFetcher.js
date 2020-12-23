import axios from 'axios';

let LINK = 'https://4rqervoat2.execute-api.us-east-1.amazonaws.com/dev'; //todo

export default async function fetchData() {
    // let apiData = getDataFromAPI();
    let myData = null;
    try {
        let resp = await axios.get(LINK);
        console.log(resp);
        myData = resp.data;
    } catch (err) {
        console.error(err);
        console.log('ioadfadsfa wef');
    }
    console.log('data from api: ');
    console.log(myData);
    console.log('data is null? ' + null == myData);
    // let dataObj = JSON.parse(myData);
    let dataObj = myData;

    let drugs = [];

    for (let dName in dataObj) {
        drugs.push({ drugName: dName, drugDesc: dataObj[dName] });
    }

    return drugs;
}



