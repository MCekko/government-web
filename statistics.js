var statistics = {

    "NUMR": 0,
    "NUMD": 0,
    "NUMI": 0,
    "votes_party_R_pct": 0,
    "votes_party_D_pct": 0,
    "member_m_Loyal_top_votes": [],
    "member_l_Loyal_bottom_votes": [],
    "member_m_engaged_attendace": [],
    "member_m_engaged_attendace": [],
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

}
NumeroRepresentantesParty();

function ArrayMembersMissedVotes() {
    var FinalArrayMMissed = [];
    var FinalArrayLMissed = [];
    var FinalArrayMMissed10 = [];
    var FinalArrayLMissed10 = [];
    for (var i = 0; i < member.length; i++) {
        FinalArrayMMissed.push(member[i].missed_votes);
        FinalArrayLMissed.push(member[i].missed_votes);
    }
    FinalArrayMMissed.sort(function (a, b) {
        return b - a
    });

    FinalArrayLMissed.sort(function (a, b) {
        return a - b
    });

    var TotalMembers = Math.floor((member.length / 100) * 10);
    for (var i = 0; i < TotalMembers; i++) {

        FinalArrayMMissed10.push(FinalArrayMMissed[i]);
        FinalArrayLMissed10.push(FinalArrayLMissed[i]);
    }
    console.log(FinalArrayMMissed10);
    console.log(FinalArrayLMissed10);
    var MostEngaged = [];
    for (var i = 0; i < FinalArrayMMissed10.length; i++) {
        for (var j = 0; j < member.length; j++) {
            if (FinalArrayMMissed10[i] == member[j].missed_votes) {
                MostEngaged.push(member[j]);
            }
            
        }
        console.log(MostEngaged[i]);
    }
    var LeastEngaged = [];
    for (var i = 0; i < FinalArrayLMissed.length; i++) {
        for (var j = 0; j < member.length; j++) {
            if (FinalArrayLMissed10[i] == member[j].missed_votes)  {
                LeastEngaged.push(member[j]);
            }
            
        }
        console.log(LeastEngaged[i]);
    }
    
}
ArrayMembersMissedVotes();
