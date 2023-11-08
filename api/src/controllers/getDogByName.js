const axios = require('axios');
const { Dog } = require('../db');
const { api_key } = process.env;
const { Op } = require('sequelize');
const perroLimpio = require('../utils/filtro'); // Importa la función perroLimpio

const getDogByName = async (req, res) => {
  const { name } = req.query;
  const lowerCaseName = name.toLowerCase();

  try {
    const dogsInDatabase = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${lowerCaseName}%`
        }
      }
    });

    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`);
    const dogsInAPI = response.data.filter((dog) => dog.name.toLowerCase().includes(lowerCaseName));

    const formattedDogs = [
      ...dogsInDatabase.map((dog) => perroLimpio(dog)), // Formatea los perros de la base de datos
      ...dogsInAPI.map((dog) => perroLimpio(dog)), // Formatea los perros de la API
    ];

    if (formattedDogs.length > 0) {
      res.json(formattedDogs);
    } else {
      res.status(404).json({ message: 'No se encontraron razas con ese nombre.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al buscar las razas.' });
  }
};

module.exports = { getDogByName };