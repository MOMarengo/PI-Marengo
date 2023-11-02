const axios = require('axios');
const { api_key } = process.env;
const { Temperament } = require('../db');

const getTemperaments = async (req, res) => {
  try {
    

    const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`);

    const temperaments = data.map((dog) => dog.temperament);

    let arrayTemp = temperaments.join().split(",");

    arrayTemp = arrayTemp.map((el) => el.trim());

    const cleanTemps = [];

    arrayTemp.forEach((temp) => {
      if (temp !== "") {
        cleanTemps.push(temp);
      }
    });

    cleanTemps.forEach(async (t) => {
      if (t !== "") {
        await Temperament.findOrCreate({ where: { name: t } });
      }
    });

    const allTemperaments = await Temperament.findAll();

    
    res.status(200).json(allTemperaments);
  } catch (error) {
    console.error("Error en la solicitud de la API", error);
    res.status(500).json({ error: "No se pudieron obtener los datos de la API" });
  }
};

module.exports = { getTemperaments };