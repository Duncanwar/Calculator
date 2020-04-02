let calculator={
    displayValue:'0',
    firstOperand:null,
    waitingSecondOperand:false,
    operator: null,
};

const inputDigit=(digit)=>{
  const {displayValue,waitingSecondOperand}=calculator;
 if(waitingSecondOperand === true){
   calculator.displayValue=digit;
   calculator.waitingSecondOperand=false;
 }
 else
  calculator.displayValue = displayValue === '0' ? digit:displayValue +digit;
console.log(calculator)
}

function inputDecimal(dot){

if(!calculator.displayValue.includes(dot) && !calculator.operator){
  calculator.displayValue += dot;
}

}

function handleOperator(nextOperator){
  const{firstOperand,displayValue,operator}=calculator;
  const inputValue= parseFloat(displayValue);

  if(operator && calculator.waitingSecondOperand){
    calculator.operator=nextOperator;
    if(firstOperand != null){

    }
    console.log(calculator);
    return;
  }

  if(firstOperand == null)
  calculator.firstOperand=inputValue;

else if(operator){
  const currentValue= firstOperand || 0;
  const result=performCalculation[operator](currentValue,inputValue);
  calculator.displayValue= String (result);
 calculator.firstOperand= result;
 console.log(result)
}
calculator.waitingSecondOperand=true;
calculator.operator=nextOperator;
console.log(calculator);
}

const performCalculation={
  '+':(firstOperand,secondOperand)=> firstOperand + secondOperand,
  '*':(firstOperand,secondOperand)=> firstOperand * secondOperand,
  '/':(firstOperand,secondOperand)=> firstOperand / secondOperand,
  '-':(firstOperand,secondOperand)=> firstOperand - secondOperand,
  '=':(firstOperand,secondOperand)=> secondOperand ,
  '!':(firstOperand,secondOperand)=> secondOperand*secondOperand

};

function resettingCalculator(){
  calculator.displayValue= '0';
  calculator.firstOperand= null;
  calculator.waitingSecondOperand=false;
  calculator.operator= null;
}

const updateDisplay=()=>{
  const inputs=document.querySelector("#inputs");
  inputs.value=calculator.displayValue;
  }

updateDisplay();

const keys=document.querySelector("#container_keys");

keys.addEventListener("click",(event)=>{
    const {target}=event;

    if(!target.matches('button')){
  return;
    }

    if(target.classList.contains('operator')){
     handleOperator(target.value)
     updateDisplay();
      return;
    }

    if(target.classList.contains('root')){
      calculator.displayValue= (Math.sqrt(parseInt(calculator.displayValue)));
    }
     
    if(target.classList.contains('square')){
      calculator.firstOperand = calculator.displayValue ;
      calculator.displayValue = calculator.firstOperand*calculator.firstOperand ;
      calculator.firstOperand=null;
    }

    if(target.classList.contains('decimal')){
 inputDecimal(target.value);
 updateDisplay();
 return;
    }
    if(target.classList.contains('clear')){
     resettingCalculator();
     updateDisplay();
      return;
    }

    inputDigit(target.value);
  updateDisplay();
  console.log(calculator);
})




