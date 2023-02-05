/*
import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
//useeffect allows you to fetch component before its mounted.
document.body.style.backgroundColor = 'black';
document.body.style.color = 'white';

function Food() {
  const options = ["Milk", "Egg", "Peanuts", "Fish", "Shellfish", "Fish", "Soy", "Tree Nut", "Sesame", ]
  return (
    <select id = "AllergenSelect">
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
  const options = ["College 9/ Lewis Dining Hall", "Porter", "Crown", "Cowell"]
  return (
    <select id = "HallSelect">
      <option>Please select a dining hall</option>
      {options.map((option,index)=>{
        return <option key = {index}>
          {option}
        </option>
      })}
    </select>
  );
}

function DayOfWeek(){
  const day = ["Sunday", "Monday", "Tuesday", "Wesdneday.", "Thurday", "Friday", "Saturday"]
  return (
    <select id = "DaySelect">
      <option>Please select the day of the week you are going</option>
      {day.map((option,index)=>{
        return <option key = {index}>
          {option}
        </option>
      })}
    </select>
  );
}





export default function MyApp() {

  var width = (window.innerWidth/(2)-170);
  var text = document.getElementById('test')
  text.style.position = 'absolute'
  text.style.top = '20px'
  text.style.left = `${width}px`;

  var width2 = (window.innerWidth/8);
  var text1 = document.getElementById('AllergenSelect')
  text1.style.position = 'absolute'
  text1.style.top = '150px'
  text1.style.left = `${width2}px`;

  var width3 = (window.innerWidth/2)-70;
  var text2 = document.getElementById('HallSelect')
  text2.style.position = 'absolute'
  text2.style.top = '150px'
  text2.style.left = `${width3}px`;

  var width4 = (window.innerWidth)-430;
  var text3 = document.getElementById('DaySelect')
  text3.style.position = 'absolute'
  text3.style.top = '150px'
  text3.style.left = `${width4}px`;

  return (
    
    <div>
      <h1 id = "test">UCSC Allergen Reminder</h1>
      <img src="https://nutrition.sa.ucsc.edu/images/dining-logo-foodpro.png" alt="Example Image"/>
      "comment: DO NOT HIT REFRESH."
      <DayOfWeek/>
      <Food />
      <Hall />
    </div>
  );
}
*/


import React, {useEffect, useState} from "react";
import axios from "axios";
import {format} from "date-fns"
import "./App.css"
document.body.style.backgroundColor = 'darkblue';
document.body.style.color = 'white';



function App() {
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/", {
        selectedOption1,
        selectedOption2,
        selectedOption3,
      },{
        headers:{
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  
  

  return (

    
    <div>
      
    <img src="https://nutrition.sa.ucsc.edu/images/dining-logo-foodpro.png" alt="UcscDining"/>  
    <form onSubmit={handleSubmit}>
      <h1 id = "test">UCSC Allergens Reminder.</h1>
      <h3>Welcome to the UCSC Allergens Reminder Website. We are dedicated to 
        making sure that people with any food allergies will have meals at any dining hall
        that are suitable for them everday. 
      </h3>

      <h4>Please select any allergies you have, which dining hall you plan to go to, and 
        what day of week you are going. It will then display the list of dishes that should 
        be prevented.
      </h4>
      
      
      <label htmlFor="selectedOption1">Select allergies: </label>
      <select
        id="selectedOption1"
        value={selectedOption1}
        onChange={(e) => setSelectedOption1(e.target.value)}
      >
        <option value="">Select</option>
        <option value="Milk">Milk</option>
        <option value="Egg">Egg</option>
        <option value="Peanut">Peanut</option>
        <option value="Fish">Fish</option>
        <option value="Shellfish">Shellfish</option>
        <option value="Soy">Soy</option>
        <option value="Tree Nut">Tree Nut</option>
        <option value="Sesame">Sesame</option>
        


        
      </select>
      <br />
      <br />
      <label htmlFor="selectedOption2">Select Dining Hall: </label>
      <select
        id="selectedOption2"
        value={selectedOption2}
        onChange={(e) => setSelectedOption2(e.target.value)}
      >
        <option value="">Select</option>
        <option value="College 9/ Lewis Dining Hall">College 9/ Lewis Dining Hall</option>
        <option value="Porter/ Kresge Dining Hall">Porter/ Kresge Dining Hall</option>
        <option value="Crown/ Merrill Dining Hall">Crown/ Merrill Dining Hall</option>
        <option value="Cowell/ Stevenson Dining Hall">Cowell/ Stevenson Dining Hall</option>
      </select>
      <br />
      <br />
      <label htmlFor="selectedOption3">Select Day of Week: </label>
      <select
        id="selectedOption3"
        value={selectedOption3}
        onChange={(e) => setSelectedOption3(e.target.value)}
      >
        <option value="">Select</option>
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wesdneday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
      </select>
      <br />
      <br />
      <button type="submit">Submit</button>
    </form>
    </div>
  );

}

export default App;

