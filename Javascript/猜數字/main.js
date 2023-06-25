 //宣告DOM
 const guessInput=document.getElementById('guess_input')
 const hintArea=document.querySelector('.hint')
 const guessBtn=document.getElementById('guess_btn')
 const restartBtn=document.getElementById('restart_btn')
 const showAnswerBtn=document.querySelector('#show_answer_btn')
 const abarea=document.querySelector('.ab')

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

 window.onload=function(){
     init()
 }

 function guess(){
   
    
   
    //去除文字前後空白
     const val=guessInput.value.trim()
     //CHECK不為空,是數字,第一個數字不是0
     if(val ===''||isNaN(val) || val[0] ==='0'){
         alert('請輸入正確的數字')
         guessInput.value=''
         return 
     }
     
     const guessInput_Array=val.split('')
     
     let answerNum_Array=answerNum.toString()
     answerNum_Array=answerNum_Array.split('')
  



     guessNum=parseInt(val)

     if( checkNumRange())
        {
            return;
        }

        checkAB(guessInput_Array,answerNum_Array)

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
     
    abarea.innerHTML=`0A 0B`
     guessInput.value=''
     minNum=1
     maxNum=100
     answerNum=getRandomIntInclusive(minNum,maxNum)
     hintArea.textContent=`請輸入${minNum}-${maxNum}之間的數字`
    
 }



 function getRandomIntInclusive(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
 }

 function checkAB(guessInput_Array,answerNum_Array){

    let a=0,b=0;
    for(let index in guessInput_Array)
    {
     
           if(guessInput_Array[index]==answerNum_Array[index])
           {
               a++
           }
           else if(answerNum_Array.find(item=>guessInput_Array[index]==item))
           {
               b++
           }
      
    }

   abarea.innerHTML=`${a}A ${b}B`
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
