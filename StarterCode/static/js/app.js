

function BuildCharts(selected) {

    //console.log(selected)

    d3.json("samples.json").then((data) => {

        
        // Filter by selected
        console.log(data);
        let meta_data = data.metadata.filter(obj => obj.id == selected);
        let sample_data = data.samples.filter(obj => obj.id == selected);
        //console.log("sample_data: ", sample_data);
        
        // Horizontal Bar
        sample_values = sample_data[0].sample_values.slice(0,10).reverse();
        otu_ids = sample_data[0].otu_ids.slice(0,10).reverse();
        otu_labels = sample_data[0].otu_labels.slice(0,10).reverse();

        

        string_otu_ids = otu_ids.map(function(e){ return e.toString()});

        new_arr = [sample_values, string_otu_ids, otu_labels];
        //console.log("new", new_arr)
 
        const otu = "OTU "
        for (let i = 0; i < new_arr[1].length; i++) {
            new_arr[1][i] = otu.concat(new_arr[1][i]);
        }
        
        //console.log("string?", new_arr[1]);
        
        let trace1 = {
            x: new_arr[0],
            y: new_arr[1],
            text: new_arr[2],
            type: "bar",
            orientation: "h"
        };

        let traceData = [trace1];
        Plotly.newPlot("bar", traceData);

        // Bubble Chart
        var trace2 = {
            x: sample_data[0].otu_ids,
            y: sample_data[0].sample_values,
            text: sample_data[0].otu_labels,
            mode: 'markers',
            marker: {
              color: sample_data[0].otu_ids,
              size: sample_data[0].sample_values
            }
          };
          
          var data = [trace2];
          
          var layout = {
            showlegend: false,
            height: 600,
            width: 1200,
            
          };
          
          Plotly.newPlot('bubble', data, layout);

        // Metadata
        
        
        console.log("meta", meta_data);
        meta_id = meta_data[0].id;
        meta_ethnicity = meta_data[0].ethnicity;
        meta_gender = meta_data[0].gender;
        meta_age = meta_data[0].age;
        meta_location = meta_data[0].location;
        meta_bbtype = meta_data[0].bbtype;
        meta_wfreq = meta_data[0].wfreq;

        var panel = d3.select(".panel-body");
        panel.text("");
        panel.append("p").text("id: " + meta_id);
        panel.append("p").text("ethnicity: " + meta_ethnicity);
        panel.append("p").text("gender: " + meta_gender);
        panel.append("p").text("age: " + meta_age);
        panel.append("p").text("location " + meta_location);
        panel.append("p").text("bbtype: " + meta_bbtype);
        panel.append("p").text("wfreq: " + meta_wfreq);
    })

}







d3.json("samples.json").then((data) => {

    //console.log(data.names)

    let dropdown = d3.select("#selDataset")

    data.names.forEach((id) => {

        dropdown.append("option").text(id).property("value", id)
    });

   
    BuildCharts(data.names[0])


})

function optionChanged(selected) {


    BuildCharts(selected)
}


