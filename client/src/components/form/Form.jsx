import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments } from "../../redux/actions/actions"
import axios from "axios";
import styles from './Form.module.css'


function Form() {
  const dispatch = useDispatch();
  const allTemps = useSelector((state) => state.Alltemperaments);

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  const [perro, setPerro] = useState({
    name: '',
    añosdevida: '',
    'añosdevida-max': '',
    imagen: '',
    peso: '',
    'peso-max': '',
    altura: '',
    'altura-max': '',
    temperaments: [],
  });

  const [creacionExitosa, setCreacionExitosa] = useState(false);
  const [errores,] = useState({
    imagen: false,
    añosDeVida: false,
    peso: false,
    altura: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Validación para campos de años, peso y altura
    if (['añosdevida', 'añosdevida-max', 'peso', 'peso-max', 'altura', 'altura-max'].includes(name)) {
      if (!/^\d+$/.test(value)) {
        // Solo se permiten números
        return;
      }
    }

    setPerro({ ...perro, [name]: value });
  };

  const handleTemperamentsChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    console.log('Temperamentos seleccionados:', selectedOptions); 
    setPerro({ ...perro, temperaments: selectedOptions });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      (perro['añosdevida'] !== '' && perro['añosdevida-max'] !== '' && parseInt(perro['añosdevida']) > parseInt(perro['añosdevida-max'])) ||
      (perro['peso'] !== '' && perro['peso-max'] !== '' && parseInt(perro['peso']) > parseInt(perro['peso-max'])) ||
      (perro['altura'] !== '' && perro['altura-max'] !== '' && parseInt(perro['altura']) > parseInt(perro['altura-max']))
    ) {
      alert("Los máximos no pueden ser menores que los mínimos.");
      return;
    }

    const formattedPerro = {
      name: perro.name,
      añosdevida: `${perro.añosdevida} - ${perro['añosdevida-max']} years`,
      img: perro.imagen,
      peso: `${perro.peso} - ${perro['peso-max']}`,
      altura: `${perro.altura} - ${perro['altura-max']}`,
      temperaments: perro.temperaments.join(", "),
    };

    axios.post('http://localhost:3001/create', formattedPerro)
      .then((response) => {
        console.log("Perro creado con éxito:", response.data);
        setCreacionExitosa(true);
        setPerro({
          name: '',
          añosdevida: '',
          'añosdevida-max': '',
          imagen: '',
          peso: '',
          'peso-max': '',
          altura: '',
          'altura-max': '',
          temperaments: [],
        });
      })
      .catch((error) => {
        console.error("Error al crear el perro:", error);
        // Manejar errores aquí
      });
  };

  return (
    <div className={styles.create}>
      <h2>Create Dog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">BREED</label> <br />
          <input
            type="text"
            id="name"
            name="name"
            value={perro.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="imagen">IMAGE</label><br />
          <input
            type="text"
            id="imagen"
            name="imagen"
            value={perro.imagen}
            onChange={handleInputChange}
            required
            className={errores.imagen ? 'error' : ''}
          />
          {errores.imagen && <span className="error-message">Ingrese una URL de imagen válida (jpg, gif, png).</span>}
        </div>
        <div>
          <label htmlFor="añosdevida">LIFE SPAN<br/> (MIN - MAX)</label> <br />
          <input
            type="number"  // Cambio de 'text' a 'number'
            id="añosdevida"
            name="añosdevida"
            placeholder="MIN"
            value={perro.añosdevida}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"  // Cambio de 'text' a 'number'
            id="añosdevida-max"
            name="añosdevida-max"
            placeholder="MAX"
            value={perro['añosdevida-max']}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="peso">WEIGHT<br/> (MIN - MAX)</label><br />
          <input
            type="number"  // Cambio de 'text' a 'number'
            id="peso"
            name="peso"
            placeholder="MIN"
            value={perro.peso}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"  // Cambio de 'text' a 'number'
            id="peso-max"
            name="peso-max"
            placeholder="MAX"
            value={perro['peso-max']}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="altura">HEIGHT<br/> (MIN- MAX)</label><br />
          <input
            type="number"  // Cambio de 'text' a 'number'
            id="altura"
            name="altura"
            placeholder="MIN"
            value={perro.altura}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"  // Cambio de 'text' a 'number'
            id="altura-max"
            name="altura-max"
            placeholder="MAX"
            value={perro['altura-max']}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='formselect'>
          <label className="temperaments">TEMPERAMENTS</label>
          <select
            id="temperaments"
            name="temperaments"
            value={perro.temperaments}
            onChange={handleTemperamentsChange}
            multiple
            required
          >
            {allTemps.map((temp) => (
              <option value={temp.name} key={temp.id} className='custom-options'>
                {temp.name}
              </option>
            ))}
          </select>
        </div>
        <button className='formboton ov-btn-grow-skew' type="submit">LETS GO!</button>
      </form>
      {creacionExitosa && <div className="success-message">Perro creado con éxito</div>}
    </div>
  );
}

export default Form;