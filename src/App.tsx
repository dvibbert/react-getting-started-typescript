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

const App: React.FC = () => {
  const [count, handleClick] = useCounter(12);

  return (
    <>
      <Display message='Add it up!' />
      <div>
        <Button increment={1} onClick={handleClick} />
        <Button increment={5} onClick={handleClick} />
        <Button increment={10} onClick={handleClick} />
        <Button increment={100} onClick={handleClick} />
      </div>
      <Display message={count} />
    </>
  );
};

export default App;
