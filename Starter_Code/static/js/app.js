
d3.json("samples.json").then((data) => {

    console.log(data.samples)
    console.log(data.samples[0])

    console.log(data.metadata[0])

    // // MetaDATA 
    // var panel = d3.select("#sample-metadata")

    //     .selectAll("div")
    //     .data(data.metadata[0])
    //     .enter()
    //     .append("div")
    //     .text("hello")

    var panel = d3.select("#sample-metadata");
        Object.entries(data.metadata[0]).forEach(([key, value]) => {
            panel.append("h6").text(`${key}:${value}`)
        })


    d3.select("#selDataset")
        // .selectAll("option")
        .selectAll("option")
        .data(data.samples)
        // .append("option")
        .enter()
        .append("option")
        .attr("value", d => d.id)
        .text(d => d.id)

    function init(data) {


        //  BAR PLOT
        var trace = {
            type: 'bar',
            y: data.samples[0].otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`),
            x: data.samples[0].sample_values.slice(0,10).reverse(),
            orientation: 'h',
            text: data.samples[0].otu_labels.slice(0,10).reverse()

        };

        var bar_data = [trace]
        
        Plotly.newPlot("bar", bar_data);

        // BUBBLE CHART
        var trace2 = {
            x: data.samples[0].otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`),
            y: data.samples[0].sample_values.slice(0,10).reverse(),
            mode: "markers",
            marker: {
                colors: data.samples[0].otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`),
                // colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'],
                size: data.samples[0].sample_values.slice(0,10).reverse()

            }
        };
          

        console.log(data.samples[0].otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`))
        console.log(data.samples[0].sample_values.slice(0,10).reverse())
        

        var data2 = [trace2];

        Plotly.newPlot("bubble", data2)

    }

    init(data);

    d3.selectAll("#selDataset").on("change", optionChanged);

    function optionChanged() {

        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");
        // Initialize an empty array for the country's data
      
        console.log(dataset)
        console.log(data.samples)

        var x = []
        var y = []

        for (i = 0; i < data.samples.length; i++) {
            if (dataset == data.samples[i].id) {
            
                x = data.samples[i].sample_values.slice(0,10).reverse()
                y = data.samples[i].otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`)
                text = data.samples[i].otu_labels.slice(0,10).reverse()
                

                console.log(x)
                console.log(y)
                console.log(text)

                // Meta
                var panel = d3.select("#sample-metadata");
                panel.selectAll("h6").remove()
                console.log(data.metadata[i])
                Object.entries(data.metadata[i]).forEach(([key, value]) => {
                panel.append("h6").text(`${key}:${value}`)
                })



            


            }
            


            
        }

        Plotly.restyle("bar", "x", [x]);
        Plotly.restyle("bar", "y", [y]);
        Plotly.restyle("bar", "text", text);
        Plotly.restyle("bubble", "x", [x])
        Plotly.restyle("bubble", "y", [y])





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

