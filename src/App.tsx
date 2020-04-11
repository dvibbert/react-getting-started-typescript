import React, { FC, useState } from 'react';
import logo from './logo.svg';
import './App.css';

type incrementCounter = (increment: number) => void;

interface ButtonProps {
  increment: number;
  onClick: incrementCounter;
}

const Button: FC<ButtonProps> = (props) => {  
  const onClick = () => props.onClick(props.increment);

  return (
    <button onClick={onClick}>+{props.increment}</button>
    )
}

interface IDisplayCount {
  message: number | string;
}
const Display: FC<IDisplayCount> = (props) => {
  return (
    <div>
      {props.message}
    </div>
  );
}

const useCounter = (initialCount : number): [number, incrementCounter] => {
  const [count, setCount] = useState(initialCount);
  const handleClick = (increment: number) => setCount(count + increment);

  return [
    count,
    handleClick
  ];
}

interface CounterControlProps {
  count: number;
  handleClick: incrementCounter;
}

const CounterControl : FC<CounterControlProps> = (props) => (
  <>
    <Display message='Add it up!' />
    <div>
      {
        [1 ,5, 7, 10, 20, 100].map(increment => (
          <Button increment={increment} onClick={props.handleClick} />
        ))
      }
    </div>
    <Display message={props.count} />
  </>
);

const App: React.FC = () => {
  const [count, handleClick] = useCounter(12);

  return (
    <CounterControl count={count} handleClick={handleClick}/>
  );
};

export default App;
