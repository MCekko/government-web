var member = data.results[0].members;
var ArrayTR = ["Name", "Party", "State", "Seniority", "Percentage Of Votes"]

function TableData(rows, cols, array) {

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

    for (var i = 0; i < rows; i++) {
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
TableData(member.length, ArrayTR.length, member);

function PrincipalFiltre() {

    var table = document.getElementById("senate-data");
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }

    var resetTable = true;
    var checkedBoxes = document.querySelectorAll("input[name=party]:checked");
    for (var i = 0; i < checkedBoxes.length; i++) {
        if (checkedBoxes[i].checked) {
            resetTable = false;
        }
    }

    if (resetTable) {
        TableData(member.length, ArrayTR.length, member);
    } else {
        var ArrayFiltre = [];
        for (var i = 0; i < checkedBoxes.length; i++) {
            for (var j = 0; j < member.length; j++) {
                if (checkedBoxes[i].value == member[j].party) {
                    ArrayFiltre.push(member[j])
                }
            }
        }
        TableData(ArrayFiltre.length, ArrayTR.length, ArrayFiltre);
    }
}
var FinalArrayState = [];

function FiltroDesplegable() {

    function RepeatedState() {
        FinalArrayState = ["all"];
        for (var i = 0; i < member.length; i++) {
            if (FinalArrayState.indexOf(member[i].state) === -1) {

                FinalArrayState.push(member[i].state);
            }
        }

    }
RepeatedState();
    var Dropdown = document.getElementById("FiltreState");
    for (var i = 0; i < FinalArrayState.length; i++) {
        var PrincipalOption = document.createElement("option");
        PrincipalOption.setAttribute("value", FinalArrayState[i]);
        PrincipalOption.textContent = FinalArrayState[i];
        Dropdown.appendChild(PrincipalOption);

    }

}
FiltroDesplegable();
