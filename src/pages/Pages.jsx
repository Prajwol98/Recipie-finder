import Items from "../components/Items";
import Popular from "../components/Popular";
import Searchbar from "../components/Searchbar";

const Pages = () => {
  return (
    <div>
      <Searchbar></Searchbar>
      <Popular></Popular>
      <Items></Items>
    </div>
  );
};

export default Pages;
