import "../styles/globals.scss";
// import { SocketContext, socket } from "../context/socket";

function MyApp({ Component, pageProps }) {
  return (
    // <SocketContext.Provider value={socket}>
    <Component {...pageProps} />
    // </SocketContext.Provider>
  );
}

export default MyApp;
