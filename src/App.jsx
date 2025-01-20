import Items from "./components/Items";
import { Searchbar } from "./components/Searchbar";

function App() {
  return (
    <div className="container mx-auto p-4">
      <Searchbar />
      <Items></Items>
    </div>
  );
}

export default App;
