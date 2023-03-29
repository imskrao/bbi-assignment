import './App.css';
import SideMenu from './components/side-menu';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SideMenu />
      </BrowserRouter>
      <div className='section'>
        <h1>BBI</h1>
      </div>
    </div>
  );
}

export default App;
