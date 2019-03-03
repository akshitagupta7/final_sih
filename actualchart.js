var arr = [];
// var myLineChart;

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(arr[0]);
    }, 1000);
  });
}

async function asyncCall() {
  function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
  db.collection('user').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {

      arr.push(doc.data());

    })
  });
  console.log(arr)

  var result = await resolveAfter2Seconds();


  var i = 0;
  var len = arr.length;
  var arr1 = [];
  var arr3 = [];
  var arrdisease=[];
  for (; i < len; i++) {
    arr1.push(arr[i].region)
    arr3.push(arr[i].phcno)
    arrdisease.push(arr[i].disease)
  }
  arr1=arr1.filter( onlyUnique )
  arr3=arr3.filter(onlyUnique)
  arrdisease=arrdisease.filter(onlyUnique)
  console.log(arr1)
  console.log(arr3)
  console.log(arrdisease)

  var diseasepatient=[];
for(var j=0;j<arrdisease.length;j++){
  var k=0;
  console.log(arrdisease[j]);
  db.collection('user').where("disease", "==", arrdisease[j]).get().then((snapshot) => {
    console.log(snapshot.docs.forEach(doc => {
     // console.log(arr3[j] + "   heyy")
      k++

    }))
  });
  result = await resolveAfter2Seconds();
  diseasepatient[j] = k;

}
console.log(diseasepatient)
  result = await resolveAfter2Seconds();




var myLineChart=new Chart(document.getElementById("polar-chart"), {
  type: 'polarArea',
  data: {
    labels: [],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#e8c3b1","#c45852","#e8c3b3","#c45854"],
        data: []
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Diseases Faced By Women'
    }
  }
});
//   myLineChart.data.datasets[0].data[3]=12;
//  myLineChart.data.labels[3]='feverish'
//   myLineChart.update();
//   console.log('###########', myLineChart.data.datasets[0].data);
//   console.log('###########', myLineChart.data.labels);

console.log('&&&&&&&&&&', myLineChart.data.datasets[0].data);
console.log('&&&&&&&&&', myLineChart.data.labels);
  
function addData(){
    // console.log('hi');
   console.log('*********', myLineChart.data.datasets[0].data);
   console.log('*********', myLineChart.data.labels);


    for(var i=0;i<arrdisease.length;i++){
        console.log('bye')
        myLineChart.data.datasets[0].data.push(arrdisease[i]);
        myLineChart.data.labels.push(diseasepatient[i]);
    }
//myLineChart.data.datasets[0].data[2]=12;
console.log('*********', myLineChart.data.datasets[0].data);
console.log('*********', myLineChart.data.labels);
myLineChart.update();
console.log('update called')
}
addData();



}

asyncCall();
console.log(arr)