let allData = {};
let currentData = [];
let category='';
const color_group = document.querySelector('.color_group')
let _color = -1,_storage = -1,_network = -1;
let colors;
let carousel_indicators = document.querySelector(".carousel-indicators")
let carousel_inner = document.querySelector(".carousel-inner")
let txt = document.querySelector('.txt')

const feature_list ={iphone:['color','storage'],ipad:['color', 'storage', 'network'],imac:['color','ram', 'storage']}
let featureSelect={}

const xhr = new XMLHttpRequest();
xhr.open('get', 'https://raw.githubusercontent.com/wawocookie/wawocookie.github.io/main/Javascript/ipad/ipad.json');
xhr.send();

//等抓完資料再進行
xhr.onload = function () {
    allData = JSON.parse(xhr.response);
}

//抓取iphone,ipad,mac按鈕,加上事件監聽 當click ->change()
document.querySelectorAll(".category_group label").forEach(category_label => {
    category_label.addEventListener('click', change.bind(undefined, category_label.attributes['for'].value))
})




function change(labelCategory) {

    document.querySelector(".price").innerHTML = `NT$$XXXXX`
 

    category=labelCategory


    document.querySelector(".title h1").innerHTML =`購買 ${category}`

    //要點選才有currentData
    currentData = allData[category];

    createCarouselElements(currentData.imgs)
       
    createTxt()
  


    colors = document.querySelectorAll('.color label');

    colors.forEach(color=>{
        color.addEventListener('click',function(){
           let array = currentData.products.filter(product=>{
                let pic =product.pictures[0]
                let colorname=pic.substring(0,pic.search('.jpeg'))
                return colorname == color.attributes['for'].value.substring(1)
            })
   
            createCarouselElements(array[0].pictures)
           
        })
    }) 
   

    featureSelect={}
    feature_list[category].forEach(feature=>{

        if(feature == 'color')
        {
            document.querySelectorAll(`.${feature}_area label`).forEach(label=>{
                label.addEventListener('click',function(){  



                    featureSelect[`${feature}`]=label.querySelector("h3").innerHTML;;
              
                
                    if(Object.values(featureSelect).length==feature_list[category].length) 
                    {
                       
                      
                
                        let array = create()
                        console.log(array)
                    
                       document.querySelector(".price").innerHTML = `NT$${array.price}`
                    }
                
                })
            })
        }
        else
        {
            document.querySelectorAll(`.${feature}_area label`).forEach(label=>{
          
       
                // debugger
                label.addEventListener('click',function(){
                    // debugger
                    featureSelect[`${feature}`]=label.querySelector("span").innerHTML;;
              

                    console.log(Object.values(featureSelect).length==feature_list[category].length)
                  
                    if(Object.values(featureSelect).length==feature_list[category].length) 
                    {
                       
                      
                
                        let array = create()
                        console.log(array)
                    
                  
                        
                       document.querySelector(".price").innerHTML = `NT$${array.price}`
                    }
                
                })
            })
        }
   
    })

  
}

function create()
{
    let c;

    for(let data of currentData.products)
    {
        c=false
        for(let fea of feature_list[category])
        {
            if( data[fea] !== featureSelect[fea])
            {
                c=true
            }
           
        }

        if(c==false)
        return data
    }

  
}
window.onload = function(){
    
 document.querySelector(".category_group [for=iphone]").click()

 


}

function calculatePrice(){

}

function createCarouselElements(pictures){


    //處理幻燈片
    for(let index in pictures)
    {
      if(index == 0)
      {
      
          carousel_inner.innerHTML=''
          carousel_inner.innerHTML+=
          `<div class="carousel-item active">
          <img src="img/${category}/${pictures[index]}" class="d-block w-100" alt="...">
        </div>`
        carousel_indicators.innerHTML=''
        carousel_indicators.innerHTML+=
        `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="active" aria-current="true" aria-label="Slide ${++index}"></button>`
      }
      else
      {

         
          carousel_inner.innerHTML+=
          `<div class="carousel-item">
          <img src="img/${category}/${pictures[index]}" class="d-block w-100" alt="...">
        </div>`
              
        carousel_indicators.innerHTML+=
        `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" aria-current="true" aria-label="Slide ${++index}"></button>`
      }
    }
}

function createColorElements(set_item,feature){

  
    //比對依樣 準備取src
    let product = currentData.products.filter(data => {
        return data[feature] == set_item

    })
   
    let img = product[0].pictures
    let color = img[0].substring(0, img[0].search(".jpeg"))
  
    
return `
<div class="${feature} col">
     <input type="radio" id="#${color}" name="${feature}">
     <label for="#${color}" value="${feature}">
         <div class="pic w-100 text-center">
             <img src="img/${category}/${color}.png" alt="" class="">
         </div>
         <h3>${set_item}</h3>
     </label>
  </div>`
}

function createElements(feature,set_item,index){
    return `
    <div class="${feature} col">
         <input type="radio" id="#${feature}_${index}" name="${feature}">
         <label for="#${feature}_${index}" value="${feature}">
             <span>${set_item}</span>
         </label>
    </div>`
    
   
   
}


function createAreaElements(feature,index){

    let set = new Set()
    //每一項資料的feature抓出來塞進set 取不重複的
          currentData.products.forEach(product => {
            set.add(product[feature])
        })

        let allstring = "";

        //每一種顏色,容量,網路
        set.forEach(set_item => {


          if(feature == 'color')
          {
            allstring += createColorElements(set_item,feature)  
          }
          else
          {
            allstring += createElements(feature,set_item,index)
                index++
          }


   
        })

        document.querySelector(`.${feature}_group`).innerHTML = "";
        document.querySelector(`.${feature}_group`).innerHTML = allstring;


        // if(feature == 'color')
        // {
        //     console.log(document.querySelectorAll(`.${feature}_group label`))
        //     document.querySelectorAll(`.${feature}_group label`).forEach(label=>{
        //         console.log(label)
        //         label.addEventListener('click',function(){
        //             debugger
        //             console.log("ssfddf")
        //             console.log(featureSelect[`${feature}`])
        //             featureSelect[`${feature}`] = label.querySelector("h3").innerHTML;
        //             console.log(featureSelect[`${feature}`])
        //         })
        //     }) 
        // }
        // else
        // {
        //     document.querySelectorAll(`.${feature}_group label`).forEach(label=>{

        //         label.addEventListener('click',function(){
        //             debugger
        //             console.log("sdf")
        //             featureSelect[`${feature}`]=label.querySelector("span").innerHTML;
        //         })
        //     })
        // }


 
       
        set.clear()
}

function createAreas(feature){
     

    switch(feature){
        case 'color':
            txt.innerHTML+=
            `
            <div class="color_area">
                <h2>外觀。 挑選喜愛的顏色。</h2>
                <div class="color_group row-cols-2 row">
                </div>
            </div>
            `
            break
        case 'storage':
            txt.innerHTML+=
            ` <div class="storage_area">
            <h2>儲存裝置。 選擇需要的儲存空間大小。</h2>
            <div class="storage_group row-cols-2 row">
            </div>
          </div>
        `
            break
        case 'network':
            txt.innerHTML += 
            `
            <div class="network_area">
                <h2>連線能力。 選擇連線方式。</h2>
                <div class="network_group row-cols-2 row">
                </div>
            </div>
            `
            break
        case 'ram':
            txt.innerHTML+=
            ` 
            <div class="ram_area">
                <h2>記憶體。 選擇需要的記憶體大小。</h2>
                <div class="ram_group row-cols-2 row"> 
                </div>
            </div>
            `
            break


    }
}


function createTxt(){
    txt.innerHTML=''

    feature_list[category].forEach(feature => {
        createAreas(feature)
        let index =0
        createAreaElements(feature,index)

        
        // document.querySelectorAll(`.${feature}_area label`).forEach(label=>{
        //     console.log(label)
       
        //     // debugger
        //     label.addEventListener('click',function(){
        //         // debugger
        //         featureSelect[`${feature}`]=`${feature}`;
        //         console.log(featureSelect)
        //     })
        // })


       
        // document.querySelectorAll(`.storage label`).forEach(label=>{
            
        //     label.addEventListener('click',function(){
               
        //         featureSelect[`storage`]=123;
           
        //     })
        // })
        // document.querySelectorAll(`.color_group label`).forEach(label=>{
            
        //     label.addEventListener('click',function(){
             
        //         featureSelect[`color`]=123;
        
        //     })
        // })
        // document.querySelectorAll(`.ram label`).forEach(label=>{
            
        //     label.addEventListener('click',function(){
            
        //         featureSelect[`ram`]=123;
        //         console.log(featureSelect)
        //     })
        // })

        // console.log(document.querySelectorAll(`.color_group label`))
        //     document.querySelectorAll(`.color_group label`).forEach(label=>{
        //         console.log(label)
        //         label.addEventListener('click',function(){
                    
        //             console.log("ssfddf")
        //             featureSelect[`color`] = label.querySelector("h3").innerHTML;
        //             console.log(featureSelect[`color`])
        //         })
        //     }) 
        
        // debugger
        // if(feature == 'color')
        // {
        //     console.log(document.querySelectorAll(`.color_group label`))
        //     document.querySelectorAll(`.color_group label`).forEach(label=>{
        //         console.log(label)
        //         label.addEventListener('click',function(){
                    
        //             console.log("ssfddf")
        //             console.log(featureSelect[`color`])
        //             featureSelect[`color`] = label.querySelector("h3").innerHTML;
        //             console.log(featureSelect[`color`])
        //         })
        //     }) 
        // }
        // else
        // {
        //     document.querySelectorAll(`.${feature}_group label`).forEach(label=>{
        //         console.log(label)
        //         label.addEventListener('click',function(){
                    
        //             console.log("sdf")
        //             featureSelect[`${feature}`]=label.querySelector("span").innerHTML;
        //         })
        //     })
        // }
   

    })
}



