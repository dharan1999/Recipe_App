import React,{useState} from 'react';
import './App.css';

import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import Recipe from './components/Recipe';
import Alert from './components/Alert';
const App = () => {
    const [query,setQuery] = useState("");
    const [recipes,setRecipes] = useState([]);
    const [alert,setAlert] = useState("");
    
    const APP_ID = "cc60ea13";
    const APP_KEY = "a598e14bc2bf345ac1ebc867df3fe755";
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  
  const getData = async () => {
      if(query !== ""){
    const result = await axios.get(url);
    if(!result.data.more) {
        return setAlert("No food with such name");
    }
    setRecipes(result.data.hits);
    console.log(result);
    setAlert("");
    setQuery("");
      }else {
         return setAlert('Please fill the form');
      }

  };
  const onChange = e => {
      setQuery(e.target.value);
  };
  const onSubmit = e => {
      e.preventDefault();
      getData();
  };
    return (
    <div className="App">
        <h1>
        Food Searching App
        </h1>
        <form className='search-form' onSubmit={onSubmit} >
           {alert !== "" && <Alert alert= {alert}/> }
            <input type="text" placeholder="Search the Food" autoComplete='off' onChange={onChange} value={query}/>
           <input type="submit" value="Search"/>
        </form>
        <div className='recipes'> 
            {recipes !== [] && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
        </div>
    </div>
  )
}

export default App