import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "../store";
import "../styles/master.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
