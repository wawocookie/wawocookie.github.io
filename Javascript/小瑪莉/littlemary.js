let bricks =document.querySelectorAll("[box-id]")
  bricks = Array.from(bricks)
        .sort((a,b)=>{
                   
                        return a.getAttribute("box-id")-b.getAttribute("box-id")
                    })
const startBtn = document.querySelector(".btn")
const msg = document.querySelector("#msg")
const answer = document.querySelector("#answer")
const img = document.querySelector("#img")
let steps;
let allsteps;
let currentIndex=0;
let speed =50


startBtn.addEventListener('click',function(){
    
    speed =50
    random=Math.floor(Math.random()*bricks.length) +1

    steps=random+3*bricks.length
    allsteps=steps

    turnAround()
    

})


function turnAround(){
    
    
        bricks[currentIndex].classList.remove("active")
      
        // img.removeChild()
        currentIndex++
        
        if(currentIndex>=bricks.length)
        {
            currentIndex=0
        }
    
        bricks[currentIndex].classList.add("active")

        answer.innerHTML=`${bricks[currentIndex].textContent}`
        steps--
        // console.log( bricks[currentIndex].children[0])
        // img.append(bricks[currentIndex].children[0].cloneNode())
        if(steps>0)
        {

            setTimeout(turnAround,speed)
            
            if(steps<Math.floor((allsteps/3))) speed+=7;
        }
        else
        {
            answer.innerHTML=`${bricks[currentIndex].textContent}`
        }
  


    
}