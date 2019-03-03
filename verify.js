// console.log(localStorage)
// console.log("local")
// localStorage.setItem('name','value');
// console.log(localStorage)
const list=document.querySelector('#list');
const form = document.querySelector('#add-elements');
//var dataset=[10,20,30,40];

//create elements and rendering function to display data
function render(doc){
	let li=document.createElement('li');
	//let patientname=document.createElement('span');
    let aadharno=document.createElement('span');
    let mobileno=document.createElement('span');
    let region=document.createElement('span');
    let phcno=document.createElement('span');
    //let currentweight=document.createElement('span');
    let toilet=document.createElement('span');
    let disease=document.createElement('span');
    let currentmonth=document.createElement('span');
    let lastcheckup=document.createElement('span');
    let lastvaccination=document.createElement('span');
    let button=document.createElement('button');
    button.addEventListener('click',()=>{
    localStorage.setItem('button',doc.id);
    button.setAttribute('content','Dial to call')
        window.open("indexdial.html");
        

    })
    //dataset.push(doc.data().phone);
	li.setAttribute('data-id',doc.id);
    //patientname.textContent=doc.data().patientname;
    aadharno.textContent=doc.data().aadharno;
    mobileno.textContent=doc.data().mobileno;
    region.textContent=doc.data().region;
    phcno.textContent=doc.data().phcno;
    currentmonth.textContent=doc.data().currentmonth;
    lastcheckup.textContent=doc.data().lastcheckupdate;
    lastvaccination.textContent=doc.data().lastvaccinationdate;
 //   disease.textContent=doc.data().disease;
    toilet.textContent=doc.data().toilet;
    
    
    
 
  //  li.appendChild(patientname);
    li.appendChild(aadharno);
    li.appendChild(mobileno)
    li.appendChild(region);
 //   li.appendChild(phcno);
    
    li.appendChild(currentmonth);
    li.appendChild(lastcheckup);
    li.appendChild(lastvaccination);
    li.appendChild(toilet);
    
    li.appendChild(button)
	list.appendChild(li);

}



db.collection('user').get().then((snapshot) => {
      console.log(snapshot.docs.forEach(doc => {
          render(doc);
      }))
  });



