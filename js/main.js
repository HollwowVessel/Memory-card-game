const cards = document.querySelectorAll(".card")
const score = document.querySelector(".score")
const harderVersion = document.getElementById("hard")
let scoreValue = 0, victory = 0;
let firstCard, secondCard, thirdCard;
checkHard()

function checkThree(){
    let hard = harderVersion.checked
    if(secondCard && firstCard && thirdCard){
        if(secondCard.dataset.check == firstCard.dataset.check && secondCard.dataset.check == thirdCard.dataset.check && firstCard.dataset.check == thirdCard.dataset.check){
            setTimeout(() => {
                firstCard.removeEventListener("click", flipCard)
                secondCard.removeEventListener("click", flipCard)
                thirdCard.removeEventListener("click", flipCard)
                firstCard = undefined
                secondCard = undefined
                thirdCard = undefined
            }, 300);
            victory++;
            scoreValue += 1000
            if(hard) shuffle()
        } else{
            setTimeout(()=>{
                firstCard.classList.remove("flip")
                secondCard.classList.remove("flip")
                thirdCard.classList.remove("flip")
                firstCard = undefined
                secondCard = undefined
                thirdCard = undefined
            }, 1500)
            scoreValue -= 100;
            if(hard) shuffle()
        }
        score.textContent = `Score: ${scoreValue}`;
    }
}

function checkVin(){
    if(victory == 4){
        setTimeout(()=>{
            alert(`Игра окончена со счетом: ${scoreValue}`)
            scoreValue = 0
            victory = 0
            checkHard()
        }, 500)
    }
}

function flipCard(){
    
    if(this === firstCard || this === secondCard){
        return;
    }
    if(firstCard && secondCard && thirdCard) return;
    this.classList.toggle("flip")
    if(!firstCard){ 
        firstCard = this
    }
    else if(!secondCard){
        secondCard = this
    } 
    else{
        thirdCard = this
    }
    checkThree()
    checkVin()
    
}

function shuffle(){
    cards.forEach(card=>{
        let rnd = Math.ceil(Math.random() * 12)
        card.style.order = rnd
    })
}

function checkHard(){
    if(harderVersion.checked){
        start()
        return true;
    }
    else{
        start()
        return false;
    }
}

function start(){
    shuffle()
    cards.forEach(card=>{
        card.addEventListener('click', flipCard)
        card.classList.remove("flip")
    })
}
harderVersion.addEventListener("change", checkHard)