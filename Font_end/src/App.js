import './App.css';
import Chat from './components/chat/Chat';
import Header from './components/header/Header';
import Sidebar from './components/slidebar/Sidebar';
import Videos from './components/video/Videos';


function App() {
  return (
    <div className="App">
      <Header/>
      <div className="main-display">
      <Sidebar/>
      <Videos/>
      </div>
    </div>
  );
}

export default App;
