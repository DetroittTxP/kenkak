import './App.css';
import Graph1 from './Graph1';
//import Graph2 from './Graph2';
import Graph3 from './Graph3';
import Navbar from './Navbar';
import './App.css';
import { Switch , Route } from 'react-router-dom';
import Graph4 from './Graph4';
import Graph5 from './Graph5';
import Image from './Image';
import Graph2 from './Graph2';

function App() {
   return (
    <div className = "App" style = {{display:"flex" , marginleft : "auto" , marginright : "auto"}}>
        <Navbar/>
        <Switch>
            <Route path="/" exact>
                
             </Route>
             <Route path="/covid19/csv/sample_submission.csv">
                <div> 
                    <Graph1/>
                    <Graph4/>
                </div>
            
                
            </Route>
            <Route path="/covid19/csv/train_image_level.csv"> 
                
                <Graph2/>

            </Route>
            <Route path="/covid19/csv/train_study_level.csv"> 
                <div>
                    <Graph3/>
                    <Graph5/>
                </div>
                
               
                
            </Route>
            
            <Route path="/picture" >
            </Route>
            <Route path="/covid19/*" >
                <div>
                    <Image/>
                </div>
            </Route>
        </Switch>
    </div>
  );
}

export default App;
