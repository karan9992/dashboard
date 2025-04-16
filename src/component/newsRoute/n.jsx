import React from 'react'

function Sport() {
  
      const [newsArray, setNewsArray]= useState([]);
      const[userInput,setUserInput]=useState("India");
      let NewsObj = {
          title:"",
          url:"",
          description:"",        
          image_url:"",
          source:"trust me bro",              
  
      }
      let country = "in";
      let categories = "general";
      let search = "";
      const api = "9c3ed8ee95884dec979460a60f96675b";                             //"4YlNiYK0Djy9vABo6KaIs2M61YA041kOEgKzq0Xu"
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${api}`
  
      function setParams(event) {
  
          setUserInput(event.target.value);
          let params = {
              api_token:"4YlNiYK0Djy9vABo6KaIs2M61YA041kOEgKzq0Xu",
              // general | science | sports | business | health | entertainment | tech | politics | food | travel
              categories: userInput,
              limit: '5',
              locale: 'in',
              language: 'en',
              search: '',
              sort: 'published_on'
          };
  
          let result=getNews(params);
          console.log("res is ",result)
      }
      function getNews(params) {
          let requestOptions = {
              method: 'GET'
          };
          var esc = encodeURIComponent;
          var query = Object.keys(params)
              .map(function (k) { return esc(k) + '=' + esc(params[k]); })
              .join('&');
          //TOP NEWS https://api.thenewsapi.com/v1/news/top?api_token=4YlNiYK0Djy9vABo6KaIs2M61YA041kOEgKzq0Xu&locale=us&limit=3
          fetch("https://api.thenewsapi.com/v1/news/top?" + query, requestOptions)
              .then(response => response.json())
              .then(result => {
                  console.log(result);
                  setNewsArray(result)
                  return result;})
              .catch(error => console.log('error', error));
      }
  return (
    
    <div id="topNews">
            sport
            <div className="newsBox"><div className="newsImg"></div><a href=""></a></div>
            <div className="newsBox"><div className="newsImg"></div><a href=""></a></div>
            <div className="newsBox"><div className="newsImg"></div><a href=""></a></div>

        </div>
  )
}

export default Sport