import React, { FC, useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface ButtonProps {
  count: number;
  onClick: () => void;
}

const Button: FC<ButtonProps> = (props) => {  
  return (
    <button onClick={props.onClick}>{props.count}</button>
    )
}

const useCounter = (initialCount : number): [number, () => void] => {
  const [count, setCount] = useState(initialCount);
  const handleClick = () => setCount(count + 1);

  return [
    count,
    handleClick
  ];
}

const App: React.FC = () => {
  const [count, handleClick] = useCounter(12);

  return (
    <Button count={count} onClick={handleClick}/>
  );
};

export default App;
