import React, { useState, useEffect } from 'react'
import DrugList from './DrugList.js';
import fetchData from './DataFetcher';
import { Button } from 'react-bootstrap';


function App() {
  const [pageNum, setPageNum] = useState(0); // the page number
  const [drugArray, setDrugArray] = useState([]); // the current drug array being showed
  const [drugsFromAPI, setDrugsFromAPI] = useState([]); // latest drugs from api

  function incrementPageNum() {
    switch (pageNum) {
      case 2:
        fetchData().then(data => {
          setDrugsFromAPI(data)
        }).catch(err => {
          console.error(err);
        });
        setPageNum(pageNum + 1); // this should happen before api call finishes
        break;
      case 3:
        // if it's 3, data should have been preloaded in page 2.
        setPageNum(1);
        break;
      default:
        setPageNum(pageNum + 1);
    }
  }

  // works when page first works
  useEffect(() => {
    fetchData().then(data => {
      setDrugsFromAPI(data);
      setPageNum(1);
    }).catch(err => {
      console.error(err);
    });
  }, []);

  useEffect(() => {
    if (pageNum !== 0) {
      let sliceLower = 5 * (pageNum - 1);
      let sliceUpper = 5 * pageNum;
      setDrugArray(drugsFromAPI.slice(sliceLower, sliceUpper));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]); // doesn't need drugsFromAPI as dependency because if pageNum is 0, nothing happens

  return (
    <div>
      {drugArray.length > 0 && <DrugList drugs={drugArray} />}
      <Button variant="primary" onClick={() => { incrementPageNum() }}>Primary</Button>
    </div >
  );
}

export default App;
