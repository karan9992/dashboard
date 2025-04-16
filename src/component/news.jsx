import React, { useState,useEffect } from 'react'
import Global from './newsRoute/Global';
import { Link } from 'react-router-dom';
import Card from './newsRoute/Card';





function News() {
    const [search, setSearch] = useState("general"); //business entertainment general health science sports technology
    const [newsData, setNewsData] = useState(null)
    const API_KEY = "9c3ed8ee95884dec979460a60f96675b"; //4YlNiYK0Djy9vABo6KaIs2M61YA041kOEgKzq0Xu
    const API_KEY2="9cc539cb7fbe4820889023ce13e06b69";
    const apiUrl=`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY2}`
    //https://newsapi.org/v2/top-headlines?country=us&apiKey=
     const apiUrl2=`https://newsapi.org/v2/top-headlines?category=${search}&apiKey=${API_KEY2}`

    const getData = async() =>{
        try{
        const response = await fetch(apiUrl2);
        const jsonData = await response.json();
        // console.log(jsonData);
        let dt = jsonData.articles.slice(0,3)
        // console.log(dt)
        setNewsData(dt)
        }
        catch(error){
            console.log(error)
        }
        
        
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
        <>
            <nav>
                <button  onClick={userInput} value="general" className='news-button'>General</button> 
                <button  onClick={userInput} value="sports" className='news-button'>Sports</button>
                <button  onClick={userInput} value="business" className='news-button'>Business</button>
                <button  onClick={userInput} value="technology" className='news-button'> Tech</button>
               
            </nav>
            <div id="topNews">
        {newsData?  <Card data={newsData}/> : null}
            
        </div>
           
        </>
    )
}

export default News