//WAIT FOR DOCUMENT READY
$(document).ready(function () {

    //GLOBAL VARIABLES////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //OBJECTS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //********************************** HUD *********************************************
    var HUD = {
        showingCommandBox: false,

        drawCommandBox: function () {
            $("#game-window").append("<div id='commands'></div>")
            $("#commands").css({ border: "3px solid white", width: "350px", height: "150px" })
            $("#commands").css({ position: "absolute", left: "50px", bottom: "50px" })
            $("#commands").css({ color: "white", "background-image": "linear-gradient(#1d3c6d, #2c61b7)" })

            $("#commands").append("<button id='attackButton' class='btn m-2'>Attack</button>")
            $("#commands").append("<button class='btn m-2' style='opacity: 0.5'>Item</button>")
            $("#commands").append("<button id='cancelButton' class='btn m-2'>Cancel</button>")
        },

        drawAlertBox: function (text) {
            $("#game-window").append("<div id='alertBox'></div>")
            $("#alertBox").css({ border: "3px solid white", width: "550px", height: "100px" })
            $("#alertBox").css({ position: "absolute", left: "120px", bottom: "470px" })
            $("#alertBox").css({ color: "white", "background-image": "linear-gradient(#1d3c6d, #2c61b7)" })
            $("#alertBox").text(`${text}`)
        },

        drawRestartBox: function () {
            $("#game-window").append("<div id='restartBox' class='p-3'></div>")
            $("#restartBox").css({ border: "3px solid white", width: "550px", height: "140px" })
            $("#restartBox").css({ position: "absolute", left: "120px", bottom: "270px" })
            $("#restartBox").css({ color: "white", "background-image": "linear-gradient(#1d3c6d, #2c61b7)" })
            $("#restartBox").append("<p>Restart?</p>")
            $("#restartBox").append("<a style='color: white' id='confirmRetry'>Yes</p>")
            $("#restartBox").append("<a style='color: white' id='confirmExit'>No</a>")
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
        },
    
    };

    //********************************** ACTIVE ENEMY *********************************************

    let activeEnemy;

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
            $("#dino").css({ position: "absolute", left: "600px", bottom: "310px" })
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
                player.enemiesDefeated += 1;
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
            $("#kraken").css({ position: "absolute", left: "600px", bottom: "170px" })
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
                player.enemiesDefeated += 1;
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
            activeEnemy = croc
        },

        defendingDeactivate: function () {
            $('#croc').animate({ 'left': '600px' });
            this.isDefending = false;
        },

        initialDraw: function () {
            $("#game-window").append("<div id='croc'>Croc</div>")
            $("#croc").css({ width: "150px", height: "150px" })
            // $("#croc").css({ border: "2px solid white", width: "150px", height: "150px" })
            $("#croc").css({ position: "absolute", left: "600px", bottom: "30px" })
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
                player.enemiesDefeated += 1;
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
            console.log(player.enemiesDefeated)
            if (player.enemiesDefeated >= 3) {
                gameSession.isOver = true
                $("#game-window").empty()
                audio.reset();
                audio.fanfare.play();
                HUD.drawAlertBox(`You have defeated all enemies!`)
                HUD.drawRestartBox()
            } else if (player.HP <= 0) {
                gameSession.isOver = true
                $("#game-window").empty()
                audio.reset();
                audio.gameOver.play();
                HUD.drawAlertBox(`You have died!`)
                HUD.drawRestartBox()
            }
        }

    }

    //********************************** START SCREEN *********************************************

    let startScreen = {

        //Display available options,
        drawWarrior: function () {
            $("#game-window").append("<div id='warrior'>Warrior</div>")
            $("#warrior").css({ width: "160px", height: "300px" })
            $("#warrior").css({ position: "absolute", left: "220px", bottom: "165px", "text-align": "center" })

            $("#warrior").css({ border: "2px solid white" })
            $("#warrior").addClass('text-light font-weight-bold')
            $("#warrior").append("<img src='assets/images/WarriorStand.png'>")

            $("#warrior").append("<p>HP: 120</p>")
            $("#warrior").append("<p>Attack Power: 5</p>")

        },
        drawWizard: function () {
            $("#game-window").append("<div id='wizard'>Wizard</div>")
            $("#wizard").css({ width: "160px", height: "300px" })
            $("#wizard").css({ position: "absolute", left: "420px", bottom: "165px", "text-align": "center" })

            $("#wizard").css({ border: "2px solid white" })
            $("#wizard").addClass('text-light font-weight-bold')
            $("#wizard").append("<img src='assets/images/WizardStand.png'>")

            $("#wizard").append("<p>HP: 90</p>")
            $("#wizard").append("<p>Attack Power: 7</p>")
        },

        //Set specs for Warrior
        chooseWarrior: function () {
            audio.startSound.play()
            player.maxHP = 120,
                player.HP = 120,
                player.baseAttackPower = 5,
                player.attackPower = 5,
                player.avatar = 'assets/images/WarriorStand.png'
        },

        //Set specs for Wizard
        chooseWizard: function () {
            audio.startSound.play()
            player.maxHP = 90,
                player.HP = 90,
                player.baseAttackPower = 7,
                player.attackPower = 7,
                player.avatar = 'assets/images/WizardStand.png'
        },

        //Show to user
        draw: function () {
            $("#game-window").append("<h4 id='chooseCharacterText' class='mt-5 text-light'>Choose your character.</h4>")
            $("#chooseCharacterText").css({ "text-align": "center", left: "430px", bottom: "235px" })
            this.drawWarrior();
            this.drawWizard();
            $("#game-window").css("background-image", `url('')`);
        }

    };

    //********************************** BATTLE SCREEN *********************************************

    let battleScreen = {
        draw: function () {
            // HUD.drawPlayerAttackPower();
            // HUD.drawPlayerHP();
            // HUD.drawAttackCounter();
            audio.reset();
            player.initialDraw();
            dino.initialDraw();
            kraken.initialDraw();
            croc.initialDraw();
            $("#game-window").css("background-image", `url('assets/images/dungeon.png')`);
            $("#game-window").css("background-size", `100% 100%`);
            audio.battleTheme.play();
            setTimeout(function () {
                HUD.drawAlertBox(`You are under attack!`)
            }, 500);
            setTimeout(function () {
                $("#game-window").children('#alertBox').remove();
            }, 2000);
        }
    };

    //********************************** AUDIO *********************************************

    let audio = {
        startSound: document.getElementById("startSound"),
        selection: document.getElementById("selection"),
        battleTheme: document.getElementById("battleTheme"),
        fanfare: document.getElementById("fanfare"),
        gameOver: document.getElementById("gameOver"),

        reset: function () {
            this.battleTheme.pause();
            this.battleTheme.currentTime = 0;
            this.fanfare.pause();
            this.fanfare.currentTime = 0;
            this.gameOver.pause();
            this.gameOver.currentTime = 0;
            this.startSound.pause();
            this.startSound.currentTime = 0;
            this.selection.pause();
            this.selection.currentTime = 0;
        }
    };

    //FUNCTIONS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function processAttack(enemyObj) {
        enemyObj.takeDamage();
        enemyObj.defendingDeactivate();
        player.attackCounter += 1;
        player.updateAttackCounter();
        $("#game-window").children('#commands').remove();
        HUD.showingCommandBox = false;
        console.log(HUD.showingCommandBox)
        gameSession.checkIfOver()
    };

    function processClick(enemyObj) {
        enemyObj.defendingActivate();
        HUD.showingCommandBox = true;
        HUD.drawCommandBox();
    }
    //EVENT LISTENERS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(document).on("click", function () {
        audio.selection.play()
    });

    $(document).on("click", "#warrior", function () {
        startScreen.chooseWarrior();
        $("#wizard").fadeOut();
        setTimeout(function () {
            $("#game-window").empty();
            battleScreen.draw();
        }, 1500);

    });

    $(document).on("click", "#wizard", function () {
        startScreen.chooseWizard();
        $("#warrior").fadeOut();
        setTimeout(function () {
            $("#game-window").empty();
            battleScreen.draw();
        }, 1500);
    });

    $(document).on("click", "#kraken", function () {
        if (HUD.showingCommandBox === false) {
            activeEnemy = kraken
            processClick(activeEnemy);
        }
    });

    $(document).on("click", "#dino", function () {
        if (HUD.showingCommandBox === false) {
            activeEnemy = dino
            processClick(activeEnemy);
        }
    });

    $(document).on("click", "#croc", function () {
        if (HUD.showingCommandBox === false) {
            activeEnemy = croc
            processClick(activeEnemy);
        }
    });

    $(document).on("click", "#attackButton", function () {
        var myVar;

        function myFunction() {
            myVar = setTimeout(function () { alert("Hello"); }, 3000);
        }

        function myStopFunction() {
            clearTimeout(myVar);
        }

        let preAttackPower = player.attackPower
        let preAttackHP = player.HP
        processAttack(activeEnemy);
        let postAttackHP = player.HP
        HUD.drawAlertBox(`You did ${preAttackPower} damage, and you took ${preAttackHP - postAttackHP} in counter-damage!`)
        setTimeout(function () {
            $("#game-window").children('#alertBox').remove();
        }, 1500);
        gameSession.checkIfOver();
    });

    $(document).on("click", "#cancelButton", function () {
        console.log(HUD.showingCommandBox)
        activeEnemy.defendingDeactivate();
        $("#game-window").children('#commands').remove();
        HUD.showingCommandBox = false;
    });

    $(document).on("click", "#confirmRetry", function () {
        location.reload()
    });

    $(document).on("click", "#confirmExit", function () {
        window.close()
    });

    //RUN PROGRAM////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    audio.selection.volume = 0.1;
    startScreen.draw();
    //battleScreen.draw();

    //CLOSING SYNTAX////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});