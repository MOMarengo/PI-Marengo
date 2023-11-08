const perroLimpio = require('../utils/filtro'); // Importa el filtro

const { Dog, Temperament } = require('../db');

const createDog = async (req, res) => {
   const {
    name,
    img,
    altura,
    peso,
    añosdevida,
    temperaments, 
  } = req.body;
  try {
   const dog = await Dog.create({
      name,
      img,
      altura,
      peso,
      añosdevida,
    });
    console.log("Perro creado:", dog);
    // Busca los temperamentos en la base de datos y asocia al perro
    if (temperaments && temperaments.length > 0) {
      const foundTemperaments = await Temperament.findAll({
        where: { name: temperaments }, // Encuentra los temperamentos por nombre
      });

      await dog.addTemperaments(foundTemperaments);
    }

    // Recupera el perro con sus temperamentos asociados
    const dogWithTemperaments = await Dog.findByPk(dog.ID, {
      include: Temperament,
    });

    // Aplica el filtro perroLimpio al perro antes de enviar la respuesta JSON
    const formattedDog = perroLimpio(dogWithTemperaments);

    res.status(200).json(formattedDog);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createDog };



