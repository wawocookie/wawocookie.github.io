 //宣告DOM
 const guessInput=document.getElementById('guess_input')
 const hintArea=document.querySelector('.hint')
 const guessBtn=document.getElementById('guess_btn')
 const restartBtn=document.getElementById('restart_btn')
 const showAnswerBtn=document.querySelector('#show_answer_btn')

 //宣告變數
 let minNum,maxNum,answerNum,guessNum

 //DOM事件掛載

 showAnswerBtn.addEventListener('click',function(){
     alert(answerNum)
 })

 restartBtn.addEventListener('click',function(){
     init()
 })

 guessBtn.addEventListener('click',guess)

 window.addEventListener('load',function(){
    console.log('load event')
    init()
 })

 window.addEventListener('DOMContentLoaded',function(){
    console.log('DOMContentLoaded event')
  
 })
 

 window.onload=function(){
     init()
 }

 function guess(){
   
     const val=guessInput.value.trim()
     if(val ===''||isNaN(val) || val[0] ==='0'){
         alert('請輸入正確的數字')
         guessInput.value=''
         return 
     }

     guessNum=parseInt(val)

     checkNumRange()

     if(guessNum<minNum||guessNum>maxNum){
         showHint()
         guessInput=''
         alert('請確認輸入範圍')
         // return '請輸入輸入範圍'
         //離開guess
     }

     if(guessNum ===answerNum){
         alert(`答案是${answerNum}`)
         init()
         return
     }
     else if(guessNum<answerNum){
         minNum=guessNum
 

     }
     else if(guessNum>answerNum){
         maxNum=guessNum
      
     

     }
     guessInput.value=''
     showHint()
 }

 function checkNumRange(){
     if(guessNum<minNum || guessNum>maxNum){
         showHint()
         guessInput.value=''
         alert('請確認輸入範圍')
         return true
     }
     return false
 }

 function showHint(){
     hintArea.textContent=`請輸入${minNum}-${maxNum}之間的數字`

 }

 function init(){
     
     guessInput.value=''
     minNum=1
     maxNum=100
     answerNum=getRandomIntInclusive(minNum,maxNum)
     hintArea.textContent=`請輸入${minNum}-${maxNum}之間的數字`
    
 }

 // function generateAnswer() {
 //     return getRandomIntInclusive(1,100)
 // }

 function getRandomIntInclusive(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
 }

 



 // let min = 1
 // let max = 100
 // const answer = getRandomIntInclusive(1, 100)
 // let input = document.querySelector('.input').value
 // let btn = document.querySelector('button')
 

 // console.log(input)
 // window.onload = function () {

 //     console.log(input)
 //     // do{
 //     //     alert('請輸入1~100的數字')
 //     // }while()


 //     // btn.addEventListener("click", function () {

       
 //     //     if (input.value == "") {
 //     //         alert('請輸入1~100的數字')
 //     //     }

 //     // })
 // }



 // function ooxx() {
 //     let btn = document.querySelector('.button1')
 //     let input = document.querySelector('.input')
 //     btn.onclick = function ooxx() {
 //         // let input = document.querySelector('.button1')
 //         console.log(input.value)
 //     }
 // }



 // function getRandomIntInclusive(min, max) {
 //     min = Math.ceil(min);
 //     max = Math.floor(max);
 //     return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
 // }
