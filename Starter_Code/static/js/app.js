d3.json("samples.json").then((data) => {
    console.log(data.samples)

    console.log(data.samples[0])

    // d3.select(".well")
    //     .append("option")
    //     .text("Hello")

    d3.select("#selDataset")
        // .selectAll("option")
        .selectAll("option")
        .data(data.samples)
        // .append("option")
        .enter()
        .append("option")
        .attr("value", d => d.id)
        .text(d => d.id)


    console.log("Hello")

    otu_y_ids =  data.samples[0].otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`)

    console.log(otu_y_ids)

    function init(data) {

        var trace = {
            type: 'bar',
            y: otu_y_ids,
            x: data.samples[0].sample_values.slice(0,10).reverse(),
            orientation: 'h',
            text: data.samples[0].otu_labels.slice(0,10).reverse()

        };

        var data = [trace]
        
        Plotly.newPlot('bar', data);

    }

    init(data);

    d3.selectAll("#selDataset").on("change", optionChanged);

    function optionChanged() {

        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");
        // Initialize an empty array for the country's data
        // var data = [];
      
        console.log(dataset)
        
        console.log(data.samples)

        var x = []
        var y = []

        var x = data.samples.map(d, index => {
            if (d.id == dataset) {
                var xx = d.sample_values
                console.log(xx)
            }

        })

        console.log(x)

        var y = data.samples.map(d => {
            if (d.id == dataset) {
                // console.log(d.otu_ids)
                // return d.otu_ids
            }
        })

        // Plotly.restyle("bar", "x", [x]);
        // Plotly.restyle("bar", "y", [y]);





        // else if (dataset == 'uk') {
        //     data = uk;
        // }
        // else if (dataset == 'canada') {
        //     data = canada;
        // }
        // Call function to update the chart
        // updatePlotly(data);

    }



});

