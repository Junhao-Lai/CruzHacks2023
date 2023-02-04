import './App.css';
//import axios from 'axios';
//import {useState, useEffect} from 'react';
//useeffect allows you to fetch component before its mounted.

function MyButton() {
  const options = ["Milk", "Egg", "Peanuts"]
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

export default function MyApp() {
  return (
    <div>
      <h1>UCSC Allergen Reminder</h1>
      <MyButton />
    </div>
  );
}
//export default App;
