import data from "./data.json";
import Jobs from "./components/Jobs";
import { useState } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import { flatten, union } from "lodash";
const dataSets  = union(flatten(data.map(obj=>[...obj.languages,...obj.tools,obj.position,obj.role])))
function App() {
  const [filterKeywords, setfilterKeywords] = useState([]);

  const setSearchKeyword = (data) => {
    setfilterKeywords([...filterKeywords, data]);
  };

  const addFilterKeywords = (data) => {
    console.log(data)
    if (!filterKeywords.includes(data)) {
      setfilterKeywords([...filterKeywords, data]);
    }
  };

  const deleteKeyword = (data) => {
    const newKeywords = filterKeywords.filter((key) => key !== data);
    setfilterKeywords(newKeywords);
  };

  const clearAll = () => {
    setfilterKeywords([]);
  };

  return (
    <div>
      <div className="header">
        Jobbbs.com
      </div>

      <Search setSearchKeyword={setSearchKeyword} />

      {filterKeywords.length > 0 && (
        <Header
          keywords={filterKeywords}
          removeKeywords={deleteKeyword}
          clearAll={clearAll}
        />
      )}

      <Jobs
        keywords={filterKeywords}
        data={data}
        setKeywords={addFilterKeywords}
      />
    </div>
  );
}

export default App;
