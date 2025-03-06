var selectedYear = 2024;
var selectedWeek = 1;

// setPageTitle(); // TODO 
//getData("./data/schedules/"+selectedYear+"schedule.json")


// Set the year, attempt to rebuild the page
function setYear(year){
    if(year != selectedYear){
        selectedYear = year;
        document.getElementById('year-dropdown-button').innerHTML = selectedYear;
        getData("./data/schedules/"+selectedYear+"schedule.json");
    }
}
// Set the group, attempt to rebuild the page
function setWeek(week){
    if(week != selectedWeek){
        selectedWeek = week;
        document.getElementById('week-dropdown-button').innerHTML = "Week "+selectedWeek;
        getData("./data/schedules/"+selectedYear+"schedule.json");
    }
}

// Get the data at the given location, then rebuild the page content
async function getData(loc) {
    fetch(loc)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            buildPage(data);
        })
        .catch(function (err) {
            displayNoData();
        })
}


function buildPage(data){
    console.log("building page");
    let content = document.getElementsByClassName("content")[0];










}




// No data to be shown
function displayNoData(){
    let div = document.getElementsByClassName("content");
    div[0].innerHTML = '<p style="font-size:20px;padding:8px;margin:0px">No schedule available</p>';
}