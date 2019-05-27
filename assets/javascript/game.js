//WAIT FOR DOCUMENT READY
$(document).ready(function () {

    var player = {
        HP: 100,

        initialDraw: function() {
            $("#game-window").append("<div id='player'>Character</div>")
            $("#player").css({ border: "2px solid white", width: "150px", height: "150px" })
            $("#player").css({ position: "absolute", left: "50px", bottom: "200px" })
            this.updateHP();
        },

        updateHP: function () {
            $("#player").text(`${this.HP}`)
        }
    }

    var kraken = {
        HP: 50,
        isDefending: false,

        defendingActivate: function() {
            $('#kraken').animate({'left' : '450px'}); 
            this.isDefending = true;
        },

        defendingDeactivate: function() {
            $('#kraken').animate({'left' : '600px'}); 
            this.isDefending = false;
        },

        initialDraw: function() {
            $("#game-window").append("<div id='kraken'>Kraken</div>")
            $("#kraken").css({ border: "2px solid white", width: "150px", height: "150px" })
            $("#kraken").css({ position: "absolute", left: "600px", bottom: "200px" })
            this.updateHP();
        },

        updateHP: function () {
            $("#kraken").text(`${this.HP}`)
        },

        counterAttack: function () {
            player.HP -= 10;
            player.updateHP()
        },

        takeDamage: function() {
            this.HP -= 20;
            this.updateHP();
            this.counterAttack();
        },
    }
    

    //RUN
    player.initialDraw();
    kraken.initialDraw();
    
    $("#kraken").click(function () {
        if(kraken.isDefending) {
            kraken.takeDamage();
            kraken.defendingDeactivate();
        } else {
            kraken.defendingActivate();
        }
    });


    //CLOSING SYNTAX
});