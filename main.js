var member = data.results[0].members;
var ArrayTR = ["Name", "Party", "State", "Seniority", "Percentage Of Votes"]
var FinalArrayState = [];

function RepeatedState() {
    FinalArrayState = ["all"];
    for (var i = 0; i < member.length; i++) {
        if (FinalArrayState.indexOf(member[i].state) === -1) {

            FinalArrayState.push(member[i].state);
        }
    }

}

function RellenarDesplegableStates() {
    RepeatedState();
    var Dropdown = document.getElementById("FiltreState");
    for (var i = 0; i < FinalArrayState.length; i++) {
        var PrincipalOption = document.createElement("option");
        PrincipalOption.setAttribute("value", FinalArrayState[i]);
        PrincipalOption.textContent = FinalArrayState[i];
        Dropdown.appendChild(PrincipalOption);

    }
}

function PopulateTableData(rows, cols, array) {
    function SumaName(i) {
        var FirstName = array[i].first_name;
        var MiddleName = array[i].middle_name;
        var LastName = array[i].last_name;
        if (MiddleName == null) {
            MiddleName = " ";
        }
        var FinalName = FirstName + " " + MiddleName + " " + LastName;
        return FinalName;
    }
    
    var PrincipalTable = document.getElementById("senate-data");
    var HeadTable = document.createElement("thead");
    PrincipalTable.appendChild(HeadTable);
    var TRThead = document.createElement("tr");
    HeadTable.appendChild(TRThead);

    for (var i = 0; i < cols; i++) {
        var CreateTH1 = document.createElement("th");
        TRThead.appendChild(CreateTH1);
        CreateTH1.textContent = ArrayTR[i];

    }
    var BodyTable = document.createElement("tbody");
    PrincipalTable.appendChild(BodyTable);

    var sel = document.getElementById("FiltreState");   
    var checkedBoxes = document.querySelectorAll("input[name=party]:checked");
    
    var PartyFilter = [];    
    if (checkedBoxes.length > 0) {
        for (var j=0; j<checkedBoxes.length; j++){
            PartyFilter.push(checkedBoxes[j].value);
        }
    }
    else {
        PartyFilter = ["R","D","I"];
    }
    
    
    for (var i = 0; i < rows; i++) {
        var insertarRegistro = true;

        if (!PartyFilter.includes(array[i].party))
            insertarRegistro = false;

        if ((sel.value != "all") && (sel.value != array[i].state)) {
            insertarRegistro = false;
        }
        
        if (insertarRegistro) {
            var CreateTR1 = document.createElement("tr");
            BodyTable.appendChild(CreateTR1);

            var Name = document.createElement("td");
            CreateTR1.appendChild(Name);
            var TagA = document.createElement("a");
            Name.appendChild(TagA);
            TagA.textContent = SumaName(i);
            TagA.setAttribute("href", array[i].url);
            TagA.setAttribute("target", "_blank");

            var Party = document.createElement("td");
            CreateTR1.appendChild(Party);
            Party.textContent = array[i].party;
            var State = document.createElement("td");
            CreateTR1.appendChild(State);
            State.textContent = array[i].state;
            var Seniority = document.createElement("td");
            CreateTR1.appendChild(Seniority);
            Seniority.textContent = array[i].seniority;
            var PercentageOfVotes = document.createElement("td");
            CreateTR1.appendChild(PercentageOfVotes);
            PercentageOfVotes.textContent = array[i].votes_with_party_pct + " % ";
        }
    }
}

function ShowTableData() {
    var table = document.getElementById("senate-data");
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
    PopulateTableData(member.length, ArrayTR.length, member);
}


RellenarDesplegableStates();
ShowTableData();