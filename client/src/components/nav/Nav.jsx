import { Button } from "../button/Button"
import style from "./Nav.module.css"




export const Nav = () =>{
    
    return(
        <div>
            <nav className={style.navBar}>
                
                <Button path="/" text="LandingPage"/>
                <Button path="/dogs" text="Home"/>
                <Button path="/create" text="Create dog"/>
                <Button path="/curiosities" text="About Me"/>

            </nav>
        </div>
    )
}