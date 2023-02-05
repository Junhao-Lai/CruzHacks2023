import './App.css';
//import axios from 'axios';
//import {useState, useEffect} from 'react';
//useeffect allows you to fetch component before its mounted.
document.body.style.backgroundColor = 'black';
document.body.style.color = 'white';

function Food() {
  const options = ["Milk", "Egg", "Peanuts", "Fish", "Shrimp"]
  return (
    <select>
      <option>Please select an allergen.</option>
      {options.map((option,index)=>{
        return <option key = {index}>
          {option}
        </option>

      })}
    </select>
  );
}

function Hall() {
  const options = ["9/10 Dining Hall", "Porter", "Crown", "Cowell"]
  return (
    <select>
      <option>Please select a dining hall</option>
      {options.map((option,index)=>{
        return <option key = {index}>
          {option}
        </option>
      })}
    </select>
  );
}



export default function MyApp() {
  return (
    <div>
      <h1>UCSC Allergen Reminder</h1>
      <Food />
      <Hall />
    </div>
  );
}
//export default App;
