google.charts.load("current", {packages:["corechart"]});
$(function(){

//----------------------------------------LINE CHART----------------------------------------
    $("#line").on('click', function(e){

        e.preventDefault();
        if(fileExist()){

            if($("#AvgWages").is(":checked")){

                //Avgwage line chart
                avgWageGraph("line");
               

            }else if($("#EstimatedPopulation").is(":checked")){

                // Est pop line chart
                estPopGraph("line");

            }else{
                document.getElementById('graph_div').innerHTML = "Please select AvgWage or Estimated Population to view this line chart";
            }
        }else{
            document.getElementById('graph_div').innerHTML = "Please upload a file to view this line chart";
        }

    });

//----------------------------------------PIE CHART----------------------------------------
    $("#pie").on('click', function(e){

        e.preventDefault();
        if(fileExist()){

            if($("#State").is(":checked")){

                //State Pie chart
                stateGraphs("pie");

            }else{
                document.getElementById('graph_div').innerHTML = "Please select State to view this pie chart";
            }
        }else{
            document.getElementById('graph_div').innerHTML = "Please upload a file to view this pie chart";
        }

    });

 //----------------------------------------BAR CHART----------------------------------------   
    $("#bar").on('click', function(e){

        e.preventDefault();
        if(fileExist()){

            if($("#AvgWages").is(":checked")){

                //Avgwage bar chart
                 avgWageGraph("bar");
                

            }else if($("#EstimatedPopulation").is(":checked")){

                // Est pop bar chart
                estPopGraph("bar");

            }else if($("#State").is(":checked")){

                // State Bar Graph
                stateGraphs("bar");

            }else{
                document.getElementById('graph_div').innerHTML = "Please select AvgWage or Estimated Population to view this bar chart";
            }
        }else{
            document.getElementById('graph_div').innerHTML = "Please upload a file to view this bar chart";
        }    
        
    });

//-------------------------------------------------------------File Exist Function-------------------------------------------------------------
    function fileExist(){

        return !(document.getElementById('csvFileButton').files[0] == null);

    }

//-------------------------------------------------------------Graph Functions-------------------------------------------------------------
    //Average Wage calculation and graph printing function 
    function avgWageGraph(graph_type){

        var avgWageState = new Object();

        for(var i = 1; i<lines.length-1;i++){

            input = lines[i].split(",");
            var state = input[4];
            var avgWage = parseFloat(input[20]);
            if(avgWageState.hasOwnProperty(state)){

                avgWageState[state].avgState += avgWage;
                avgWageState[state].count+= 1;

            }else{
                avgWageState[state] = {'avgState' : avgWage, 'count' : 1};
            }
                    
        }
                
        for(var key in avgWageState){

            avgWageState[key].avgState =  avgWageState[key].avgState / avgWageState[key].count;
            avgWageState[key].count = "";

        }

        var data = new google.visualization.DataTable();

        data.addColumn('string', 'State');
        data.addColumn('number', 'Average Wage');
    
        for(var key in avgWageState){

            avgStateGraph = avgWageState[key].avgState;
            data.addRow([key , avgStateGraph]);

        }
        var options;
        if(graph_type == "bar"){

            options = {

                title: 'Average wages by State',
                width: '95%',
                    
            };

        }else if(graph_type == 'line'){

            options = {

                title: 'Average wages by State',
                width: '95%',
    
            };

        }

        var formatter = new google.visualization.NumberFormat({

                prefix: '$',
                    
            });

        if(graph_type == 'line'){
            var chart = new google.visualization.LineChart(document.getElementById('graph_div'));
        }else if(graph_type == 'bar'){
            var chart = new google.visualization.BarChart(document.getElementById('graph_div'));
        }
        chart.draw(data, options);

    }

    // Estimiated Population and graph printing function
    function estPopGraph(graph_type){

        var estPopState = new Object();

        // Loop for adding states
        for(var i = 1; i<lines.length-1;i++){

            input = lines[i].split(",");
            var state = input[4];
            var estPop = parseInt(input[17]);
            if(estPopState.hasOwnProperty(state)){
                estPopState[state].estPop += estPop;
                estPopState[state].count+= 1;
            }else{
                    estPopState[state] = {'estPop' : estPop, 'count' : 1};
                }
                    
            }
                
        // Calculating Average
        for(var key in estPopState){
            estPopState[key].estPop =  estPopState[key].estPop / estPopState[key].count;
            estPopState[key].count = "";
        }

        var data = new google.visualization.DataTable();

        data.addColumn('string', 'State');
        data.addColumn('number', 'Estimated Population');

        for(var key in estPopState){
            data.addRow([key , parseInt(estPopState[key].estPop)]);
        }
          
        var options = {
            title: 'Average Estimated Population by State based on number of zipcodes per state',
            width: '95%',
        };


        if(graph_type == "line"){
            var chart = new google.visualization.LineChart(document.getElementById('graph_div'));
        }else if(graph_type == "bar"){
            var chart = new google.visualization.BarChart(document.getElementById('graph_div'));   
        }
                
        chart.draw(data, options);
    }

    // State Calculation and graph printing function
    function stateGraphs(graph_type){

        var stateCount = new Object();

        for(var i = 1; i<lines.length-1;i++){

            input = lines[i].split(",");
            var state = input[4];

            if(stateCount.hasOwnProperty(state)){
                stateCount[state].count+= 1;
            }else{
                stateCount[state] = {'count' : 1};
            }
                    
        }    
        
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'State');
        data.addColumn('number', 'Count');

        for(var key in stateCount){
            data.addRow([key , parseInt(stateCount[key].count)]);
        }

        var options = {
            title: 'Count of each state in table',
            width: '95%',
        };

        if(graph_type == "pie"){
            var chart = new google.visualization.PieChart(document.getElementById('graph_div'));
        }else if(graph_type == "bar"){
            var chart = new google.visualization.BarChart(document.getElementById('graph_div'));   
        }

        chart.draw(data, options);

    }

});