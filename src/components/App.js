import '../styles/App.css';
import Treeview from './Treeview';

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <h2>
          Treeview with reactjs
        </h2>
        <div style={{ marginTop: 20 }}>
          <Treeview />
        </div>
      </div>
    </div>
  );
}

export default App;
