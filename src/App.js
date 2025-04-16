import { BrowserRouter } from "react-router-dom";
import Cricket from "./component/Cricket";
import Crud from "./component/crud";
import News from "./component/news";
import ToDoList from "./component/ToDoList";
import Weather from "./component/weather";


function App() {
  return (
    

      <BrowserRouter>
      <div className="app-main-screen">
        <div id="left">
        <div id="todoWidget">
           <ToDoList /> 
          </div>
        </div>
        <div id="right">
          <div id="weatherWidget">
             <Weather />
            </div>
          <div id="newsWidget">
             <News /> 
            </div>
        </div>
      </div >
      </BrowserRouter>
      
  );
}

export default App;
