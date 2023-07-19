setInterval(setClock,1000)


const hourHand=document.querySelector('[data-hour-hand]')
const minuteHand=document.querySelector('[data-minute-hand]')
const secondHand=document.querySelector('[data-second-hand]')
const dig_hour=document.querySelector('.dig-hour')
const dig_min=document.querySelector('.dig-min')
const dig_sec=document.querySelector('.dig-sec')
const dig_ampm=document.querySelector('.dig-ampm')


const stp_hr=document.querySelector('.stop-hour')
const stp_min=document.querySelector('.stop-min')
const stp_sec=document.querySelector('.stop-sec')
const start=document.querySelector('.start')
const stop=document.querySelector('.stop')
const reset=document.querySelector('.reset')


const resday=document.querySelector('.resday')
const day_in=document.querySelector('.cal_day')
const month_in=document.querySelector('.cal_month')
const year_in=document.querySelector('.cal_year')
const submit=document.querySelector('.submit')

const tk=document.querySelector('.totalclock')
const ts=document.querySelector('.totalstopwatch')
const td=document.querySelector('.totalday')
const cbtn=document.querySelector('.clockbtn')
const sbtn=document.querySelector('.stp')
const dbtn=document.querySelector('.day')
//button management
cbtn.addEventListener('click',()=>{
   cbtn.style.backgroundColor="black"
   cbtn.style.color="white"
   sbtn.style.backgroundColor="white"
   sbtn.style.color="black"
   dbtn.style.backgroundColor="white"

   dbtn.style.color="black"
   tk.style.display='block'
   ts.style.display='none'
   td.style.display='none'

   tk.style.opacity=1
   ts.style.opacity=0
   td.style.opacity=0
   

})
sbtn.addEventListener('click',()=>{
    cbtn.style.backgroundColor="white"
    cbtn.style.color="black"
    sbtn.style.backgroundColor="black"
    sbtn.style.color="white"
    dbtn.style.backgroundColor="white"
    dbtn.style.color="black"

    tk.style.display='none'
    ts.style.display='block'
    td.style.display='none'

    tk.style.opacity=0
    ts.style.opacity=1
    td.style.opacity=0

})
dbtn.addEventListener('click',()=>{
    cbtn.style.backgroundColor="white"
    cbtn.style.color="black"
    sbtn.style.backgroundColor="white"
    sbtn.style.color="black"
    dbtn.style.backgroundColor="black"
    dbtn.style.color="white"

    tk.style.display='none'
    ts.style.display='none'
    td.style.display='block'

    tk.style.opacity=0
    ts.style.opacity=0
    td.style.opacity=1

})


function setClock(){
    const currentDate=new Date()
    const secondsRatio= currentDate.getSeconds()/60;
    const minutesRatio= (secondsRatio +currentDate.getMinutes())/60;
    const hoursRatio=( minutesRatio +currentDate.getHours())/12;
    setRotation(secondHand,secondsRatio)
    setRotation(minuteHand,minutesRatio)
    setRotation(hourHand,hoursRatio)

    // digital logic 
    let hr=currentDate.getHours()
    let min=currentDate.getMinutes()
    let sec=currentDate.getSeconds()
    let ampm='AM'
    if(hr>12){
        ampm='PM'
        hr=currentDate.getHours()-12

    }
    if(hr==12){
        ampm="PM"
    }
    if(hr<10){
        hr=`0${hr}`
    }

    if(min<10){
        min=`0${currentDate.getMinutes()}`
    }

    if(sec<10){
        sec=`0${sec}`
    }
    else{
        sec=currentDate.getSeconds()
    }
    dig_hour.innerHTML=`${hr}hrs`
    dig_min.innerHTML=`${min}mins`
    dig_sec.innerHTML=`${sec}sec`
    dig_ampm.innerHTML=`${ampm}`

    
}

function setRotation(element,rotationRatio){
    element.style.setProperty('--rotation',rotationRatio*360)
}


//stop watch
let in_hr,in_sec,in_min;
let min_cal=0
let sec_cal=0
let hr_cal=0
function stopWatch(){
    let date1=new Date()
    ex_hr=date1.getHours()
    ex_min=date1.getMinutes()
    ex_sec=date1.getSeconds()

    sec_cal=ex_sec-in_sec
    sub_min_cal=min_cal
    sub_hr_cal=hr_cal
    if(ex_sec<in_sec){
        sec_cal=60-in_sec+ex_sec
    }

    if(sec_cal<10){
        sec_cal=`0${sec_cal}`
    }
    stp_sec.innerHTML=`${sec_cal}`

    if(sec_cal==59){
        min_cal++
    }
    if(min_cal<10){
        sub_min_cal=`0${min_cal}`
    }
    stp_min.innerHTML=`${sub_min_cal}`
    if(min_cal==59){
        hr_cal++
    }
    if(hr_cal<10){
        sub_hr_cal=`0${hr_cal}`
    }
    stp_hr.innerHTML=`${sub_hr_cal}`
    

}
let stpinterval
start.addEventListener('click',()=>{
    let date=new Date()
    in_hr=date.getHours()
    in_min=date.getMinutes()
    in_sec=date.getSeconds()
    stpinterval= setInterval(stopWatch,1000)
})

stop.addEventListener('click',()=>{
   clearInterval(stpinterval)
})

reset.addEventListener('click',()=>{
    clearInterval(stpinterval)
    stp_sec.innerHTML=`00`
    stp_min.innerHTML=`00`
    stp_hr.innerHTML=`00`
})

// Day Calculater
month_code={1:1,2:4,3:4,4:0,5:2,6:5,7:0,8:3,9:6,10:1,11:4,12:6}
century_code={15:0,16:6,17:4,18:2,19:0,20:6}

day_code={0:"Saturday",1:"Sunday",2:"Monday",3:"Tuesday",4:"Wednesday",5:"Thursday",6:"Friday"}
let day,month,year,final_cal,century
day_in.addEventListener('change',()=>{
    day=day_in.value
    

})
month_in.addEventListener('change',()=>{
    month=month_in.value

})
year_in.addEventListener('change',()=>{
    year=year_in.value

})
submit.addEventListener('click',()=>{
   
    day=+day
    month=+month
    year=+year
    century=Math.floor(year/100)
    year=year-century*100


    final_cal=day
    final_cal+=month_code[month]
    let ind=century
    final_cal+=century_code[ind]
    final_cal+=year
    final_cal+=Math.floor(year/4)
    final_cal=final_cal%7
    resday.innerHTML=`${day}-${month}-${year} : ${day_code[final_cal]}`
 
    

    
   
})


