import React from 'react'

export default function Drug({ drug }) {
    return (
        <div class="Drug">
            <h3 class="DrugTitle">{drug.drugName}</h3>
            <p class="DrugDesc">{drug.drugDesc}</p>
        </div>
    )
}
