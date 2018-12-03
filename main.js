//var data;
//var member;
//var ArrayTR;
//var url = ""

var app = new Vue({
    el: '#app',
    data: {
        searchParty: ["R", "D", "I"],
        searchState: ["all"],
        members: [],
        url: "",
        filter: [],
        stateValue:"",
        membersOriginal: []
    },
    created: function () {
        this.filtrarhtml()
        this.getData()
    },
    computed: {
//        filteredParties() {
//            this.members =  this.members.filter(item => {
//                var res = this.searchParty.indexOf(item.party);
//                if (res > -1) {
//                    if (this.searchState != "all") {
//                        if (item.state != this.searchState)
//                            return false;
//                        else
//                            return true;
//                    } else
//                        return true;
//                }
//                return false;
//            });
//        },
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
                console.log("this in fecth", this);
                console.log("name of vue variable if fetch", app)
                console.log(json);
                data = json;
                app.members = data.results[0].members;
                app.membersOriginal = data.results[0].members;
                app.RepeatedState();
                app.PartyFilter();
            }).catch(function (error) {
                console.log("Request failed:" + error.message);
            });


        },
        RepeatedState: function () {
                          

            for (var i = 0; i < this.members.length; i++) {
                if (this.searchState.indexOf(this.members[i].state) === -1) {

                    this.searchState.push(this.members[i].state);
                }
                
            }

        },
    

        PartyFilter: function () {
            var checkedBoxes = document.querySelectorAll("input[name=party]:checked");
            if (checkedBoxes.length > 0) {
                for (var j = 0; j < checkedBoxes.length; j++) {
                    this.filter.push(checkedBoxes[j].value);
                }
            } else {
                this.filter = ["R", "D", "I"];
            }
            app.searchParty = this.filter;
        },
         filteredParties: function() {
             this.members = this.membersOriginal;
             this.stateValue = document.getElementById("option").value;
  
            this.members = this.members.filter(item => {
                var res = this.searchParty.indexOf(item.party);
                if (res > -1) {
                    if (this.searchState != "all") {
                        if (item.state != this.stateValue){
                           return false;  
                        }else{
                          return true; 
                        }
                            
                    } else{
                        return true;
                }
                return false;
            }});
        
    }
    }
});

//
//        if (document.getElementById("Senate")) {
//            url = "https://api.propublica.org/congress/v1/113/senate/members.json";
//        } else if (document.getElementById("House")) {
//            url = "https://api.propublica.org/congress/v1/113/house/members.json";
//        } else {
//            alert("No se encuentra el Id Senado o Congreso");
//        }
//
//        fetch(url, {
//            method: "GET",
//            headers: {
//                'X-API-Key': 'F5XJgi3RFXKFERdRG7WA1wwLfWCR9jnZnzhiZ5Ef'
//            }
//        }).then(function (response) {
//            if (response.ok) {
//
//                return response.json();
//            }
//
//        }).then(function (json) {
//            console.log(json);
//            data = json;
//            member = data.results[0].members;
//            ArrayTR = ["Name", "Party", "State", "Seniority", "Percentage Of Votes"]
//            app.members = data.results[0].members;
//            RellenarDesplegableStates();
//            PopulateTableHeader();
//
//        }).catch(function (error) {
//            console.log("Request failed:" + error.message);
//        });
//
//
//
//
//        function RepeatedState() {
//            FinalArrayState = ["all"];
//            for (var i = 0; i < member.length; i++) {
//                if (FinalArrayState.indexOf(member[i].state) === -1) {
//
//                    FinalArrayState.push(member[i].state);
//                }
//            }
//
//        }
//
//        function RellenarDesplegableStates() {
//            RepeatedState();
//            var Dropdown = document.getElementById("FiltreState");
//            for (var i = 0; i < FinalArrayState.length; i++) {
//                var PrincipalOption = document.createElement("option");
//                PrincipalOption.setAttribute("value", FinalArrayState[i]);
//                PrincipalOption.textContent = FinalArrayState[i];
//                Dropdown.appendChild(PrincipalOption);
//
//            }
//        }
//
//
//        function StateFilter() {
//            var sel = document.getElementById("FiltreState");
//            app.searchState = sel.value;
//        }
//
//
//        function PartyFilter() {
//            var filter = [];
//            var checkedBoxes = document.querySelectorAll("input[name=party]:checked");
//            if (checkedBoxes.length > 0) {
//                for (var j = 0; j < checkedBoxes.length; j++) {
//                    filter.push(checkedBoxes[j].value);
//                }
//            } else {
//                filter = ["R", "D", "I"];
//            }
//            app.searchParty = filter;
//        }
//
//        function PopulateTableHeader() {
//            var PrincipalTable = document.getElementById("senate-data");
//            var HeadTable = document.createElement("thead");
//            PrincipalTable.appendChild(HeadTable);
//            var TRThead = document.createElement("tr");
//            HeadTable.appendChild(TRThead);
//
//            for (var i = 0; i < ArrayTR.length; i++) {
//                var CreateTH1 = document.createElement("th");
//                TRThead.appendChild(CreateTH1);
//                CreateTH1.textContent = ArrayTR[i];
//
//            }
//        }
