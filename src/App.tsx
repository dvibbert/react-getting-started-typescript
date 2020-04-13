import React, { FC, useState } from 'react';
import './App.css';

enum Status {
  Available,
  Used,
  Wrong,
  Candidate
};

interface StarNumberProps {
  count: number
}
const StarsDisplay: FC<StarNumberProps> = (props) => (
  <>
  {
    utils.range(1, props.count).map(i => (
      <div className="star" key={i} />
    ))
  }
  </>
)

interface PlayNumberProps {
  choice: number;
  status: Status;
  onClick: (choice: number, status: Status) => void
}
const PlayNumber: FC<PlayNumberProps> = (props) => (
    <button 
      className="number" 
      key={props.choice}
      style={ {backgroundColor: getStatusColor(props.status) } }
      onClick={() => props.onClick(props.choice, props.status)}
    >
        {props.choice}
    </button>
)

const getStatusColor = (status: Status) => {
  switch(status) {
    case(Status.Available): return 'lightgray'
    case(Status.Used): return 'lightgreen'
    case(Status.Wrong): return 'lightcoral'
    case(Status.Candidate): return 'deepskyblue'
  }
}

const StarsMatch = () => {
  const noChoices: number[] = [];
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableChoices, setAvailableChoices] = useState(utils.range(1, 9));
  const [candidateChoices, setCandidateChoices] = useState(noChoices); 

  const candidatesAreWrong = utils.sum(candidateChoices) > stars;

  const choiceStatus = (choice: number) => {
  	if (!availableChoices.includes(choice))
    	return Status.Used;
    
    if (!candidateChoices.includes(choice)) 
      return Status.Available;
    
    if (candidatesAreWrong)
      return Status.Wrong;
    
    return Status.Candidate;
  }
 
  const handleChoice = (choice: number, status: Status) => {
    if (status === Status.Used)
      return;

    const newCandidates = status === Status.Available
      ? [choice, ...candidateChoices]
      : candidateChoices.filter(c => c !== choice);
    
    if( utils.sum(newCandidates) !== stars) {
      setCandidateChoices(newCandidates);
      return;
    }

    const newAvailable = availableChoices.filter(c => !newCandidates.includes(c)) 
    setStars(utils.randomSumIn(newAvailable, 9));
    setCandidateChoices(noChoices);
    setAvailableChoices(newAvailable);
  }

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          <StarsDisplay count={stars} />
        </div>
        <div className="right">
          {
            utils.range(1, 9).map((i) => (
              <PlayNumber key={i} choice={i} status={choiceStatus(i)} onClick={handleChoice} />
            ))
          }
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <StarsMatch />
  );
};

const utils = {
  sum: (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0),
  range: (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, i) => min + i),
  random: (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr: number[], max: number) => {
    const sets: number[][] = [[]];
    const sums: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};


export default App;





