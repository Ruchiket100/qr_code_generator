import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from './pages/Main';
import { QRGenerate } from './pages/QRGenerate';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/qr" element={<QRGenerate/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
