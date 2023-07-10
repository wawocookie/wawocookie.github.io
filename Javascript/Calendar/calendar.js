let currentDate = new Date()
let year = currentDate.getFullYear()
let month = currentDate.getMonth()
let date = currentDate.getDate()

const tbody = document.querySelector('tbody')
const prevBtn = document.querySelector('.prevBtn')
const nextBtn = document.querySelector('.nextBtn')
const monthDom=document.querySelector('.monthDom')
const yearDom=document.querySelector('.year_area')
const monthArray=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const add_dateInput =document.querySelector('#add_dateInput')
const add_timeInput =document.querySelector('#add_timeInput')
// const add_titleInput=document.querySelector('#add_titleInput')
const add_contentInput=document.querySelector('#add_contentInput')
const add_addBtn=document.querySelector('#add_addBtn')

const edit_dateInput = document.querySelector('#edit_dateInput')
const edit_timeInput = document.querySelector('#edit_timeInput')
const edit_contentInput = document.querySelector('#edit_contentInput')

const edit_revise = document.querySelector('#edit_revise')
const edit_delete = document.querySelector('#edit_delete')


let editObject,editDate

      // Modal start=============
      const myModalAdd = new bootstrap.Modal('#addModal', {
        keyboard: false
    })

    const myModalEdit = new bootstrap.Modal('#editModal', {
        keyboard: false
    })

    // Modal end=============

prevBtn.addEventListener('click', function () {

    currentDate.setMonth(currentDate.getMonth() - 1)

    resetYMD()
    monthDom.innerHTML=monthArray[month]
    yearDom.innerHTML=year
    renderDate()
})

nextBtn.addEventListener('click', function () {

    currentDate.setMonth(currentDate.getMonth() + 1)

    resetYMD()
    monthDom.innerHTML=monthArray[month]
    yearDom.innerHTML=year
    renderDate()
})

function resetYMD() {
     year = currentDate.getFullYear()
     month = currentDate.getMonth()
     date = currentDate.getDate()
}

function renderDate() {
    //抓最後一天也是這個月的天數
    let thisMonthNum = getMonthDateNum()
    //最後一天星期幾
    let lastDayNum = new Date(year, month, thisMonthNum).getDay()
    lastDayNum = 7 - lastDayNum-1
    //第一天星期幾
    let firstWeekDay = new Date(year, month, 1).getDay()
    //上個月天數
    let lastMonthNuM = new Date(year, month, 0).getDate()

    let allDateNum = thisMonthNum + firstWeekDay + lastDayNum
   
    //正常情況下,都應該整除
    let weeks = allDateNum / 7
    let day = 1
    let _month=month
    
   

    tbody.innerHTML=''

    for (let i = 1; i <= weeks; i++) {
        let trDom = document.createElement('tr')

        for (let j = 1; j <= 7; j++) {
            let tdDom = document.createElement('td')



            if (i == 1 && j <= firstWeekDay) {

                tdDom.innerHTML +=
                    `
                <div class="date">${lastMonthNuM - firstWeekDay + j}</div>
                `
               
                
                tdDom.addEventListener("click", tdClickFN.bind(null,year,month-1,lastMonthNuM - firstWeekDay + j))

                if(localStorage.getItem(getDateString(year,month-1,lastMonthNuM - firstWeekDay + j))!==null)
                {
                    tdDom = getStorage(year,month-1,lastMonthNuM - firstWeekDay + j,tdDom)
                }
            }
            else if (day <= thisMonthNum) {
                tdDom.innerHTML +=
                `
                <div class="date">${day}</div>
                `
                
                tdDom.addEventListener("click",tdClickFN.bind(null,year,month,day))
                if(localStorage.getItem(getDateString(year,month,day))!==null)
                {
                    tdDom = getStorage(year,month,day,tdDom)
                    
                }

                if(_month==month)
                {
                    tdDom.classList.add('thismonth')
                }
                
               
                day++
            }
            else {


                
                //32近來 變1 再day++
             
                    day = 1
                    month++
                
             

                
                // month++
                tdDom.innerHTML +=
                `
                <div class="date">${day}</div>
                `
                tdDom.addEventListener("click", tdClickFN.bind(null,year,month,day))


                if(localStorage.getItem(getDateString(year,month,day))!==null)
                {
                    tdDom = getStorage(year,month,day,tdDom)
                }
                day++
            }

            // if(day>thisMonthNum)
            // {
            //     month++
            //     day=1
            //     j=j-1
            //     continue
            // }
            
      
         
            // tdDom.setAttribute('data-bs-toggle',"modal")
            // tdDom.setAttribute('data-bs-target','#addModal')

            trDom.append(tdDom)
        }


        tbody.append(trDom)

    }
    month--

}
function hi(y)
{
    console.log(y)
}

function getMonthDateNum() {
    return new Date(year, month + 1, 0).getDate()

}

renderDate()

function tdClickFN(year,month,day){
    add_dateInput.value=getDateString(year,month,day)
    add_timeInput.value=''
    
    add_contentInput.value=''
    myModalAdd.show()

}

function getDateString(year,month,day){
    month++
    if(month<10)
    {
        
        month=`0${month}`
    }

    if(day<10)
    {
        day=`0${day}`
    }

    return `${year}-${month}-${day}`


}

function getTimeString(time)
{
    let allstring=''
    time.split(':').forEach(item=>{
        allstring+=item
    })
    return allstring
}

function timeStringToTime(timeString)
{
 
    return `${timeString.substring(0,2)}:${timeString.substring(2,4)}`
}

add_addBtn.addEventListener('click',function(){
    // debugger
    let data =JSON.parse(localStorage.getItem(`${add_dateInput.value}`)) 
    

    //如果沒有選特定的時間
    let _time
    if(add_timeInput.value=='')
    {
        _time='2359'
    }
    else
    {
        _time=getTimeString(add_timeInput.value) 
        console.log(_time)
        
    }
    let dataObject={}

    let time=timeStringToTime(_time)
   
    if(data==null)
    {
        dataObject[_time]={time:time,content:add_contentInput.value}
        
        localStorage.setItem(`${add_dateInput.value}`,`${JSON.stringify(dataObject)}`)
    }
    else
    {
        
        dataObject=data
        dataObject[_time]={time:time,content:add_contentInput.value}
       
        localStorage.setItem(`${add_dateInput.value}`,`${JSON.stringify(dataObject)}`)
    }
    renderDate()
    myModalAdd.hide()
})

function getDateValueOf()
{
    // add_timeInput.value='12:32'
    // add_dateInput.value='2023-02-03'
    let x =new Date(`${add_dateInput.value}T${getTimeString(add_timeInput.value)}`)

    x=x.valueOf()

    let y=new Date(`${add_dateInput.value}T23:59`)
    y=y.valueOf()

    if(getTimeString(add_timeInput.value)=='')
    {
        return y
    }
    else
    {
        return x
    }

}

function getStorage(year,month,day,tdDom)
{
    let allstring=''
   
    //如果用日期找的到物件
        //取得value 物件
        let x =JSON.parse(localStorage.getItem(getDateString(year,month,day)))
        
        let array =Object.values(x)
  

        let div
        array.forEach(item=>{

            div = document.createElement('div')
            div.classList.add('detail')
        
            div.innerHTML=`${item.time} ${item.content}`
            // console.log(div.innerHTML)
            div.addEventListener('click',function(e){
                editObject=item
                editDate=getDateString(year,month,day)
                e.stopPropagation()
                edit_dateInput.value=getDateString(year,month,day)
                edit_contentInput.value=`${item.content}`
                edit_timeInput.value=item.time
                myModalEdit.show()
            })

            tdDom.append(div)
      
           
        })

   
    

    return tdDom
}

function getData(data)
{
    return JSON.parse(localStorage.getItem(data))
}

edit_revise.addEventListener('click',function(){
    
    //用日期抓localstorage 
    let x=getData(editDate)
    //原本的時間
    let time = getTimeString(editObject.time)
    //要改的時間
    let timeString=getTimeString(edit_timeInput.value)
    localStorage.removeItem(editDate)
   
    delete x[time]
 console.log(editDate)
console.log(x)

   x[timeString]={}

   x[timeString].time=edit_timeInput.value
   x[timeString].content=edit_contentInput.value

   localStorage.setItem(`${edit_dateInput.value}`,`${JSON.stringify(x)}`)
   myModalEdit.hide()
   
    renderDate()
 
   
})

edit_delete.addEventListener('click',function(){
    let time = getTimeString(editObject.time)
    let x=getData(editDate)
    console.log(x)
    console.log(time)
    delete x[time]
    localStorage.setItem(`${edit_dateInput.value}`,`${JSON.stringify(x)}`)
    myModalEdit.hide()
   
    renderDate()
 
})

