import data from "./data.json";
import Jobs from "./components/Jobs";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import {fetchData} from "./api-services/api"
function App() {
  const [filterKeywords, setfilterKeywords] = useState([]);
  const [jobList, setJobList] = useState([
  
])

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
 useEffect(()=>{
    fetchData().then(res=>{
      console.log(res)
      setJobList(res)
    })
 },[])
  return (jobList.length===0?<div style={{height:'100vh',width:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>loading</div>:
    <div>
      <div className="header">
       <h1>Professio.id</h1> 
        <small>The magic word here!</small>
        
      </div>
      <div className="container">
        <Search data={jobList} setSearchKeyword={setSearchKeyword} />
      </div>
      {filterKeywords.length > 0 && (
        <Header
          keywords={filterKeywords}
          removeKeywords={deleteKeyword}
          clearAll={clearAll}
        />
      )}

      <Jobs
        keywords={filterKeywords}
        data={jobList}
        setKeywords={addFilterKeywords}
      />
    </div>
  );
}

export default App;
