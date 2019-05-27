//WAIT FOR DOCUMENT READY
$(document).ready(function () {

    //GLOBAL VARIABLES////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //OBJECTS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //********************************** HUD *********************************************
    var HUD = {
        drawPlayerHP: function () {
            $("#game-window").append("<span id='playerHPLabel'>HP:</span>")
            $("#game-window").append("<span id='playerHP'></span><br/>")
            player.updateHP()
        },

        drawPlayerAttackPower: function () {
            $("#game-window").append("<span id='playerAttackPowerLabel'>Attack Power:</span>")
            $("#game-window").append("<span id='playerAttackPower'></span><br/>")
            player.updateAttackPower()
        },

        drawAttackCounter: function () {
            $("#game-window").append("<span id='attackCounterLabel'>Number of Attacks:</span>")
            $("#game-window").append("<span id='attackCounter'></span><br/>")
            player.updateAttackCounter()
        }
    };

    //********************************** PLAYER *********************************************
    var player = {
        HP: 100,
        attackCounter: 0,
        baseAttackPower: 5,
        attackPower: 5,

        initialDraw: function () {
            $("#game-window").append("<div id='player'>Character</div>")
            $("#player").css({ border: "2px solid white", width: "150px", height: "150px" })
            $("#player").css({ position: "absolute", left: "50px", bottom: "235px" })
            this.updateHP();
        },

        updateHP: function () {
            $("#player").text(`${this.HP}`)
            $("#playerHP").text(`${this.HP}`)
        },

        updateAttackPower: function () {
            $("#playerAttackPower").text(`${this.attackPower}`)
        },

        updateAttackCounter: function () {
            $("#attackCounter").text(`${this.attackCounter}`)
        }
    };

    //********************************** DINO *********************************************
    var dino = {
        HP: 200,
        counterAttackPower: 10,
        isDefending: false,

        defendingActivate: function () {
            $('#dino').animate({ 'left': '450px' });
            this.isDefending = true;
        },

        defendingDeactivate: function () {
            $('#dino').animate({ 'left': '600px' });
            this.isDefending = false;
        },

        initialDraw: function () {
            $("#game-window").append("<div id='dino'>dino</div>")
            $("#dino").css({ border: "2px solid white", width: "150px", height: "150px" })
            $("#dino").css({ position: "absolute", left: "600px", bottom: "420px" })
            this.updateHP();
        },

        updateHP: function () {
            $("#dino").text(`${this.HP}`)
        },

        counterAttack: function () {
            player.HP -= this.counterAttackPower;
            player.updateHP()
        },

        takeDamage: function () {
            console.log(player.attackPower)
            this.HP -= player.attackPower;
            if (this.HP <= 0) {
                $("#dino").fadeOut()
            } else {
                this.updateHP();
                this.counterAttack();
            }
            player.attackPower += player.baseAttackPower
            player.updateAttackPower();
        },
    };

    //********************************** KRAKEN *********************************************
    var kraken = {
        HP: 100,
        counterAttackPower: 7,
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
            $("#kraken").css({ position: "absolute", left: "600px", bottom: "235px" })
            this.updateHP();
        },

        updateHP: function () {
            $("#kraken").text(`${this.HP}`)
        },

        counterAttack: function () {
            player.HP -= this.counterAttackPower;
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
    };

    //********************************** CROC *********************************************
    var croc = {
        HP: 50,
        counterAttackPower: 5,
        isDefending: false,

        defendingActivate: function () {
            $('#croc').animate({ 'left': '450px' });
            this.isDefending = true;
        },

        defendingDeactivate: function () {
            $('#croc').animate({ 'left': '600px' });
            this.isDefending = false;
        },

        initialDraw: function () {
            $("#game-window").append("<div id='croc'>Croc</div>")
            $("#croc").css({ border: "2px solid white", width: "150px", height: "150px" })
            $("#croc").css({ position: "absolute", left: "600px", bottom: "50px" })
            this.updateHP();
        },

        updateHP: function () {
            $("#croc").text(`${this.HP}`)
        },

        counterAttack: function () {
            player.HP -= this.counterAttackPower;
            player.updateHP()
        },

        takeDamage: function () {
            console.log(player.attackPower)
            this.HP -= player.attackPower;
            if (this.HP <= 0) {
                $("#croc").fadeOut()
            } else {
                this.updateHP();
                this.counterAttack();
            }
            player.attackPower += player.baseAttackPower
            player.updateAttackPower();
        },
    };

    //RUN PROGRAM////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    HUD.drawPlayerAttackPower();
    HUD.drawPlayerHP();
    HUD.drawAttackCounter();
    player.initialDraw();
    kraken.initialDraw();
    dino.initialDraw();
    croc.initialDraw();

    function processAttack(enemyObj) {
        if (enemyObj.isDefending) {
            enemyObj.takeDamage();
            enemyObj.defendingDeactivate();
            player.attackCounter += 1;
            player.updateAttackCounter();
            console.log(player.attackCounter)
        } else {
            enemyObj.defendingActivate();
        }
    };

    $("#kraken").click(function () {
        processAttack(kraken);
    });

    $("#dino").click(function () {
        processAttack(dino);
    });

    $("#croc").click(function () {
        processAttack(croc);
    });

    //CLOSING SYNTAX////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});