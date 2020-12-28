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
      let sliceLower = 6 * (pageNum - 1);
      let sliceUpper = 6 * pageNum;
      setDrugArray(drugsFromAPI.slice(sliceLower, sliceUpper));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]); // doesn't need drugsFromAPI as dependency because if pageNum is 0, nothing happens

  return (
    <div class='mainDiv'>
      <h1>Crazy Pharmacist</h1>
      <p>
        Have you ever wondered where the names of perscription drugs come from? It seems like they
        are pulled straight out of someones... head. This is a generator that creates the names of
        fictional pharmaceuticals and their uses. Any resemblance to a real drug is coincidental.
      </p>
      {drugArray.length > 0 && <DrugList drugs={drugArray} />}
      <Button variant="primary" onClick={() => { incrementPageNum() }}>Show More</Button>
      <div class="HowItWorks">
        <h2>How it works</h2>
        <p>
          This type of generator is known as a Markov Model. There are two of them in this project:
          one for the names and one for the descriptions. For each 'state' (letter or word in a name
          or description) that the model encounters when training, it record the state, along with
          the transition to the next state. When done, it stores all states, all transitions and the
          probabilities of observing them.
      </p>
        <p>
          When generating, the model transitions to the next state by picking the next state randomly,
          using the probabilities that were collected when training. This is done until encountering
          a termination state ('.'). Generated sequences are rejected if they are too long, too short
          or don't sound right. Generator source code (in Python and JavaScript!) along with the extracted
        data is available on <a href='https://github.com/alexkalinins/crazy-pharmacist-generator'>GitHub</a>.
      </p>
        <h2>Data Source</h2>
        <p>
          Drug brand names were collected from the National Drug Code (NDC) database. Use descriptions
          were collected from Wikipedia.
      </p>
        <p>If you use this program to name a perscription drug, let me know :) </p>

        <footer>
          Copyright 2020 by Alex Kalinins. All Rights Reserved.
      </footer>
      </div>
    </div >
  );
}

export default App;
