import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { flatten, union } from "lodash";


const SearchInput=({ query, onChange })=> {
  return (
    <label className="search">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        className="search-input"
        placeholder="Search for jobs"
        type="search"
        defaultValue={query}
        onChange={event => {
          onChange(event.target.value);
        }}
      />
    </label>
  );
}

const Result = ({ children, style, onSelect })=> {
  const elRef = useRef(null);
  const topRef = useRef(0);
  
  // TODO: Get dy working
  const [top, setTop] = useState(null);
  const [dy, setDy] = useState(0);
  
//   useEffect(() => {
//     if (!elRef.current) return;
    
//     const nextTop = elRef.current.getBoundingClientRect().top;
    
//     if (nextTop === topRef.current) return;
    
//     const deltaY = nextTop - topRef.current;
    
//     topRef.current = nextTop;
    
//     setDy(deltaY);
    
//     requestAnimationFrame(() => {
//       setDy(0);
//     });
//   });
  
  return (
    <li 
      style={{
        ...style,
        '--dy': dy
      }} 
      className="result-item" 
      ref={elRef}
      onClick={()=>onSelect(children)}>
      {children}
    </li>
  );
}

function Results({ data = [], onSelect }) {
  const elRef = useRef(null);

  const [height, setHeight] = useState(null);
  useLayoutEffect(() => {
    if (!elRef.current) return;
    const rect = elRef.current.getBoundingClientRect();
    setHeight(rect.height);
  });

  return (
    <ul
      className="results"
      ref={elRef}
      style={{ "--height": height }}
      data-height={height}
    >
      {data.map((item, i) => {
        return (
          <Result
            key={item}
            style={{
              "--i": i
            }}
            onSelect={onSelect}
          >
            {item}
          </Result>
        );
      })}
    </ul>
  );
}

const Search = ({data, setSearchKeyword}) => {
  const [query, setQuery] = useState("");
  const dataSets  = union(flatten(data.map(obj=>[...obj.skill_tags,obj.position,obj.role,obj.level])))
  console.log(dataSets)
  const results =
    query.length < 2
      ? []
      : dataSets
          .filter(dataSet => {
            return dataSet.toLowerCase().includes(query.toLowerCase());
          })
          .slice(0, 5);
  const onSelect = (data)=>{
    setSearchKeyword(data)
    setQuery("")
  }
  return (
    <div className="searchbar-container">
      <div className="searchbar">
      <SearchInput onChange={setQuery} query={query} />
      <Results data={results} onSelect={onSelect}/>
    </div>
    </div>
    
  );
};

export default Search;
