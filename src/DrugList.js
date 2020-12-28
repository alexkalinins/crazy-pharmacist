import React from 'react'
import Drug from './Drug.js';
import './App.css';
import { v4 as uuid } from 'uuid';


export default function DrugList({ drugs }) {
    
    return (
        <div class="DrugList">
            {drugs.map(drug=>(
                <Drug drug={drug} key={uuid()} />
            ))}
        </div>
    )

}
