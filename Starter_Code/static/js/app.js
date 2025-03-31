// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    const metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    const filteredMeta = metadata.filter(meta => meta.id === sample)

    // Use d3 to select the panel with id of `#sample-metadata`
    const samMeta = d3.select('#sample-metadata');

    // Use `.html("") to clear any existing metadata
    samMeta.html('');

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    filteredMeta.forEach(meta => {
      Object.entries(meta).forEach(([key, value]) => {
        samMeta.append('h6').text(`${key}: ${value}`);
      });
    });
  });
}    



// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    const samples = data.samples;

    // Filter the samples for the object with the desired sample number
    const filteredSamples = samples.filter(samNumber => samNumber.id === sample);

    // Get the otu_ids, otu_labels, and sample_values
    const otu_ids = filteredSamples[0].otu_ids;
    const otu_labels = filteredSamples[0].otu_labels;
    const sample_values = filteredSamples[0].sample_values;

    // Build a Bubble Chart
    let trace1 = {
      x : otu_ids,
      y : sample_values,
      text: otu_labels,
      mode : 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      }
    };

    let layout = {
      title: 'Bubble Chart of Sample Values',
      xaxis: {title: 'OTU ID\'s'},
      yaxis: {title: 'Sample Values'}
    };  

    // Render the Bubble Chart
    Plotly.newPlot('bubble', [trace1],layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    const otuTopTemp = sample_values.map((value, index) => [value, index])
     .sort((a,b) => b - a)
     .slice(0,10);
    
    
    const otuTopTen = otuTopTemp.map(item => otu_ids[item[1]]);
    const sampleTopTen = otuTopTemp.map(item => item[0]);
    const labelsTopTen = otuTopTemp.map(item => otu_labels[item[1]]);
   
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let trace2 = {
      x: sampleTopTen,
      y: otuTopTen.map( id => `OTU ${id}`),
      text: labelsTopTen,
      type: 'bar',
      orientation: 'h'  
    };

    let layoutBar = {
      title: 'OTUs: Top Ten',
      xaxis: {title: 'Sample Values'},
      yaxis: {title: 'OTU ID\'s'},
      yaxis: {autorange: 'reversed'}
    };

    // Render the Bar Chart
    Plotly.newPlot('bar', [trace2], layoutBar)

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    const namesField = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    dropdown = d3.select('#selDataset')

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    namesField.forEach(name => {
      dropdown.append('option')
        .text(name)
        .property('value', name);
    });
    

    // Get the first sample from the list
    const sampleOne = namesField[0];

    // Build charts and metadata panel with the first sample
    buildCharts(sampleOne);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
