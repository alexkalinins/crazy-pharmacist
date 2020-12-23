import React from 'react'
import Drug from './Drug.js';
import './App.css';

export default function DrugList({ drugs }) {
    
    return (
        <div class="DrugList">
            <Drug drug={drugs[0]} />
            <Drug drug={drugs[1]} />
            <Drug drug={drugs[2]} />
            <Drug drug={drugs[3]} />
            <Drug drug={drugs[4]} />
        </div>
    )

}
