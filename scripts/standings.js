var selectedYear = 2024;
var selectedGroup = "League";

setPageTitle(); // TODO 
getData("../data/standings/"+selectedYear+"standings.json")


// Set the year, attempt to rebuild the page
function setYear(year){
    if(year != selectedYear){
        selectedYear = year;
        document.getElementById('year-dropdown-button').innerHTML = selectedYear;
        getData("../data/standings/"+selectedYear+"standings.json");
    }
}
// Set the group, attempt to rebuild the page
function setGroup(group){
    selectedGroup = group;
    document.getElementById('group-dropdown-button').innerHTML = selectedGroup;
    getData("../data/standings/"+selectedYear+"standings.json");
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

// Build page content 
function buildPage(data){
    let div = document.getElementsByClassName("content")[0];
    div.innerHTML = "";
    // display one table, the entire league
    if(selectedGroup == "League"){
        data = data[0];
        appendSectionHeader(div,data.header);
        appendTable(div);
        for(team = 0; team < data.standings.length; team++){
            let b,d = false;
            appendRow(div,data.standings[team],b,d);
        }
    // group by conference
    } else if(selectedGroup = "Conference") { 
        for(conf = 1; conf < data.length; conf++){
            appendSectionHeader(div,data[conf].header);
            appendTable(div);
            for(team = 0; team < data[conf].standings.length; team++){
                let b,d = false;
                appendRow(div,data[conf].standings[team],b,d);
            }
        }
    }
}

/*
Helper functions
*/
function appendSectionHeader(div,headerTitle){
    let sectionHeader = document.createElement("div");
    sectionHeader.className = "section-header";
    sectionHeader.innerHTML = `
        <h2>${headerTitle}</h2>
        <hr>
    `;
    div.appendChild(sectionHeader);
}
function appendTable(div){
    let table = document.createElement("table");
    table.innerHTML = `
        <tr class="table-header">
            <th width="20%">TEAM</th>
            <th width="5%">W</th>
            <th width="5%">L</th>
            <th width="6%">%</th>
            <th width="8%">H</th>
            <th width="8%">A</th>
            <th width="8%">Conf</th>
            <th width="8%">NConf</th>
            <th width="8%">Strk</th>
            <th width="6%">PS</th>
            <th width="6%">PA</th>
            <th>NP</th>
        </tr>
    `;
    div.appendChild(table);
}
function appendRow(div,data,isBorderedRow,isDashedRow){
    let row = document.createElement("tr");
    row.className = "table-row";
    row.innerHTML = `
        <td>${data.team}</td>
        <td>${data.wins}</td>
        <td>${data.losses}</td>
        <td>${data.pct}</td>
        <td>${data.home}</td>
        <td>${data.away}</td>
        <td>${data.conf}</td>
        <td>${data.nonconf}</td>
        <td>${data.strk}</td>
        <td>${data.ps}</td>
        <td>${data.pa}</td>
        <td>${data.np}</td>
    `;
    let table = div.lastChild;
    table.appendChild(row);
}

// No data to be shown
function displayNoData(){
    let div = document.getElementsByClassName("content")
    div[0].innerHTML = '<p style="font-size:20px;padding:8px;margin:0px">No standings available</p>';
}


// TODO
function setPageTitle(){
    document.getElementsByName("title").innerHTML = `${selectedYear} ${selectedGroup} Standings | SL.com`;
}