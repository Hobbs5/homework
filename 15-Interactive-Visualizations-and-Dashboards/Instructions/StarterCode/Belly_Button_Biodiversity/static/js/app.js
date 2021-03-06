function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  
  // Use d3 to select the panel with id of `#sample-metadata`
  var metadatapanel = d3.select (`#sample-metadata`).html("")

  // Use `.html("") to clear any existing metadata
  d3.json(`/metadata/${sample}`).then((response)=>{
    

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
   Object.entries(response).forEach(([key, value])=>{
     var row = metadatapanel.append("p")
     row.text(`${key}: ${value}`)

   })
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  })
}

function buildCharts(sample) {
  
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then((sampleResponse)=>{

  
    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    var trace = {
      values: sampleResponse.sample_values.slice(0,10),
      labels: sampleResponse.otu_ids,
      hovertext:sampleResponse.otu_lables,
      type: 'pie'
    };

    var layout = {
      title: "Bellybutton diversity",
      margin: {
        l:35,
        r:35,
        t:35,
        b:35
      }
    }

    Plotly.newPlot('pie',[trace], layout)
    var tracebubble = {
      x: sampleResponse.otu_ids,
      y: sampleResponse.sample_values,
      mode: 'markers',
      hovertext: sampleResponse.otu_lables,
      marker: {
        size: sampleResponse.sample_values,
        color: sampleResponse.otu_ids
      }
      
    }
    var layoutbubbs = {
      title: "Bellybutton diversity Bubbles",
      margin: {
        l:55,
        r:55,
        t:55,
        b:55
      }
    }
    Plotly.newPlot('bubble',[tracebubble],layoutbubbs)
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  })
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
