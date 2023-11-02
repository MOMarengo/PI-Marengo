const axios = require('axios');
require ('dotenv').config();
const { api_key } = process.env;
const { Dog } = require('../db');

const getDogs = async (req, res) => {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`);
    
    if (response.status === 200) {
      const dogs = response.data;
      const dogDb = await Dog.findAll();
      const DogJson = dogDb.map(dog => dog.toJSON()); // Corregido 'toJson' a 'toJSON'
      const alldogs = [...DogJson, ...dogs];
      res.status(200).json(alldogs);
    } else {
      res.status(response.status).json({ error: 'Error al obtener datos de la API externa.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al obtener las razas de perros desde la API externa.' });
  }
};

module.exports = {getDogs};