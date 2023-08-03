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
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedRegion, setSelectRegion] = useState('');
  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowModal(true);
  };
  const handleRegion = (value) => {
    setSelectRegion(value);
  };
  const filteredData = selectedRegion
    ? countries.filter((item) => item.region === selectedRegion)
    : countries;

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
              {countries.map((option, index) => (
                <Dropdown.Item
                  key={index}
                  eventKey={option.region}
                >
                  {option.region}
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
                  onClick={() => handleImageClick(item.flags.svg)}/>
                <Card.Body>
                  <Card.Title>Country Name : {item.name.common}</Card.Title>
                  <Card.Text>
                    Region : {item.region}
                  </Card.Text>
                  <Card.Text className="text-muted">
                    Population : {item.population}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Body className="text-center">
            <img 
              src={selectedImage} 
              alt="Enlarged" 
              style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default App;
