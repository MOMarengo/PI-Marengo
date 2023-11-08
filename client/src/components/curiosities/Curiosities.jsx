import style from "./Curiosities.module.css"

export const Curiosities = () => {
  return (
    <div>
      <h1>ABOUT ME</h1>
      <div className={style.container}>
        <div>
          <h2> Mateo Marengo</h2>
          <p>
          Hello, my name is Mateo Marengo. I'm a programming student who is taking his first steps (and falls). I'm 22 years old and I'm from Tucumán, Argentina. I developed this application about dogs with a BackEnd that uses Express and Sequelize, and a FrontEnd using React and Redux.
          </p>
        </div>
        
      </div>
      <div className={style.container}>
        <div>
          <h2>App functions</h2>
          <p>
          This application about dogs allows us to view breeds with their details: temperaments, weight, height, and life expectancy. It also allows us to filter and create a new dog breed to which we can add existing temperaments.
          </p>
        </div>
        
      </div>
      <div className={style.container}>
        <div>
          <h2> My future</h2>
          <p>
          In the future, I hope to become a full-stack programmer with the ability to develop and solve problems in applications. At the moment, I prefer the backend as it seems simpler to me, but I don't rule out dedicating more time to the frontend in the future and giving it the opportunity to grow on me.
          </p>
        </div>
        
      </div>
    </div>
  );
};