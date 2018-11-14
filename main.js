var member = data.results[0].members;
var ArrayTR = ["Name", "Party", "State", "Seniority", "Percentage Of Votes"]

function TableData(rows, cols, ) {

    function SumaName(i) {
        var FirstName = member[i].first_name;
        var MiddleName = member[i].middle_name;
        var LastName = member[i].last_name;
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
        TagA.setAttribute("href", member[i].url);
        
        var Party = document.createElement("td");
        CreateTR1.appendChild(Party);
        Party.textContent = member[i].party;
        var State = document.createElement("td");
        CreateTR1.appendChild(State);
        State.textContent = member[i].state;
        var Seniority = document.createElement("td");
        CreateTR1.appendChild(Seniority);
        Seniority.textContent = member[i].seniority;
        var PercentageOfVotes = document.createElement("td");
        CreateTR1.appendChild(PercentageOfVotes);
        PercentageOfVotes.textContent = member[i].votes_with_party_pct + " % ";

    }
}
TableData(member.length, ArrayTR.length);
