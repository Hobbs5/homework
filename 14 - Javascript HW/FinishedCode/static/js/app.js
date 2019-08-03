// from data.js
var tableData = data;
var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var inputelement = d3.select("#datetime");

tableData.forEach((UFO) => {
    var row = tbody.append("tr");
    Object.entries(UFO).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });

  });

  button.on("click", function(){
    //   console.log("hi")
    var table = d3.select("#ufo-table");
    tbody.html(""); 
    var inputValue = inputelement.property("value")
    console.log(inputValue)

    tableData.forEach((UFO) => {
        console.log(inputValue == UFO.datetime)
        if(inputValue == UFO.datetime){
            var row = tbody.append("tr");
            Object.entries(UFO).forEach(([key, value]) => {
              var cell = row.append("td");
              cell.text(value);
            });
        };
      });
      
  });
