import React from 'react'
import Drug from './Drug.js';
import './App.css';

export default function DrugList({ drugs }) {
    
    return (
        <div class="DrugList">
            {drugs.map(drug=>(
                <Drug drug={drug} />
            ))}
        </div>
    )

}
