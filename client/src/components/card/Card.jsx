import { Link } from "react-router-dom";
import style from "./Card.module.css";

export default function Card({ id, name, peso, temperamento, img }) {
  return (
    <div className={style.cardContainer}>
      <div className={style.singleCard}>
        <Link style={{textDecoration: "none", color: "black"}} to={`/detail/${id}`}>
          <h2>{name}</h2>
        
          <p>Weight : {peso}</p>
        <p>Temperament: {temperamento}</p>
        <img src={img} alt={id}  />
        </Link>
      </div>
    </div>
  );
}