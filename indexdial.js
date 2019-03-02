var id= localStorage.getItem('button');
var ref=db.collection('user').doc(id);
var name='';
var date='';
var vaccindate='';
var toilet='';
ref.get().then(function(doc) {
  if (doc.exists) {
      name=doc.data().patientname;
      date=doc.data().lastcheckupdate;
      vaccindate=doc.data().lastvaccinationdate;
      toilet=doc.data().toilet;
  } else {
      console.log("No such document!");
  }
})

var param= {
  onend: afteraudio
}
var param2={
  onend: afteraudio2
}

var param3={
onend: afteraudio3
}

var param4={
onend: afteraudio4
}

var param5={
  onend: afteraudio5
}

var res='';

function saysomething1(){
  setTimeout(function(){
    responsiveVoice.speak('Was your last checkup date' + date+'if yes press 1, else press 2','Hindi Female', param2);
  },300);
  db.collection('user').doc(id).update({
    lastcheckupdateverify: true
  })
}

function saysomething2(){
  setTimeout(function(){
    responsiveVoice.speak('Was your last checkup date' + date+'if yes press 1, else press 2','Hindi Female', param2);
  },300);
}

function saysomething3(){
  setTimeout(function(){
    responsiveVoice.speak('Was your last vaccination date '+ vaccindate+ 'if yes, press 1, else press 2','Hindi Female',param3);
  },300);
  db.collection('user').doc(id).update({
    lastvaccinationverify: true
  })
}


function saysomething4(){
  setTimeout(function(){
    responsiveVoice.speak('Was your last vaccination date '+ vaccindate+ 'if yes, press 1, else press 2','Hindi Female',param3);
  },300);
}

function saysomething5(){
  setTimeout(function(){
    var str='no';
    if(toilet=='true'){
      str='';
    }
    responsiveVoice.speak('According to our records, there are'+ str +'toilets in your area, if yes press 1 else press 2','Hindi Female',param4);
  },300);
  db.collection('user').doc(id).update({
    toiletverify: true
  })
}


function saysomething6(){
  setTimeout(function(){
    var str='no';
    if(toilet=='true'){
      str='';
    }
    responsiveVoice.speak('According to our records, there are'+ str +'toilets in your area, if yes press 1 else press 2','Hindi Female',param4);
  },300);
}


function saysomething7(){
  setTimeout(function(){
    responsiveVoice.speak('Thank you for your valuable time','Hindi Female',param5);
  },300);
}

function saysomething8(){
  setTimeout(function(){
    responsiveVoice.speak('Thank you for your valuable time','Hindi Female',param5);
  },300);
}

function afteraudio(){
  console.log('called');
  document.getElementById("one").addEventListener('click',saysomething1);
  document.getElementById("two").addEventListener('click',saysomething2);
}

function afteraudio2(){
    document.getElementById("one").removeEventListener('click',saysomething1);
    document.getElementById("two").removeEventListener('click',saysomething2);
    document.getElementById("one").addEventListener('click',saysomething3);
    document.getElementById("two").addEventListener('click', saysomething4);
}

function afteraudio3(){
  document.getElementById("one").removeEventListener('click',saysomething3);
  document.getElementById("two").removeEventListener('click',saysomething4);
  document.getElementById("one").addEventListener('click',saysomething5);
  document.getElementById("two").addEventListener('click', saysomething6);
}

function afteraudio4(){
  document.getElementById("one").removeEventListener('click',saysomething5);
  document.getElementById("two").removeEventListener('click',saysomething6);
  document.getElementById("one").addEventListener('click',saysomething7);
  document.getElementById("two").addEventListener('click', saysomething8);
  
}
function afteraudio5(){
  document.getElementById("one").removeEventListener('click',saysomething7);
  document.getElementById("two").removeEventListener('click',saysomething8);
}





function start(){
    var audio= new Audio('audios/ring.mp3');
    audio.play();
    setTimeout(function(){
      responsiveVoice.speak('Welcome to our service, please enter your aadhar number','Hindi Female', param);
    },3000);
  }
start();