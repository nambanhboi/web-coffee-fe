import { Route, Routes } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { routes } from './routes';
import Header from './views/layouts/Header';
import Footer from './views/layouts/Footer';
import Toasts from './components/Toasts';

function App() {
  return (
    <div className="App">
      <Toasts/>
      <Header />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} 
            path={route.path}
            element={route.element}  
          ></Route>
        ))}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
