
const url = "https://api.covid19india.org/data.json";
// making get request to fetch data using api
$.get(url, function(data) {
  var selectedState = "";
// data for filling cards in html
  const confirmedcases = data.statewise[0].confirmed;
  console.log(confirmedcases);
  $(".confirmed").text(confirmedcases);
  const activecases = data.statewise[0].active;
  $(".active").text(activecases);
  const deathcases = data.statewise[0].deaths;
  $(".death").text(deathcases);
  const recoveredcases = data.statewise[0].recovered;
  $(".recovered").text(recoveredcases);
  console.log('recovered' + recoveredcases);
  // pieChart
  var ctxP = $("#pieChart")[0].getContext('2d');
  var myPieChart = new Chart(ctxP, {
    type: 'pie',
    data: {
      labels: ["Deaths", "Active", "Confirmed", "Recovered"],
      datasets: [{
        data: [deathcases, activecases, confirmedcases, recoveredcases],
        backgroundColor: ["#F7464A", "#185adb", "#f9b208", "#1f441e"],
        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#f7fd04", "#A8B3C5", "#616774"]
      }]
    },
    options: {
      responsive: true
    }
  });
  // hiding drop down and button before pressing radio button for state
  $("#inputState").hide();
  $("#button1").hide();
  // if we are choosing to see details statewise
  $("#stateselect").change(function() {

  $("#tbodyid").empty();//making table empty for each request
    $("#inputState").show();//display drop down and button
    $("#button1").show();
//when button is clicked to fetch data of selected state
    $('#button1').click(function() {
//grabing selected state from drop down
      selectedState = $('#inputState :selected').text();
      console.log(selectedState);

      console.log(data.statewise.length);
      for (var i = 1; i < data.statewise.length; i++) {
        //checking for equality of state
        if (selectedState === (data.statewise[i].state)) {
          //     making table empty

          $("#tbodyid").empty();
//binding data to html table tr
          $("tbody").append(`<tr>
  <td><b>${(data.statewise[i].state)}</b></td>
    <td>${(data.statewise[i].active)}</td>
    <td>${(data.statewise[i].confirmed)}</td>
    <td>${(data.statewise[i].recovered)}</td>
    <td>${(data.statewise[i].deaths)}</td>
    </tr>`);
        }
//reseting value of dropdown list to value of SelectState(value attribute in dropdown)
        $("#inputState").val("SelectState");


      }

    });
      });
//if we select to view All States
    $("#allselect").change(function() {
  $("#tbodyid").empty();//making table empty

      $("#inputState").hide();//hiding dropdown and button
       $("#button1").hide();

      for (var i = 1; i < data.statewise.length; i++) {
if(!(data.statewise[i].state==="State Unassigned"))//to avoid null data(showing in api)
{ //appending to table
   $("tbody").append(`<tr>
   <td class="col1"><b>${(data.statewise[i].state)}</b></td>
  <td class="col1">${(data.statewise[i].active)}</td>
  <td class="col1">${(data.statewise[i].confirmed)}</td>
  <td class="col1">${(data.statewise[i].recovered)}</td>
  <td class="col1">${(data.statewise[i].deaths)}</td>
  </tr>`);
}}

});
});
