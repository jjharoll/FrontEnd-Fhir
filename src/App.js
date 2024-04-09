import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Paciente from './Pages/Paciente';
import Agenda from './Pages/Agenda';
import Home from './Pages/Home';
import Profesional from './Pages/Profesional';
import Calculadora from './Pages/Calculadora';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Home/>
      <Paciente />
      <Profesional />
      <Calculadora/>
      <Agenda/>
    </div>
  );
}

export default App;
