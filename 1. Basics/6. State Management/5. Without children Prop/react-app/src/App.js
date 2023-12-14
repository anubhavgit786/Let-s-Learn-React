import { useState } from "react";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const Button = ({ fontColor, bgColor, text, onClick, emoji })=>
{
  return (<button style={{ backgroundColor: bgColor, color: fontColor }} onClick={ onClick }>{text === "Previous" && (<span>{emoji}</span>)}{text}{text === "Next" && (<span>{emoji}</span>)}</button>);
}


const App = ()=> 
{
  const [step, setStep ] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const handlePrevious = ()=>
  {
    if(step > 1)
    {
      setStep((previousStep)=> previousStep - 1);
    }
  }

  const handleNext = ()=>
  {
    if(step < 3)
    {
      setStep((previousStep)=> previousStep + 1);
    }
  
  }

  const handleIsOpen = ()=>
  {
    setIsOpen((previousState)=> !previousState);
  }

  return (
    <>
      <button className="close" onClick={ handleIsOpen }>&times;</button>
       { isOpen && ( 
      <div className="steps">
        <div className="numbers">
          <div className={step >=1 && "active"}>1</div>
          <div className={step >=2 && "active"}>2</div>
          <div className={step ===3 && "active"}>3</div>
        </div>
        <p className="message">Step {step}: {messages[step-1]}</p>
        <div className="buttons">
          <Button bgColor={"#7950f2"} fontColor={"#FFF"} onClick={handlePrevious} text={"Previous"} emoji={"👈🏻"}/>
          <Button bgColor={"#7950f2"} fontColor={"#FFF"} onClick={handleNext} text={"Next"} emoji={"👉🏻"}/>
        </div>
      </div>)}
    </>
  );
}

export default App;






