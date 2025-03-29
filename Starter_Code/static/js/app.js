// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    const metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    const filteredMeta = metadata.filter(meta => meta.id === sample)

    // Use d3 to select the panel with id of `#sample-metadata`
    const samMeta = d3.selectAll('#sample-metadata');

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
      markers: {
        color: otu_ids,
        size: sample_values,

      }
    }

    

    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
