google.charts.load('current', {'packages':['table']});
var lines;
var tableHeader;
$(function(){

    $("#csvFile").on('click', function(e){

        e.preventDefault();
        $("#csvFileButton:hidden").trigger('click');

    });

    //Checks to see if browser is compatable. 
   function checkCompat(){
    var isCompatable = false;
    if(window.File && window.FileReader && window.FileList && window.Blob){
        isCompatable=true;
    }
    return isCompatable;
   }

   //If browser is compatable, then it will allow for file upload. Otherwise it will warn the user that it cannot. 
   if(checkCompat()){
    document.getElementById('csvFileButton').addEventListener('change', upload, false);
   }else{
        document.getElementById('messageArea').innerHTML = "This browser is not capable of file uploading";
   }

   //Code for when file is uploaded. 
   function upload(){

    var file = document.getElementById('csvFileButton').files[0];
    if(checkFile(file)){
        document.getElementById('messageArea').innerHTML = "File Successfully Uploaded!";
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            
            lines = reader.result.split("\n"); //array
            tableHeader = lines[0].split(","); //gets header of csv file
           
            google.charts.setOnLoadCallback(drawTable);

            }

        }else{

            document.getElementById('messageArea').innerHTML = "Unable to load file.";

        }
    }

   function checkFile(file){

        var fileSize = file.size;
        var sizeInMeg = fileSize / 1048576;
        //Assume the user's device is 8gb since I am unable to check memory
        var sizeCheck = 8000*.05; 
        var fileName = file.name;

        var fileCheck = fileName.split(".");
        var fileType = fileCheck[fileCheck.length-1];
      

        if(sizeInMeg>sizeCheck){

            document.getElementById('table_div').innerHTML = "The data requires more memory than the client can offer";
            return false;

        }else if(fileType != "csv"){

            document.getElementById('table_div').innerHTML = "The data is in wrong format. Only CSV file can be loaded!";

        }else{return true;}
        

   }


   function drawTable(){

        var data = new google.visualization.DataTable();

        //Loop for Header for table (Hard Coded for now)
        data.addColumn('number', 'RecordNumber');
        data.addColumn('number', 'Zipcode');
        data.addColumn('string', 'City');
        data.addColumn('string', 'State');
        data.addColumn('number', 'EstimatedPopulation');
        data.addColumn('number', 'AvgWages');
        data.addColumn('number', 'Latitude');
        data.addColumn('number', 'Longitude');        

        var input;
        var tableSize = (lines.length) - 1;
        console.log(tableSize);
        

        
        //Adding rows
        for(var i=1; i<lines.length-1; i++){

            input = lines[i].split(",");
            var recordNum = parseInt(input[0]);
            var zipCode = parseInt(input[1]);
            var city = input[3];
            var state = input[4];
            var estPop = parseInt(input[17]);
            var avgWage = parseFloat(input[20]);
            var lat = parseFloat(input[6]);
            var lon = parseFloat(input[7]);

            data.addRow([recordNum, zipCode, city, state, estPop, avgWage, lat, lon]);


        }

        var options = {

            showRowNumber: true,
            width: '100%',
            chartArea: {

                width: '100%'

            }

        }

        var formatter = new google.visualization.NumberFormat({

            pattern: '#####'

        });

        formatter.format(data, 1);
        formatter.format(data, 0);

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, options);

        document.getElementById('messageArea').innerHTML = "Successfully loaded " + tableSize + " records.";

   }

});