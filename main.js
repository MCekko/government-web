var app = new Vue({
    el: '#app',
    data: {
        searchParty: ["R", "D", "I"],
        searchState: ["all"],
        members: [],
        url: "",
        stateValue:"",
        membersOriginal: []
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

                app.members = json.results[0].members;
                app.membersOriginal = json.results[0].members;
                app.RepeatedState();
                
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
            this.searchParty = [];
            if (checkedBoxes.length > 0) {
                for (var j = 0; j < checkedBoxes.length; j++) {
                    this.searchParty.push(checkedBoxes[j].value);
                }
            } else {
                this.searchParty = ["R", "D", "I"];
            }
        },
         filteredParties: function() {
             this.members = this.membersOriginal;
             this.stateValue = document.getElementById("option").value;
             console.log("Llamando al filtro de partidos");
             this.PartyFilter();
  
             this.members = this.membersOriginal.filter(item => {
                var res = this.searchParty.indexOf(item.party);
                if (res > -1) {
                    if (this.stateValue != "all") {
                        if (item.state != this.stateValue){
                           return false;  
                        }
                        else{
                          return true; 
                        }
                    } 
                    else {
                        return true;
                    }
                }
                else {
                    return false;
                }
            });
        
    }
    }
});

