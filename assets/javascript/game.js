//WAIT FOR DOCUMENT READY
$(document).ready(function () {

    //OBJECTS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //********************************** HUD *********************************************
    var HUD = {
        drawPlayerHP: function () {
            $("#game-window").append("<p id='playerHPLabel'>HP:</p>")
            $("#game-window").append("<p id='playerHP'></p>")
            player.updateHP()
        },

        drawPlayerAttackPower: function () {
            $("#game-window").append("<p id='playerAttackPowerLabel'>Attack Power:</p>")
            $("#game-window").append("<p id='playerAttackPower'></p>")
            player.updateAttackPower()
        }
    };

    //********************************** PLAYER *********************************************
    var player = {
        HP: 100,
        baseAttackPower: 5,
        attackPower: 5,

        initialDraw: function () {
            $("#game-window").append("<div id='player'>Character</div>")
            $("#player").css({ border: "2px solid white", width: "150px", height: "150px" })
            $("#player").css({ position: "absolute", left: "50px", bottom: "250px" })
            this.updateHP();
        },

        updateHP: function () {
            $("#player").text(`${this.HP}`)
            $("#playerHP").text(`${this.HP}`)
        },

        updateAttackPower: function () {
            $("#playerAttackPower").text(`${this.attackPower}`)
        }
    };

    //********************************** KRAKEN *********************************************
    var kraken = {
        HP: 50,
        isDefending: false,

        defendingActivate: function () {
            $('#kraken').animate({ 'left': '450px' });
            this.isDefending = true;
        },

        defendingDeactivate: function () {
            $('#kraken').animate({ 'left': '600px' });
            this.isDefending = false;
        },

        initialDraw: function () {
            $("#game-window").append("<div id='kraken'>Kraken</div>")
            $("#kraken").css({ border: "2px solid white", width: "150px", height: "150px" })
            $("#kraken").css({ position: "absolute", left: "600px", bottom: "250px" })
            this.updateHP();
        },

        updateHP: function () {
            $("#kraken").text(`${this.HP}`)
        },

        counterAttack: function () {
            player.HP -= 10;
            player.updateHP()
        },

        takeDamage: function () {
            console.log(player.attackPower)
            this.HP -= player.attackPower;
            if (this.HP <= 0) {
                $("#kraken").fadeOut()
            } else {
                this.updateHP();
                this.counterAttack();
            }
            player.attackPower += player.baseAttackPower
            player.updateAttackPower();
        },
    }


    //RUN PROGRAM////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    HUD.drawPlayerAttackPower();
    HUD.drawPlayerHP();
    player.initialDraw();
    kraken.initialDraw();

    function processAttack(enemyObj) {
        if (enemyObj.isDefending) {
            enemyObj.takeDamage();
            enemyObj.defendingDeactivate();
        } else {
            enemyObj.defendingActivate();
        }
    };

    $("#kraken").click(function () {
        processAttack(kraken);
    });


    //CLOSING SYNTAX////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});