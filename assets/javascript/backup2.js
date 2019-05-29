//WAIT FOR DOCUMENT READY
$(document).ready(function () {

    //GLOBAL VARIABLES////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let activeEnemy;

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

    //////////////////
    var enemies = {
        dino: {
            name: 'dino',
            maxHP: 200,
            HP: 200,
            counterAttackPower: 15,
            bottomLocation: '310px',
            div: '#dino',
            avatar: "url('assets/images/dino.png')"
        },
        kraken: {
            name: 'kraken',
            maxHP: 100,
            HP: 100,
            counterAttackPower: 10,
            bottomLocation: '170px',
            div: '#kraken',
            avatar: "url('assets/images/kraken.png')"
        },
        croc: {
            name: 'croc',
            maxHP: 50,
            HP: 50,
            counterAttackPower: 5,
            isDefending: false,
            bottomLocation: '30px',
            div: '#croc',
            avatar: "url('assets/images/croc.png')"
        }
    }

    //********************************** GAME SESSION *********************************************

    let gameSession = {
        isOver: false,

        checkIfOver: function () {
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

    //////////////////
    var heroes = {
        warrior: {
            id: 'warrior',
            name: 'Warrior',
            HP: 120,
            baseAttackPower: 5,
            attackPower: 5,
            bottomLocation: '165px',
            div: '#dino',
            avatar: "url('assets/images/WarriorStand.png')"
        },
        wizard: {
            id: 'wizard',
            name: 'Wizard',
            HP: 90,
            baseAttackPower: 7,
            attackPower: 7,
            bottomLocation: '165px',
            div: '#wizard',
            avatar: "url('assets/images/WizardStand.png')"
        }
    };

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

    let startScreen = {

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
            drawHero(heroes.warrior)
            drawHero(heroes.wizard)
            $("#game-window").css("background-image", `url('')`);
        }

    };

    //********************************** BATTLE SCREEN *********************************************

    let battleScreen = {
        draw: function () {
            audio.reset();
            player.initialDraw();
            initialDraw(enemies.dino)
            initialDraw(enemies.kraken)
            initialDraw(enemies.croc)
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

    function processAttack(activeEnemy) {
        takeDamage(activeEnemy);
        defendingDeactivate(activeEnemy);
        player.attackCounter += 1;
        player.updateAttackCounter();
        $("#game-window").children('#commands').remove();
        HUD.showingCommandBox = false;
        gameSession.checkIfOver()
    };

    function processClick(activeEnemy) {
        defendingActivate(activeEnemy);
        HUD.showingCommandBox = true;
        HUD.drawCommandBox();
    }

    function initialDraw(activeEnemy) {
        $("#game-window").append(`<div id=${activeEnemy.name}>${activeEnemy.name}</div>`)
        $(activeEnemy.div).css({ width: "150px", height: "150px" })
        $(activeEnemy.div).css({ position: "absolute", left: "600px", bottom: activeEnemy.bottomLocation })
        $(activeEnemy.div).css("background-image", activeEnemy.avatar);
        $(activeEnemy.div).css({ display: "flex", "justify-content": "left", "padding-top": "120px" })
        $(activeEnemy.div).addClass('text-light font-weight-bold')
        updateHP(activeEnemy);
    }

    function defendingActivate(activeEnemy) {
        $(activeEnemy.div).animate({ 'left': '450px' });
        activeEnemy.isDefending = true;
    }

    function defendingDeactivate(activeEnemy) {
        $(activeEnemy.div).animate({ 'left': '600px' });
        activeEnemy.isDefending = false;
    }

    function updateHP(activeEnemy) {
        let HPpercentage = activeEnemy.HP / activeEnemy.maxHP * 100 + "%"
        $(activeEnemy.div).html(`<span style="width: ${HPpercentage}" class="bg-danger text-center">${activeEnemy.HP}</span>`)
    }

    function counterAttack(activeEnemy) {
        player.HP -= activeEnemy.counterAttackPower;
        player.updateHP()
    }

    function takeDamage(activeEnemy) {
        activeEnemy.HP -= player.attackPower;
        if (activeEnemy.HP <= 0) {
            $(activeEnemy.div).fadeOut()
            player.enemiesDefeated += 1;
        } else {
            updateHP(activeEnemy);
            counterAttack(activeEnemy);
        }
        player.attackPower += player.baseAttackPower
        player.updateAttackPower();
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
            activeEnemy = enemies.kraken
            processClick(activeEnemy);
        }
    });

    $(document).on("click", "#dino", function () {
        if (HUD.showingCommandBox === false) {
            activeEnemy = enemies.dino
            processClick(activeEnemy);
        }
    });

    $(document).on("click", "#croc", function () {
        if (HUD.showingCommandBox === false) {
            activeEnemy = enemies.croc
            processClick(activeEnemy);
        }
    });

    $(document).on("click", "#attackButton", function () {
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
        defendingDeactivate(activeEnemy);
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

    //CLOSING SYNTAX////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});