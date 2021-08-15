import React from 'react';

const rowStyle = {
  textAlign: "center",
  // border: "1px solid black",
  minWidth: '150px'
}

const IndividualPark = ({park}) => {
  return(
    <tr>
      <td style={rowStyle}>
        <img src={park.photo} alt={park.name} />
      </td>
      <td style={rowStyle}>{park.name}</td>
      <td style={rowStyle}>{park.location}</td>
      <td style={rowStyle}>{park.visitors}</td>
      <td style={rowStyle}>{park.dateFounded}</td>
      <td style={rowStyle}>{park.area} sq ft</td>
    </tr>
  )
};

export default IndividualPark;