const axios = require('axios');
require('dotenv').config();
const { api_key } = process.env;
const { Dog } = require('../db');
const perroLimpio = require('../utils/filtro'); // Importa la función de formateo

const getDogs = async (req, res) => {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`);

    if (response.status === 200) {
      const dogsFromAPI = response.data;
      const dogDb = await Dog.findAll();
      const dogsFromDB = dogDb.map(dog => dog.toJSON());

      // Formatea los perros de la API
      const dogsFormattedFromAPI = dogsFromAPI.map((perro) => perroLimpio(perro));

      // Combina los perros de la base de datos con los formateados de la API
      const allDogs = [...dogsFromDB, ...dogsFormattedFromAPI];

      res.status(200).json(allDogs);
    } else {
      res.status(response.status).json({ error: 'Error al obtener datos de la API externa.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al obtener las razas de perros desde la API externa.' });
  }
};

module.exports = { getDogs };
