
let currentDate
currentDate = new Date()

const day_area=document.querySelector('.day_area')
const prevButton=document.querySelector('#prev')
const nextButton=document.querySelector('#next') 
const year=document.querySelector('.year')
const month=document.querySelector('.month')
window.onload=function(){
  
}

const monthArray=['']

prevButton.addEventListener('click',function(){

    currentDate.setMonth(currentDate.getMonth()-1)
    console.log(currentDate)
    month.innerHTML=`${currentDate.getMonth()+1}月`
    year.innerHTML=`${currentDate.getFullYear()}`
    createDateElements()
})

nextButton.addEventListener('click',function(){

    currentDate.setMonth(currentDate.getMonth()+1)
    console.log(currentDate)
    month.innerHTML=`${currentDate.getMonth()+1}月`
    year.innerHTML=`${currentDate.getFullYear()}`
    createDateElements()
})




function getMonthDays(currentDate){

    let date = new Date()
    date.setMonth( currentDate.getMonth()+1)
  
    date.setDate(0)
    return date.getDate()
   

}

createDateElements()

function createDateElements(){
    let year =currentDate.getFullYear()
    let month = currentDate.getMonth()
    let day =currentDate.getDay()
    
    let date=currentDate.getDate()
    
    let d =new Date(year,month,date)
    d.setDate(1)
    d=d.getDay()
    console.log(d)

    let fullDate=getFullDate(currentDate)
    let daysnum =getMonthDays(currentDate)

    let allstring=''

    for(let i=1;i<=d;i++)
    {
        allstring+=
        `
        <input type="radio" name="day" >
        <label class="day" >
            <span></span> 
        </label>
        `
    }

    for(let i=1;i<=daysnum;i++)
    {
        let date = new Date()
        date.setDate(1)
        date.setDate(date.getDate()+i-1)
        let x =getFullDate(date)

        allstring+=
        `
        <input type="radio" name="day" id="${x}">
        <label class="day" for="${x}">
            <span>${i}</span> 
        </label>
        `
    }

    day_area.innerHTML=allstring

    // console.log(allstring)
}

function getFullDate(currentDate)
{
    let year =currentDate.getFullYear()
    let month = currentDate.getMonth()
    let day =currentDate.getDay()
    let date=currentDate.getDate()

    if(date<10)
    {
        date=`0${date}`
    }

    if(month<10)
    {
        month=`0${month+1}`
    }

    let fullDate=`${year}${month}${date}`
    return fullDate
}

