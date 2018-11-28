var statistics = {

    "NUMR": 0,
    "NUMD": 0,
    "NUMI": 0,
    "votes_party_R_pct": 0,
    "votes_party_D_pct": 0,
    "votes_party_I_pct": 0,
    "member_m_Loyal_top_votes": [],
    "member_l_Loyal_bottom_votes": [],
    "member_m_engaged_attendace": [],
    "member_l_engaged_attendace": [],
}

var member = data.results[0].members;

function NumeroRepresentantesParty() {

    var NumeroDeVotosR = member[0].total_votes;
    var NumeroDeVotosD = member[0].total_votes;
    var NumeroDeVotosI = member[0].total_votes;
    var NumR = 0;
    var NumD = 0;
    var NumI = 0;

    for (var i = 0; i < member.length; i++) {
        if (member[i].party == "R") {
            NumeroDeVotosR = member[i].total_votes + NumeroDeVotosR;
            NumR++
        }
    }
    console.log(NumR);
    for (var i = 0; i < member.length; i++) {
        if (member[i].party == "D") {
            NumeroDeVotosD = member[i].total_votes + NumeroDeVotosD;
            NumD++
        }
    }
    console.log(NumD);
    for (var i = 0; i < member.length; i++) {
        if (member[i].party == "I") {
            NumeroDeVotosI = member[i].total_votes + NumeroDeVotosI;
            NumI++
        }
    }
    console.log(NumI);
    statistics.NUMR = NumR;
    statistics.NUMD = NumD;
    statistics.NUMI = NumI;

    var TotalVotes = NumeroDeVotosR + NumeroDeVotosD + NumeroDeVotosI;
    var PercentR = (NumeroDeVotosR / TotalVotes) * 100;
    var PercentD = (NumeroDeVotosD / TotalVotes) * 100;
    var PercentI = (NumeroDeVotosI / TotalVotes) * 100;

    var FinalPercentR = PercentR.toFixed(2) + " % ";
    var FinalPercentD = PercentD.toFixed(2) + " % ";
    var FinalPercentI = PercentI.toFixed(2) + " % ";
    console.log(FinalPercentR);
    console.log(FinalPercentD);
    console.log(FinalPercentI);
    statistics.votes_party_R_pct = FinalPercentR;
    statistics.votes_party_D_pct = FinalPercentD;
    statistics.votes_party_I_pct = FinalPercentI;

}
NumeroRepresentantesParty();

function ArrayMembersMissedVotes() {
    var FinalArrayMMissed = [];
    var FinalArrayLMissed = [];
    var FinalArrayMMissed10 = [];
    var FinalArrayLMissed10 = [];

    for (var i = 0; i < member.length; i++) {
        FinalArrayMMissed.push([member[i].missed_votes, member[i]]);
        FinalArrayLMissed.push([member[i].missed_votes, member[i]]);
    }

    FinalArrayMMissed.sort(function (a, b) {
        return b[0] - a[0]
    });

    FinalArrayLMissed.sort(function (a, b) {
        return a[0] - b[0]
    });

    var TotalMembers = Math.round((member.length / 100) * 10);
    for (var i = 0; i < TotalMembers; i++) {

        FinalArrayMMissed10.push(FinalArrayMMissed[i][1]);
        FinalArrayLMissed10.push(FinalArrayLMissed[i][1]);
    }
    console.log(FinalArrayMMissed10);
    console.log(FinalArrayLMissed10);
    statistics.member_m_engaged_attendace = FinalArrayMMissed10;
    statistics.member_l_engaged_attendace = FinalArrayLMissed10;
}
ArrayMembersMissedVotes();

function ArrayMembersLoyalsVotes() {

    var FinalArrayTLoyals = [];
    var FinalArrayBLoyals = [];
    var FinalArrayTLoyals10 = [];
    var FinalArrayBLoyals10 = [];

    for (var i = 0; i < member.length; i++) {
        FinalArrayTLoyals.push([member[i].votes_with_party_pct, member[i]]);
        FinalArrayBLoyals.push([member[i].votes_with_party_pct, member[i]]);
    }

    FinalArrayTLoyals.sort(function (a, b) {
        return b[0] - a[0]
    });

    FinalArrayBLoyals.sort(function (a, b) {
        return a[0] - b[0]
    });

    var TotalMembers = Math.round((member.length / 100) * 10);
    for (var j = 0; j < TotalMembers; j++) {

        FinalArrayTLoyals10.push(FinalArrayTLoyals[j][1]);
        FinalArrayBLoyals10.push(FinalArrayBLoyals[j][1]);
    }
    console.log(FinalArrayTLoyals10);
    console.log(FinalArrayBLoyals10);
    statistics.member_m_Loyal_top_votes = FinalArrayTLoyals10;
    statistics.member_l_Loyal_bottom_votes = FinalArrayBLoyals10;
}

ArrayMembersLoyalsVotes()



function FirtsTable() {

    var TD1 = document.createElement("td");
    document.getElementById("TR1").appendChild(TD1);
    TD1.textContent = statistics.NUMR;
    var TD2 = document.createElement("td");
    document.getElementById("TR1").appendChild(TD2);
    TD2.textContent = statistics.votes_party_R_pct;

    var TD3 = document.createElement("td");
    document.getElementById("TR2").appendChild(TD3);
    TD3.textContent = statistics.NUMD;
    var TD4 = document.createElement("td");
    document.getElementById("TR2").appendChild(TD4);
    TD4.textContent = statistics.votes_party_D_pct;

    var TD5 = document.createElement("td");
    document.getElementById("TR3").appendChild(TD5);
    TD5.textContent = statistics.NUMI;
    var TD6 = document.createElement("td");
    document.getElementById("TR3").appendChild(TD6);
    TD6.textContent = statistics.votes_party_I_pct;


}

FirtsTable();

function ReadID() {

    var insertar = true;

    if (document.getElementById("Engange")) {

        insertar = LEngangedVotes(statistics.member_l_engaged_attendace.length, 3);
    }
    if (document.getElementById("Engange2")) {
        insertar = MEngangedVotes(statistics.member_m_engaged_attendace.length, 3);

    }
    if (document.getElementById("Loyals")) {
        insertar = LLoyalsVotes(statistics.member_l_Loyal_bottom_votes.length, 3);
    }
    if (document.getElementById("Loyals2")) {
        insertar = MLoyalsVotes(statistics.member_m_Loyal_top_votes.length, 3);
    }
}
ReadID();
console.log(statistics.member_m_Loyal_top_votes);
function LEngangedVotes(rows, cols) {

    function SumaName(i) {
        var FirstName = statistics.member_l_engaged_attendace[i].first_name;
        var MiddleName = statistics.member_l_engaged_attendace[i].middle_name;
        var LastName = statistics.member_l_engaged_attendace[i].last_name;
        if (MiddleName == null) {
            MiddleName = " ";
        }
        var FinalName = FirstName + " " + MiddleName + " " + LastName;
        return FinalName;
    }

    var PrincipalTBODY = document.getElementById("Engange");
    for (var i = 0; i < rows; i++) {
        var PrincipalTR = document.createElement("tr");
        PrincipalTBODY.appendChild(PrincipalTR);

        var Name = document.createElement("td");
        PrincipalTR.appendChild(Name);
        var TagA = document.createElement("a");
        Name.appendChild(TagA);
        TagA.textContent = SumaName(i);
        TagA.setAttribute("href", member[i].url);
        TagA.setAttribute("target", "_blank");

        var MissedVotes = document.createElement("td");
        PrincipalTR.appendChild(MissedVotes);
        MissedVotes.textContent = statistics.member_l_engaged_attendace[i].missed_votes;

        var MissedVotesPCT = document.createElement("td");
        PrincipalTR.appendChild(MissedVotesPCT);
        MissedVotesPCT.textContent = statistics.member_l_engaged_attendace[i].missed_votes_pct + " % ";

    }
}

function MEngangedVotes(rows, cols) {

    function SumaName(i) {
        var FirstName = statistics.member_m_engaged_attendace[i].first_name;
        var MiddleName = statistics.member_m_engaged_attendace[i].middle_name;
        var LastName = statistics.member_m_engaged_attendace[i].last_name;
        if (MiddleName == null) {
            MiddleName = " ";
        }
        var FinalName = FirstName + " " + MiddleName + " " + LastName;
        return FinalName;
    }

    var PrincipalTBODY = document.getElementById("Engange2");
    for (var i = 0; i < rows; i++) {
        var PrincipalTR = document.createElement("tr");
        PrincipalTBODY.appendChild(PrincipalTR);

        var Name = document.createElement("td");
        PrincipalTR.appendChild(Name);
        var TagA = document.createElement("a");
        Name.appendChild(TagA);
        TagA.textContent = SumaName(i);
        TagA.setAttribute("href", member[i].url);
        TagA.setAttribute("target", "_blank");

        var MissedVotes = document.createElement("td");
        PrincipalTR.appendChild(MissedVotes);
        MissedVotes.textContent = statistics.member_m_engaged_attendace[i].missed_votes;

        var MissedVotesPCT = document.createElement("td");
        PrincipalTR.appendChild(MissedVotesPCT);
        MissedVotesPCT.textContent = statistics.member_m_engaged_attendace[i].missed_votes_pct + " % ";

    }
}

function LLoyalsVotes(rows, cols) {

    function SumaName(i) {
        var FirstName = statistics.member_l_Loyal_bottom_votes[i].first_name;
        var MiddleName = statistics.member_l_Loyal_bottom_votes[i].middle_name;
        var LastName = statistics.member_l_Loyal_bottom_votes[i].last_name;
        if (MiddleName == null) {
            MiddleName = " ";
        }
        var FinalName = FirstName + " " + MiddleName + " " + LastName;
        return FinalName;
    }


    var PrincipalTBODY = document.getElementById("Loyals");
    for (var i = 0; i < rows; i++) {
        var PrincipalTR = document.createElement("tr");
        PrincipalTBODY.appendChild(PrincipalTR);

        var Name = document.createElement("td");
        PrincipalTR.appendChild(Name);
        var TagA = document.createElement("a");
        Name.appendChild(TagA);
        TagA.textContent = SumaName(i);
        TagA.setAttribute("href", member[i].url);
        TagA.setAttribute("target", "_blank");

        var MissedVotes = document.createElement("td");
        PrincipalTR.appendChild(MissedVotes);
        MissedVotes.textContent = statistics.member_l_Loyal_bottom_votes[i].total_votes;

        var MissedVotesPCT = document.createElement("td");
        PrincipalTR.appendChild(MissedVotesPCT);
        MissedVotesPCT.textContent = statistics.member_l_Loyal_bottom_votes[i].votes_with_party_pct + " % ";

    }
}

function MLoyalsVotes(rows, cols) {

    function SumaName(i) {
        var FirstName = statistics.member_m_Loyal_top_votes[i].first_name;
        var MiddleName = statistics.member_m_Loyal_top_votes[i].middle_name;
        var LastName = statistics.member_m_Loyal_top_votes[i].last_name;
        if (MiddleName == null) {
            MiddleName = " ";
        }
        var FinalName = FirstName + " " + MiddleName + " " + LastName;
        return FinalName;
    }


    var PrincipalTBODY = document.getElementById("Loyals2");
    for (var i = 0; i < rows; i++) {
        var PrincipalTR = document.createElement("tr");
        PrincipalTBODY.appendChild(PrincipalTR);

        var Name = document.createElement("td");
        PrincipalTR.appendChild(Name);
        var TagA = document.createElement("a");
        Name.appendChild(TagA);
        TagA.textContent = SumaName(i);
        TagA.setAttribute("href", member[i].url);
        TagA.setAttribute("target", "_blank");

        var MissedVotes = document.createElement("td");
        PrincipalTR.appendChild(MissedVotes);
        MissedVotes.textContent = statistics.member_m_Loyal_top_votes[i].total_votes;

        var MissedVotesPCT = document.createElement("td");
        PrincipalTR.appendChild(MissedVotesPCT);
        MissedVotesPCT.textContent = statistics.member_m_Loyal_top_votes[i].votes_with_party_pct + " % ";

    }
}
