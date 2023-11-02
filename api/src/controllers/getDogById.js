const { Dog } = require('../db');
const axios = require('axios');
const { api_key } = process.env;

const getDogById = async (req, res) => {
  const { raza } = req.params;

  if (!raza) {
    return res.status(400).json({ error: 'ID de raza no proporcionado.' });
  }

  // Intenta buscar en la base de datos usando UUID
  try {
    const dogFromDatabase = await Dog.findByPk(raza);

    if (dogFromDatabase) {
      return res.json(dogFromDatabase);
    }
  } catch (error) {
    // Si no se encuentra en la base de datos, buscar en la API
    try {
      const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`);
      const dogFromAPI = response.data;

      // Buscar el perro específico por ID en los datos de la API
      const dog = dogFromAPI.find((item) => item.id === parseInt(raza, 10));

      if (dog) {
        return res.json(dog);
      } else {
        return res.status(404).json({ error: 'Raza no encontrada en la API externa.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener datos de la API externa.' });
    }
  }

  console.error(error);
  return res.status(500).json({ error: 'Ocurrió un error al obtener el detalle de la raza.' });
};

module.exports = {
  getDogById,
};