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
        },

        drawCommandBox: function () {
            $("#game-window").append("<div id='commands'></div>")
            $("#commands").css({ border: "3px solid white", width: "350px", height: "150px" })
            $("#commands").css({ position: "absolute", left: "50px", bottom: "50px" })
            $("#commands").css({ color: "white", "background-image": "linear-gradient(#1d3c6d, #2c61b7)" })

            $("#commands").append("<p class='pl-3 pt-2 p-1'>Attack</p>")
            $("#commands").append("<p class='pl-3 p-1' style='opacity: 0.5'>Item</p>")
            $("#commands").append("<p class='pl-3 p-1' style='opacity: 0.5'>Cancel</p>")
        }
    };

    //********************************** PLAYER *********************************************
    var player = {
        maxHP: 100,
        HP: 100,
        name: "None",
        attackCounter: 0,
        baseAttackPower: 5,
        attackPower: 5,
        avatar: 'assets/images/WarriorStand.png',
        enemiesDefeated: 0,

        initialDraw: function () {
            $("#game-window").append("<div id='player'>Character</div>")
            $("#player").css({ width: "150px", height: "150px" })
            // $("#player").css({ border: "2px solid white", width: "150px", height: "150px" })
            $("#player").css({ position: "absolute", left: "50px", bottom: "235px" })
            $("#player").css("background-image", `url(${this.avatar})`);
            $("#player").css({ display: "flex", "justify-content": "left", "padding-top": "120px" })
            $("#player").addClass('text-light font-weight-bold')
            this.updateHP();
        },

        updateHP: function () {
            let HPpercentage = this.HP / this.maxHP * 100 + "%"
            $("#player").html(`<span style="width: ${HPpercentage}" class="bg-danger text-center">${this.HP}</span>`)
        },

        updateAttackPower: function () {
            $("#playerAttackPower").html(`<span>${this.attackPower}</span>`)
        },

        updateAttackCounter: function () {
            $("#attackCounter").html(`<span>${this.attackCounter}</span>`)
        }
    };

    //********************************** DINO *********************************************
    var dino = {
        maxHP: 200,
        HP: 200,
        counterAttackPower: 15,
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
            $("#dino").css({ width: "150px", height: "150px" })
            // $("#dino").css({ border: "2px solid white", width: "150px", height: "150px" })
            $("#dino").css({ position: "absolute", left: "600px", bottom: "420px" })
            $("#dino").css("background-image", "url('assets/images/dino.png')");
            $("#dino").css({ display: "flex", "justify-content": "left", "padding-top": "120px" })
            $("#dino").addClass('text-light font-weight-bold')
            this.updateHP();
        },

        updateHP: function () {
            let HPpercentage = this.HP / this.maxHP * 100 + "%"
            $("#dino").html(`<span style="width: ${HPpercentage}" class="bg-danger text-center">${this.HP}</span>`)
        },

        counterAttack: function () {
            player.HP -= this.counterAttackPower;
            player.updateHP()
        },

        takeDamage: function () {
            console.log(player.attackPower)
            this.HP -= player.attackPower;
            if (this.HP <= 0) {
                $("#dino").fadeOut();
                player.enemiesDefeated -= 1;
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
        maxHP: 100,
        HP: 100,
        counterAttackPower: 10,
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
            $("#kraken").css({ width: "150px", height: "150px" })
            // $("#kraken").css({ border: "2px solid white", width: "150px", height: "150px" })
            $("#kraken").css({ position: "absolute", left: "600px", bottom: "235px" })
            $("#kraken").css("background-image", "url('assets/images/kraken.png')");
            $("#kraken").css({ display: "flex", "justify-content": "left", "padding-top": "120px" })
            $("#kraken").addClass('text-light font-weight-bold')
            this.updateHP();
        },

        updateHP: function () {
            let HPpercentage = this.HP / this.maxHP * 100 + "%"
            $("#kraken").html(`<span style="width: ${HPpercentage}" class="bg-danger text-center">${this.HP}</span>`)
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
                player.enemiesDefeated -= 1;
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
        maxHP: 50,
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
            $("#croc").css({ width: "150px", height: "150px" })
            // $("#croc").css({ border: "2px solid white", width: "150px", height: "150px" })
            $("#croc").css({ position: "absolute", left: "600px", bottom: "50px" })
            $("#croc").css("background-image", "url('assets/images/croc.png')");
            $("#croc").css({ display: "flex", "justify-content": "left", "padding-top": "120px" })
            $("#croc").addClass('text-light font-weight-bold')
            this.updateHP();
        },

        updateHP: function () {
            let HPpercentage = this.HP / this.maxHP * 100 + "%"
            $("#croc").html(`<span style="width: ${HPpercentage}" class="bg-danger text-center">${this.HP}</span>`)
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
                player.enemiesDefeated -= 1;
            } else {
                this.updateHP();
                this.counterAttack();
            }
            player.attackPower += player.baseAttackPower
            player.updateAttackPower();
        },
    };

    //********************************** GAME SESSION *********************************************

    let gameSession = {
        isOver: false,

        checkIfOver: function () {
            if (player.enemiesDefeated >= 3) {
                gameSession.isOver = true
                $("#game-window").empty()
            } else if (player.HP <= 0) {
                gameSession.isOver = true
                $("#game-window").empty()
            }
        }

    }

    //********************************** START SCREEN *********************************************

    let startScreen = {

        //Display available options,
        drawWarrior: function () {
            $("#game-window").append("<div id='warrior'>Warrior</div>")
            $("#warrior").css({ width: "150px", height: "150px" })
            $("#warrior").css({ position: "absolute", left: "230px", bottom: "235px" })
            $("#warrior").css("background-image", `url('assets/images/WarriorStand.png')`);
            $("#warrior").css({ border: "2px solid white", display: "flex", "justify-content": "left", "padding-top": "120px" })
            $("#warrior").addClass('text-light font-weight-bold')
        },
        drawWizard: function () {
            $("#game-window").append("<div id='wizard'>Wizard</div>")
            $("#wizard").css({ width: "150px", height: "150px" })
            $("#wizard").css({ position: "absolute", left: "430px", bottom: "235px" })
            $("#wizard").css("background-image", `url('assets/images/WizardStand.png')`);
            $("#wizard").css({ border: "2px solid white", display: "flex", "justify-content": "left", "padding-top": "120px" })
            $("#wizard").addClass('text-light font-weight-bold')
        },

        //Set specs for Warrior
        chooseWarrior: function () {
            player.maxHP = 120,
            player.HP = 120,
            player.baseAttackPower = 5,
            player.attackPower = 5,
            player.avatar = 'assets/images/WarriorStand.png'
        },

        //Set specs for Wizard
        chooseWizard: function () {
            player.maxHP = 90,
            player.HP = 90,
            player.baseAttackPower = 7,
            player.attackPower = 7,
            player.avatar = 'assets/images/WizardStand.png'
        },

        //Show to user
        draw: function () {
            this.drawWarrior();
            this.drawWizard();
        }

    };

    //********************************** BATTLE SCREEN *********************************************

    let battleScreen = {
        draw: function () {
            HUD.drawPlayerAttackPower();
            HUD.drawPlayerHP();
            HUD.drawAttackCounter();
            player.initialDraw();
            kraken.initialDraw();
            dino.initialDraw();
            croc.initialDraw();
        }
    };

    //FUNCTIONS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function processAttack(enemyObj) {
        if (enemyObj.isDefending) {
            enemyObj.takeDamage();
            enemyObj.defendingDeactivate();
            player.attackCounter += 1;
            player.updateAttackCounter();
            $("#game-window").children('#commands').remove();
        } else {
            enemyObj.defendingActivate();
            HUD.drawCommandBox();
        }
        gameSession.checkIfOver()
    };

    //EVENT LISTENERS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(document).on("click", "#warrior", function(){
        startScreen.chooseWarrior();
        $("#game-window").empty();
        battleScreen.draw();
    });

    $(document).on("click", "#wizard", function(){
        startScreen.chooseWizard();
        $("#game-window").empty();
        battleScreen.draw();
    });

    $(document).on("click", "#kraken", function(){
        processAttack(kraken);
    });

    $(document).on("click", "#dino", function(){
        processAttack(dino);
    });

    $(document).on("click", "#croc", function(){
        processAttack(croc);
    });

    //RUN PROGRAM////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    startScreen.draw();
    //battleScreen.draw();

    //CLOSING SYNTAX////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});