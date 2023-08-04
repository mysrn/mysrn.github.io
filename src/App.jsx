import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedRegion, setSelectRegion] = useState('');
  const handleImageClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  const handleRegion = (value) => {
    setSelectRegion(value);
  };
  const filteredData = selectedRegion
    ? countries.filter((item) => item.region === selectedRegion)
    : countries;
    const uniqueRegions = [...new Set(countries.map(option => option.region))];
  return (
    <div className="App">
      <h1>Informasi Negara</h1>
      <div className="container-fluid mt-1">
        <div className="d-flex justify-content-end">
          <p className="mt-1">Sort by : </p>
          <Dropdown 
            id="dropdown-basic-button" 
            variant="transparent"
            className="ml-auto"
            onSelect={handleRegion}>
            <Dropdown.Toggle variant="transparent" id="dropdown-basic-button">
              Region
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {uniqueRegions.map((region, index) => (
                <Dropdown.Item
                  key={index}
                  eventKey={region}
                >
                  {region}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Row xs={1} md={2} lg={4} className="g-4">
          {filteredData.map((item, index) => (
            <div key={index}>
              <Card className="border-0 mx-auto text-center">
                <Card.Img 
                  variant="top" 
                  src={item.flags.svg}
                  style={{ width: '100%', height: '280px', cursor:'pointer' }}
                  onClick={() => handleImageClick(item)}/>
                <Card.Body>
                  <Card.Title>Country Name : {item.name.common}</Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
        {selectedItem && (
          <React.Fragment>
            <Modal.Header closeButton>
              <Modal.Title>{selectedItem.name.common}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <img
                src={selectedItem.flags.svg}
                alt="Enlarged"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
              <h4>Region: {selectedItem.region}</h4>
              <p>Sub Region : {selectedItem.subregion}</p>
              <p>Population: {selectedItem.population}</p>
              <p>
                Location : 
                <a href={selectedItem.maps.googleMaps} target="_blank" rel="noopener noreferrer">
                  View on Google Maps</a>
              </p>
              <p>Currency : &nbsp;
                {Object.entries(selectedItem.currencies).map(([code, currency]) => (
                  <span key={code}>
                    {currency.name} ({currency.symbol})
                  </span>
                ))}
              </p>
              <p>Languages : &nbsp;
                {Object.entries(selectedItem.languages).map(([code, language]) => (
                  <span key={code}>{language} </span>
                ))}
              </p>
            </Modal.Body>
          </React.Fragment>
        )}
        </Modal>
      </div>
    </div>
  );
}

export default App;
