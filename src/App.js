import { useDispatch } from "react-redux";
import Main from "./components/screens/Main";
import { fetchAll } from "./redux/actions";
import { useEffect } from "react";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAll(dispatch);
  }, []);

  return (
    <div className="player">
      <Main />
    </div>
  );
}

export default App;
