const inputSlider=document.querySelector(".slider");

const passwordLength=document.querySelector("[password-length]");

const displayPassword=document.querySelector(".display-password");

const copyButton=document.querySelector(".copy-button");

const copyMessage=document.querySelector("[data-copied]");

const upperCaseCheck=document.querySelector(".uppercase");

const lowerCaseCheck=document.querySelector(".lowercase");

const numberCheck=document.querySelector(".numbers");

const symbolCheck=document.querySelector(".symbols");

const indicator=document.querySelector(".indicator-password");

const genPassword=document.querySelector(".give-password");

const allCheckBox=document.querySelectorAll("input[type=checkbox]");

const symbols="!@#$%^&*(){}?/][/=+-;:";

//DEFAULT THINGS
let password="";
let defaultLength=8;
let checkCount=0;
//set indicator color to grey..

giveLength();
//SET PASSWORD LENGTH
function giveLength(){
    inputSlider.value=defaultLength;
    passwordLength.innerHTML=defaultLength;
}
setIndicator("#ccc");

function setIndicator(color){
  indicator.style.backgroundColor=color;

}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function getRndNumber(){
    //finding random number
    return getRndInteger(0,9);
}

function getRndLowerCase(){
    // finding lower case character
    return String.fromCharCode(getRndInteger(97,123));
}

function getRndUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function getRndSymbol(){
    return symbols.charAt(getRndInteger(0,symbols.length));
}

function calcStrength() {
    //CALCULATE STRENGTH
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (upperCaseCheck.checked) hasUpper = true;
    if (lowerCaseCheck.checked) hasLower = true;
    if (numberCheck.checked) hasNumber = true;
    if (symbolCheck.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength.innerHTML >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(displayPassword.value);
        copyMessage.innerText="copied"; 
    }
    catch(e){
        copyMessage.innerText="failed";
    }
    //TO APPEAR COPPIED / FAILED TEXT
    copyMessage.classList.add("active");

    //TO REMOVE COPIED TEXT AFTER 2SEC
    setTimeout(()=>{
        copyMessage.classList.remove("active");
    },2000);
}

//ADDING EVENT LISTER TO INPUT SLIDER
inputSlider.addEventListener('input',(e)=>{
    defaultLength=e.target.value;
    giveLength();
});

// Array.from(allCheckBox).forEach((checkbox) => {
//     console.log('genrating');
//     checkbox.addEventListener('change', handleCheckBox);
//   });
  

function handleCheckBox(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
          checkCount++;
    })

    //special condition

    if(passwordLength<checkCount)
      {
        defaultLength=checkCount;
        giveLength();
      }
      
}

allCheckBox.forEach((checkbox)=>{
    //console.log('genrating');
    checkbox.addEventListener('click', handleCheckBox);

})




//WHEN TO COPY
copyButton.addEventListener('click',()=>{
    if(displayPassword.value)
      copyContent();
})

function shufflePassword(shufflePass){
    for(let i=shufflePass.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=shufflePass[i];
        shufflePass[i]=shufflePass[j];
        shufflePass[j]=temp;

        
    }
    let str="";
        shufflePass.forEach((e)=>(str+=e));
        return str;

}

genPassword.addEventListener('click',()=>{
    console.log('in genrate');
    if(checkCount<=0)
     return;

     if(defaultLength<checkCount){
        defaultLength=checkCount;
        giveLength();
     }

     //LET GENRATE NEW PASSWORD
     password="";

    

    let passArray=[];
     if(upperCaseCheck.checked)
      passArray.push(getRndUpperCase);

     if(lowerCaseCheck.checked)
     passArray.push(getRndLowerCase);
     
     if(numberCheck.checked)
     passArray.push(getRndNumber);

     if(symbolCheck.checked)
     passArray.push(getRndSymbol);

     for(let i=0;i<passArray.length;i++){
        password+=passArray[i]();
     }

     for(let i=0;i<defaultLength-passArray.length;i++){
       
        let rndIndex=getRndInteger(0,passArray.length);
        password+=passArray[rndIndex]();
     }

     password=shufflePassword(Array.from(password));
     
     displayPassword.value=password;
    

     calcStrength();





    
});



