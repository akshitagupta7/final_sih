
var arr = [];


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


  var arr2 = [];
  var x = 0;
  for (var j = 0; j < arr1.length; j++) {
    var k = 0;
    console.log(arr1[j])

    db.collection('user').where("region", "==", arr1[j]).get().then((snapshot) => {
      console.log(snapshot.docs.forEach(doc => {
       // console.log(arr1[j] + "   heyy")
        k++

      }))
    });
    result = await resolveAfter2Seconds();
    arr2[j] = k;


  }
  console.log(arr2)
  result = await resolveAfter2Seconds();
  var arr4=[];
  for(var j=0;j<arr3.length;j++){
    var k=0;
    console.log(arr3[j]);
    db.collection('user').where("phcno", "==", arr3[j]).get().then((snapshot) => {
      console.log(snapshot.docs.forEach(doc => {
        //console.log(arr3[j] + "   heyy")
        k++

      }))
    });
    result = await resolveAfter2Seconds();
    arr4[j] = k;

  }
console.log(arr4)
result = await resolveAfter2Seconds();
var arryes=[];
var arrno=[];
for(var j=0;j<arr1.length;j++){
  var kyes=0;
  var kno=0;
  db.collection('user').where("region", "==", arr1[j]).get().then((snapshot) => {
    console.log(snapshot.docs.forEach(doc => {
      // console.log(arr1[j] + "   heyy")
      // k++
      if(doc.data().toilet){
        kyes++;
      }else{
        kno++;
      }

    }))
  });
  result = await resolveAfter2Seconds();
  arryes[j] = kyes;
  arrno[j]=kno;

}
result = await resolveAfter2Seconds();

console.log(arr1)
console.log(arryes)
console.log(arrno)
var arrmonth=[];
for(var j=1;j<=9;j++){
  var k=0;
  db.collection('user').where("currentmonth", "==", j).get().then((snapshot) => {
    console.log(snapshot.docs.forEach(doc => {
      k++;

    }))
  });
  result = await resolveAfter2Seconds();
  arrmonth[j] = k;
}
result = await resolveAfter2Seconds();
console.log(arrmonth)

 var barChart= new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        {
          label: "No of pregnant women",
          backgroundColor: ["#3e90cd", "#8e5992", "#3cba9f", "#e8c3b9", "#c45850",'#ff66d9','#66a3ff','#00e6e6'],
          data: []
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Number of Pregnant women in different district'
      }
    }
  });
  result = await resolveAfter2Seconds();
  var pieChart=new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
    data: {
      labels: [],
      datasets: [{
        label: "PUBLIC HEALTH CENTER NO",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", '#cce6ff','#ffe6b3'],
        data: []
      }]
    },
    options: {
      title: {
        display: true,
        text: 'No of patients'
      }
    }
});
var barChartGrouped=new Chart(document.getElementById("bar-chart-grouped"), {
  type: 'bar',
  data: {
    labels: [arr1[0], arr1[1], arr1[2]],
    datasets: [
      {
        label: "Access to proper sanitation",
        backgroundColor: "#3e95cd",
        data: [arryes[0],arryes[1],arryes[2]]
      }, {
        label: "No access to proper sanitation",
        backgroundColor: "#8e5ea2",
        data: [arrno[0],arrno[1],arrno[2]]
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Sanitation Measures in different regions'
    }
  }
});
var lineChart=new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: [1,2,3,4,5,6,7,8,9],
    datasets: [{ 
        data: [arrmonth[1],arrmonth[2],arrmonth[3],arrmonth[4],arrmonth[5],arrmonth[6],arrmonth[7],arrmonth[8],arrmonth[9]],
        label: "Months",
        borderColor: "#3e95cd",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'No of pregnant women in each month'
    }
  }
});


function addData(){
       
    
      

    for(var i=0;i<arr1.length;i++){
        barChart.data.labels.push(arr1[i]);
        barChart.data.datasets[0].data.push(arr2[i]);
        
    }

    barChart.update();
    for(var i=0;i<arr3.length;i++){
        pieChart.data.labels.push(arr3[i]);
        pieChart.data.datasets[0].data.push(arr4[i]);
        
    }

    pieChart.update();
    for(var i=0;i<arr1.length;i++){
        barChartGrouped.data.labels.push(arr1[i]);
        barChartGrouped.data.datasets[0].data.push(arryes[i]);
        barChartGrouped.data.datasets[1].data.push(arrno[i]);
    }

    barChartGrouped.update();
    for(var i=1;i<=9;i++){
        lineChart.data.labels.push(i);
        lineChart.data.datasets[0].data.push(arrmonth[i]);
        
    }

    lineChart.update();
    }
    addData();
    
}

asyncCall();
console.log(arr)
// var arr = [];
// var myLineChart;

// function resolveAfter2Seconds() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(arr[0]);
//     }, 1000);
//   });
// }

// async function asyncCall() {
//   function onlyUnique(value, index, self) { 
//     return self.indexOf(value) === index;
// }
//   db.collection('user').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {

//       arr.push(doc.data());

//     })
//   });
//   console.log(arr)

//   var result = await resolveAfter2Seconds();


//   var i = 0;
//   var len = arr.length;
//   var arr1 = [];
//   var arr3 = [];
//   var arrdisease=[];
//   for (; i < len; i++) {
//     arr1.push(arr[i].region)
//     arr3.push(arr[i].phcno)
//     arrdisease.push(arr[i].disease)
//   }
//   arr1=arr1.filter( onlyUnique )
//   arr3=arr3.filter(onlyUnique)
//   arrdisease=arrdisease.filter(onlyUnique)
//   console.log(arr1)
//   console.log(arr3)
//   console.log(arrdisease)

//   var diseasepatient=[];
// for(var j=0;j<arrdisease.length;j++){
//   var k=0;
//   console.log(arrdisease[j]);
//   db.collection('user').where("disease", "==", arrdisease[j]).get().then((snapshot) => {
//     console.log(snapshot.docs.forEach(doc => {
//      // console.log(arr3[j] + "   heyy")
//       k++

//     }))
//   });
//   result = await resolveAfter2Seconds();
//   diseasepatient[j] = k;

// }
// console.log(diseasepatient)
//   result = await resolveAfter2Seconds();




// myLineChart=new Chart(document.getElementById("polar-chart"), {
//   type: 'polarArea',
//   data: {
//     labels: [1,4,7,2],
//     datasets: [
//       {
//         label: "Population (millions)",
//         backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#e8c3b1","#c45852","#e8c3b3","#c45854"],
//         data: [3,6,2,8]
//       }
//     ]
//   },
//   options: {
//     title: {
//       display: true,
//       text: 'Diseases Faced By Women'
//     }
//   }
// });
// //   myLineChart.data.datasets[0].data[3]=12;
// //  myLineChart.data.labels[3]='feverish'
// //   myLineChart.update();
// //   console.log('###########', myLineChart.data.datasets[0].data);
// //   console.log('###########', myLineChart.data.labels);

// console.log('&&&&&&&&&&', myLineChart.data.datasets[0].data);
// console.log('&&&&&&&&&', myLineChart.data.labels);
  
// function addData(){
//     // console.log('hi');
//    console.log('***', myLineChart.data.datasets[0].data);
//    console.log('***', myLineChart.data.labels);


//     for(var i=0;i<arrdisease.length;i++){
//         console.log('bye')
//         myLineChart.data.datasets[0].data.push(i);
//         //myLineChart.data.datasets[0].data.push(arrdisease[i]);
//         myLineChart.data.labels.push(diseasepatient[i]);
//     }
// //myLineChart.data.datasets[0].data[2]=12;
// console.log('***', myLineChart.data.datasets[0].data);
// console.log('***', myLineChart.data.labels);
// myLineChart.update();
// console.log('update called')
// }
// addData();



// }

// asyncCall();
// console.log(arr)