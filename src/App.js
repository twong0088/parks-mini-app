import React, {useEffect, useState} from 'react';
import IndividualPark from './IndividualPark.jsx';
const axios = require('axios');

const buttonStyle = {
  height: '30px',
  margin: '2px',
  cursor: 'pointer'
}

const ParksTable = () => {

  const [displayingParks, setDisplayingParks] = useState([]);
  const [allParks, setAllParks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
      //getting the data
      axios.get('https://tinyurl.com/pg-parks')
          .then(res => {
            setAllParks(res.data);
            setDisplayingParks(res.data);
          })
          .catch(err => {
              console.log(err);
          });
  }, []);

  const handleInput = (event) => {
    setSearchTerm(event.target.value);
    let term = event.target.value.toLowerCase();

    const filtered = allParks.filter(park => park.name.toLowerCase().includes(term) || park.location.toLowerCase().includes(term));

    setDisplayingParks(filtered);
  }

  const handleReset = () => {
    setSearchTerm('');
    setDisplayingParks(allParks);
  }

  const sort = (e) => {
    let updated = [...displayingParks]
    switch(e.target.id) {
      case 'sortName':
        updated.sort((a, b) => (a.name.localeCompare(b.name)));
        break;
      case 'sortRevName':
        updated.sort((a, b) => (b.name.localeCompare(a.name)));
        break;
      case 'sortByVis':
        updated.sort((a, b) => (a.visitors - b.visitors));
        break;
      case 'sortByRevVis':
        updated.sort((a, b) => (b.visitors - a.visitors));
        break;
      default:
        console.log('invalid option');
        break;
    };
    setDisplayingParks(updated);
  }
  return(
      <div id='app'
        style={
          {
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '15px',
            paddingLeft: '15px'
          }
      }>
        <div style={{
          display: 'flex',
          flexDirection: 'row'
        }}>
          <input
            type="text"
            style={{
              width: '35vw',
              height: '30px',
            }}
            placeHolder='Search for Parks'
            value={searchTerm}
            onChange={handleInput}
          />
          <button onClick={handleReset}>Reset</button>
        </div>
        <div style={{margin: '15px'}}>
          <button
            id='sortName'
            onClick={sort}
            style={buttonStyle}
          >
            Sort by name (A-Z)
          </button>
          <button
            id='sortRevName'
            onClick={sort}
            style={buttonStyle}
          >
            Sort by name (Z-A)
          </button>
          <button
            id='sortByVis'
            onClick={sort}
            style={buttonStyle}
          >
            Sort By Visitor (Lowest)
          </button>
          <button
            id='sortByRevVis'
            onClick={sort}
            style={buttonStyle}
          >
            Sort By Visitor (Highest)
          </button>
        </div>
        <table
          style={{
            margin: '20px'
          }}
        >
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Location</th>
            <th>Visitors</th>
            <th>Date Founded</th>
            <th>Park Size</th>
          </tr>
          {
            displayingParks.map((park, idx) => (
                <IndividualPark key={idx} park={park}/>
            ))
          }
        </table>
      </div>
  )
}

export default ParksTable;
