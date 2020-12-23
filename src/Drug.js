import React from 'react'

export default function Drug({drug}) {
    return (
        <div class="Drug">
            <h3>{drug.drugName}</h3>
            <p>{drug.drugDesc}</p>
        </div>
    )
}
