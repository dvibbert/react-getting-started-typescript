import React, { FC, useState } from 'react';
import './App.css';

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

const StarMatch = () => {
  const [stars, setStars] = useState(utils.random(1, 9));

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {
            utils.range(1, stars).map(i => (
              <div className="star" />
            ))
          }
        </div>
        <div className="right">
          {
            utils.range(1, 9).map( i => (
              <button className="number">{i}</button>
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
    <StarMatch />
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





