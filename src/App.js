import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [playerList, setPlayerList] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [retired, setRetired] = useState(false);
  function getPlayers() {
    return fetch('https://km7ow6.sse.codesandbox.io/cricketers').then(
      (response) => response.json()
    );
  }

  useEffect(() => {
    getPlayers().then((players) => {
      console.log(players);
      setPlayerList(players);
      const countryList = players.map((player) => player.country);
      const countries = [...new Set(countryList)];
      console.log(countries);
      setCountries(countries);
    });
  }, []);

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setSelectedCountry(e.target.value);
  };

  const onClickHandler = (e) => {
    console.log(e.target.checked);
    setRetired(e.target.checked);
  };

  const filterList = playerList
    .filter((player) => {
      return !selectedCountry || player.country === selectedCountry;
    })
    .filter((player) => {
      return !retired || +player.age >= 40;
    });

  return (
    <div>
      <select onChange={onChangeHandler} value={selectedCountry}>
        <option value="">Choose a country</option>
        {countries.map((country) => {
          return (
            <option key={country} value={country}>
              {country}
            </option>
          );
        })}
      </select>

      <label>
        <input type="checkbox" onClick={onClickHandler} />
        Retired
      </label>

      <table border="1" id="playersTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Age</th>
            <th>Retired</th>
          </tr>
        </thead>
        <tbody>
          {filterList.map((player) => {
            return (
              <tr key={player.name}>
                <td>{player.name}</td>
                <td>{player.country}</td>
                <td>{player.age}</td>
                <td>{player.age >= 40 ? 'Retired' : 'Not Retired'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
