import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './ErrorBoundary'; // Adjust the path as needed
const Toast = () => {
  const notify = () => toast("Wow so easy!");
  return (
    <ErrorBoundary>
       <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
    </ErrorBoundary>
  )
}


export default Toast