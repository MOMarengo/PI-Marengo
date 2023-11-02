const { Dog, Temperament } = require('../db');

const createDog = async (req, res) => {
  
  try {
    const {
      name,
      img,
      altura,
      peso,
      añosDeVida,
      temperaments, 
    } = req.body;

    const dog = await Dog.create({
      name,
      img,
      altura,
      peso,
      añosDeVida,
    });

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

    res.status(200).json(dogWithTemperaments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al crear el perro' });
  }
};
module.exports = createDog;






