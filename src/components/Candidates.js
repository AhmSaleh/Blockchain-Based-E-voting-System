import React from 'react'

const Candidates = ({candidates}) => {
    return (
        <div>
            {candidates.length > 0 ? (
                candidates.map((candidate) => (<h1>{candidate.name}</h1>))
            ) : ("There are currently no candidates")}
        </div>
    )
}

export default Candidates