import { Link } from "react-router-dom";
import style from "./Button.module.css";

export const Button = ({ path, text }) => {
  return (
    <Link to={path} className={style.buttonLink}>
      {text}
    </Link>
  );
};