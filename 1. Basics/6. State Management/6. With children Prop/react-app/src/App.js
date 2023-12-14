import { useState } from "react";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const Button = ({ fontColor, bgColor, onClick, children})=>
{
  return (<button style={{ backgroundColor: bgColor, color: fontColor }} onClick={ onClick }>{children}</button>);
}

const Step = ({ children })=>
{
  return (<p className="message">{children}</p>);
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
        <Step>Step {step}: {messages[step-1]}</Step>
        <div className="buttons">
          <Button bgColor={"#7950f2"} fontColor={"#FFF"} onClick={handlePrevious}><span>👈🏻</span>Previous</Button>
          <Button bgColor={"#7950f2"} fontColor={"#FFF"} onClick={handleNext}>Next<span>👉🏻</span></Button>
        </div>
      </div>)}
    </>
  );
}

export default App;







