import { Button } from "../button/Button";
import style from "./Home.module.css";


export default function Home() {
  return (
    <div className={style.pageContainer}>
      <div className={style.contentContainer}>
        <h1 className={style.hach}>The dogs page</h1>
        <h3>A single page application dedicated to dogs</h3>
        <Button path="/dogs" text="Log in" />
      </div>
    </div>
  );
}