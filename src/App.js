import React, { useState, useEffect } from 'react'
import DrugList from './DrugList.js';
import fetchData from './DataFetcher';
import { Button } from 'react-bootstrap';

let generatedDrugs = [15];
let preload = null;

function App() {
  let placeholderDrugs = [{ drugName: 'PlaceHolder', drugDesc: 'poop' },
  { drugName: 'PlaceHolder', drugDesc: 'poop' },
  { drugName: 'PlaceHolder', drugDesc: 'poop' },
  { drugName: 'PlaceHolder', drugDesc: 'poop' },
  { drugName: 'PlaceHolder', drugDesc: 'poop' }];

  const [pageNum, setPageNum] = useState(0);
  const [drugArray, setDrugArray] = useState([]);

  useEffect(() => {
    console.log('running on first time????');
    setDrugArray(getDrugSlice(0));
  }, []);

  useEffect(() => {
    console.log(drugArray);
  },[drugArray]);

  function loadFromAPI() {
    console.log('Call to LOAD from API');
    fetchData().then((data) => {
      console.log('Got Drugs')
      generatedDrugs = data;
      setDrugArray(data);
    }).then(_ => {
      setPageNum(1);
    }).catch(poop => console.log(poop));
  }

  function preloadFromAPI() {
    console.log('Call to PRELOAD from API');
    fetchData().then((data) => {
      console.log('Got Drugs')
      preload = data;
    }).catch(poop => console.log(poop));
  }

  function getDrugSlice(sliceNumber) {
    console.log('Call to get drug slice of number: ' + sliceNumber)
    if (sliceNumber === 0) {
      loadFromAPI();
      return placeholderDrugs
    }

    /*
    Slice number 
    1 2 3
    lower
    0 5 10
    upper (exclusive)
    5 10 15
    */
    let sliceLower = 5 * (sliceNumber - 1);
    let sliceUpper = 5 * sliceNumber;

    return generatedDrugs.slice(sliceLower, sliceUpper);
  }

  function incrementPageNum() {
    console.log('Incrementing page number');
    if (pageNum === 2) {
      preloadFromAPI();
    }

    if (pageNum === 3) {
      generatedDrugs = preload;
      setPageNum(1);
      return;
    }

    setPageNum(pageNum + 1);
  }

  //! place holder not necessary!!!! cuz it wont render if empty!

  return (
    <div>
      {drugArray.length>0 && <DrugList drugs={drugArray} />} 
      <Button variant="primary" onClick ={()=>{console.log('I wass pressed')}}>Primary</Button>
    </div >
  );
}

export default App;
