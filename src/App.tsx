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

const useCounter = (initialCount : number): [number, incrementCounter] => {
  const [count, setCount] = useState(initialCount);
  const handleClick = (increment: number) => setCount(count + increment);

  return [
    count,
    handleClick
  ];
}

const App: React.FC = () => {
  const [count, handleClick] = useCounter(12);

  return (
    <>
      <div>
        <Button increment={1} onClick={handleClick}/>
        <Button increment={5} onClick={handleClick}/>
        <Button increment={10} onClick={handleClick}/>
        <Button increment={100} onClick={handleClick}/>
      </div>
    <div>{count}</div>
    </>
  );
};

export default App;
