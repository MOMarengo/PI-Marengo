const axios = require('axios');
const { Dog } = require('../db'); // Importa el modelo Dog
const {api_key}=process.env
const { Op } = require('sequelize');


const getDogByName = async (req, res) => {
  const { name } = req.query;
  const lowerCaseName = name.toLowerCase(); // Convertir el nombre de búsqueda a minúsculas

  try {
    // Busca en la base de datos
    const dogsInDatabase = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${lowerCaseName}%` // Búsqueda no sensible a mayúsculas y minúsculas
        }
      }
    });

    // Busca en la API
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`)
    const dogsInAPI = response.data.filter(dog => dog.name.toLowerCase().includes(lowerCaseName));

    const result = [...dogsInDatabase, ...dogsInAPI];

    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(404).json({ message: 'No se encontraron razas con ese nombre.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al buscar las razas.' });
  }
};

module.exports = { getDogByName}

