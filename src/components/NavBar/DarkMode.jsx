import React from "react";
import DarkButton from '../../assets/website/dark-mode-button.png';
import LightButton from '../../assets/website/light-mode-button.png';

function DarkMode(){
    const [theme, setTheme] = React.useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light" );

    const element = document.documentElement;

    return(
        <div className="relative">
            
            <img onClick={() => setTheme(theme === "dark" ? "light" : "dark")}  src={LightButton} alt="" className={`w-10 cursor-pointer absolute right-0 z-10 ${theme === "dark" ? "opacity-0" : "opacity-100" } transition-all duration-200`}/>
            <img onClick={() => setTheme(theme === "dark" ? "light" : "dark")}  src={DarkButton} alt="" className={`w-10 cursor-pointer ${theme === "light" ? "opacity-0" : "opacity-100" }`}/>
        </div>
    )


}

export default DarkMode;