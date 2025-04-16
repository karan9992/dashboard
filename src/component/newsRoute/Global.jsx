import React from 'react'
import {useState,useEffect} from 'react'

function Global() {
    const [search, setSearch] = useState("india");
    const [newsData, setNewsData] = useState(null)
    const API_KEY = "9c3ed8ee95884dec979460a60f96675b";

    const getData = async() =>{
        const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
        const jsonData = await response.json();
        // console.log(jsonData.articles);
        let dt = jsonData.articles.slice(0,5)
        console.log(dt)
        setNewsData(dt)
        
    }

    useEffect(()=>{
        getData()
    },[search])

    const handleInput = (e) =>{
        console.log(e.target.value);
        setSearch(e.target.value)
        
    }
    const userInput = (event) =>{
        setSearch(event.target.value)
    }
    return (
        <div id="topNews">Global
         <button onClick={userInput} value="sports">Sports</button>
            <button onClick={userInput} value="politics">Politics</button>
            <button onClick={userInput} value="entertainment">Entertainment</button>
            <button onClick={userInput} value="health">Health</button>
            <button onClick={userInput} value="fitness">Fitness</button>
            
            {/* <div className="newsBox"><div className="newsImg"></div><a href=""></a></div>
            <div className="newsBox"><div className="newsImg"></div><a href=""></a></div>
            <div className="newsBox"><div className="newsImg"></div><a href=""></a></div> */}

        </div>
    )
}

export default Global