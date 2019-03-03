const list=document.querySelector('#list');
const form = document.querySelector('#add-elements');
//var dataset=[10,20,30,40];

//create elements and rendering function to display data
function render(doc){
	let li=document.createElement('li');
	let patientname=document.createElement('span');
    let aadharnoverify=document.createElement('span');
    let lastcheckupdateverify=document.createElement('span');
    let lastvaccinationverify=document.createElement('span');
    let diseaseverify=document.createElement('span');
    let toiletverify=document.createElement('span');
    

    
    //dataset.push(doc.data().phone);
	li.setAttribute('data-id',doc.id);
    patientname.textContent=doc.data().patientname;
    aadharnoverify.textContent=doc.data().aadharnoverify;
    lastcheckupdateverify.textContent=doc.data().lastcheckupdateverify;
    lastvaccinationverify.textContent=doc.data().lastvaccinationverify;
    diseaseverify.textContent=doc.data().diseaseverify;
    toiletverify.textContent=doc.data().toiletverify;
    
    
    
 
    li.appendChild(patientname);
    li.appendChild(aadharnoverify);
    li.appendChild(lastcheckupdateverify)
    li.appendChild(lastvaccinationverify);
    li.appendChild(diseaseverify);
    li.appendChild(toiletverify);
	list.appendChild(li);

}



db.collection('user').get().then((snapshot) => {
      console.log(snapshot.docs.forEach(doc => {
          render(doc);
      }))
  });
