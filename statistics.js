
var app2 = new Vue({
    el: '#app2',
    data: {
        members: [],
        url: "",
        NumR: 0,
        NumD: 0,
        NumI: 0,
        statistics: {

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

    },

    created: function () {
        this.filtrarhtml()
        this.getData()
    },
    methods: {
        filtrarhtml: function () {
            if (document.getElementById("Senate")) {
                this.url = "https://api.propublica.org/congress/v1/113/senate/members.json";
            } else if (document.getElementById("House")) {
                this.url = "https://api.propublica.org/congress/v1/113/house/members.json";
            } else {
                alert("No se encuentra el Id Senado o Congreso");
            }
        },
        getData: function () {
            fetch(this.url, {
                method: "GET",
                headers: {
                    'X-API-Key': 'F5XJgi3RFXKFERdRG7WA1wwLfWCR9jnZnzhiZ5Ef'
                }
            }).then(function (response) {
                if (response.ok) {

                    return response.json();
                }

            }).then(function (json) {
                data = json;
                app2.statistics = {

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
                app2.members = data.results[0].members;
                app2.NumeroRepresentantesParty()
                app2.ArrayMembersMissedVotes()
                app2.ArrayMembersLoyalsVotes()

            }).catch(function (error) {
                console.log("Request failed:" + error.message);
            });


        },
        NumeroRepresentantesParty: function () {
            var NumeroDeVotosR = this.members[0].total_votes;
            var NumeroDeVotosD = this.members[0].total_votes;
            var NumeroDeVotosI = this.members[0].total_votes;
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].party == "R") {
                    NumeroDeVotosR = this.members[i].total_votes + NumeroDeVotosR;
                    this.NumR++
                }
            }
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].party == "D") {
                    NumeroDeVotosD = this.members[i].total_votes + NumeroDeVotosD;
                    this.NumD++
                }
            }
            for (var i = 0; i < this.members.length; i++) {
                if (this.members[i].party == "I") {
                    NumeroDeVotosI = this.members[i].total_votes + NumeroDeVotosI;
                    this.NumI++
                }
            }

            this.statistics.NUMR = this.NumR;
            this.statistics.NUMD = this.NumD;
            this.statistics.NUMI = this.NumI;

            var TotalVotes = NumeroDeVotosR + NumeroDeVotosD + NumeroDeVotosI;
            var PercentR = (NumeroDeVotosR / TotalVotes) * 100;
            var PercentD = (NumeroDeVotosD / TotalVotes) * 100;
            var PercentI = (NumeroDeVotosI / TotalVotes) * 100;

            var FinalPercentR = PercentR.toFixed(2) + " % ";
            var FinalPercentD = PercentD.toFixed(2) + " % ";
            var FinalPercentI = PercentI.toFixed(2) + " % ";

            this.statistics.votes_party_R_pct = FinalPercentR;
            this.statistics.votes_party_D_pct = FinalPercentD;
            this.statistics.votes_party_I_pct = FinalPercentI;

        },

        ArrayMembersMissedVotes: function () {
            var FinalArrayMMissed10 = [];
            var FinalArrayLMissed10 = [];
            var FinalArrayMMissed = [];
            var FinalArrayLMissed = [];

            for (var i = 0; i < this.members.length; i++) {
                FinalArrayMMissed.push([this.members[i].missed_votes, this.members[i]]);
                FinalArrayLMissed.push([this.members[i].missed_votes, this.members[i]]);
            }

            FinalArrayMMissed.sort(function (a, b) {
                return b[0] - a[0]
            });

            FinalArrayLMissed.sort(function (a, b) {
                return a[0] - b[0]
            });

            var TotalMembers = Math.round((this.members.length / 100) * 10);
            for (var i = 0; i < TotalMembers; i++) {

                FinalArrayMMissed10.push(FinalArrayMMissed[i][1]);
                FinalArrayLMissed10.push(FinalArrayLMissed[i][1]);
            }
            this.statistics.member_m_engaged_attendace = FinalArrayMMissed10;
            this.statistics.member_l_engaged_attendace = FinalArrayLMissed10;
        },

        ArrayMembersLoyalsVotes: function () {
            
            var FinalArrayTLoyals = [];
            var FinalArrayBLoyals = [];
            var FinalArrayTLoyals10 = [];
            var FinalArrayBLoyals10 = [];

            for (var i = 0; i < this.members.length; i++) {
                FinalArrayTLoyals.push([this.members[i].votes_with_party_pct, this.members[i]]);
                FinalArrayBLoyals.push([this.members[i].votes_with_party_pct, this.members[i]]);
            }

            FinalArrayTLoyals.sort(function (a, b) {
                return b[0] - a[0]
            });

            FinalArrayBLoyals.sort(function (a, b) {
                return a[0] - b[0]
            });

            var TotalMembers = Math.round((this.members.length / 100) * 10);
            for (var j = 0; j < TotalMembers; j++) {

                FinalArrayTLoyals10.push(FinalArrayTLoyals[j][1]);
                FinalArrayBLoyals10.push(FinalArrayBLoyals[j][1]);
            }
            
            this.statistics.member_m_Loyal_top_votes = FinalArrayTLoyals10;
            this.statistics.member_l_Loyal_bottom_votes = FinalArrayBLoyals10

        },

    }
});

