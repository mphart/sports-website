// page variables
var selectedYear = 2024;
var selectedWeek = 1;
var jsonDataLocation = `../assets/data/schedules/${selectedYear}schedule.json`;

// html elements
const content = document.getElementsByClassName("content")[0];


// setPageTitle(); // TODO 
getData(jsonDataLocation)


// Set the year, attempt to rebuild the page
function setYear(year){
    if(year != selectedYear){
        selectedYear = year;
        jsonDataLocation = `../assets/data/schedules/${selectedYear}schedule.json`;
        document.getElementById('year-dropdown-button').innerHTML = selectedYear;
        getData(jsonDataLocation);
    }
}
// Set the group, attempt to rebuild the page
function setWeek(week){
    if(week != selectedWeek){
        selectedWeek = week;
        document.getElementById('week-dropdown-button').innerHTML = "Week "+selectedWeek;
        getData(jsonDataLocation);
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
        .catch(function () {
            displayNoData();
        })
}

function buildPage(data){
    content.innerHTML="";
    let dayInfo = data.weeks[selectedWeek-1].days;
    for(j = 0; j < dayInfo.length; j++){
        addDay(dayInfo[j]);
    }
}

function addDay(dayInfo){
    // add the section header
    let div = document.createElement("div");
    div.className = "section-header";
    div.innerHTML = `<h2>${dayInfo.date}</h2><hr>`;
    content.appendChild(div);
    // add the table
    let table = document.createElement("table");
    table.innerHTML = `
        <tr class="table-header">
            <th width="15%" style="text-align:center">TIME</th>
            <th width="5%" style="text-align:center">P</th>
            <th width="20%" style="text-align:right">HOME</th>
            <th width="7%" style="text-align:center"></th>
            <th width="5%" style="text-align:center"></th>
            <th width="7%" style="text-align:center"></th>
            <th width="20%" style="text-align:left">AWAY</th>
            <th width="5%" style="text-align:center">P</th>
            <th style="text-align:center">WATCH</th>
        </tr>
    `;
    // add the table rows
    for(i = 0; i < dayInfo.data.length; i++){
        let tableRow = document.createElement("tr");
        let matchInfo = dayInfo.data[i];
        tableRow.className = "table-row";
        tableRow.innerHTML = `
                    <td style="text-align:center">${matchInfo.time}</td>
                    <td style="text-align:center">${matchInfo.ptsh}</td>
                    <td style="text-align:right">(${matchInfo.hrec}) ${matchInfo.home}</td>
                    <td style="text-align:center"></td>
                    <td style="text-align:center">VS</td>
                    <td style="text-align:center"></td>
                    <td style="text-align:left">${matchInfo.away} (${matchInfo.arec})</td>
                    <td style="text-align:center">${matchInfo.ptsa}</td>
                    <td style="text-align:center"><a href="./watch.html">Link</a></td>`;
        table.appendChild(tableRow);
    }
    content.appendChild(table);
}

// No data to be shown
function displayNoData(){
    let div = document.getElementsByClassName("content");
    div[0].innerHTML = '<p style="font-size:20px;padding:8px;margin:0px">No schedule available</p>';
}