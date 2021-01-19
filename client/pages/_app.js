import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "../store";
import "../styles/master.scss";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer/>
    </Provider>
  );
}

export default MyApp;
