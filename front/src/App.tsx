import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;