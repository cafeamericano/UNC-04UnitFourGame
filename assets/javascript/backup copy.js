
//WAIT FOR DOCUMENT READY
$(document).ready(function () {

    //GLOBAL VARIABLES////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let enemyEnGarde = null;

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
            $("#commands").append("<button class='btn m-2' style='opacity: 0.5'>Cancel</button>")
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
        fightersDefeated: 0,

        initialDraw: function () {
            $("#game-window").append("<div id='player'>Character</div>")
            $("#player").css({ width: "150px", height: "150px" })
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

    //********************************** FIGHTERS *********************************************

    var fighters = {

        //Sub objects

        warrior: {
            name: 'warrior',
            maxHP: 200,
            counterAttackPower: 15,
            baseAttackPower: 5,
            attackPower: 5,
            div: '#warrior',
            avatar: "url('assets/images/WarriorStanding.png')",
        },
        ogre: {
            name: 'ogre',
            maxHP: 200,
            counterAttackPower: 15,
            baseAttackPower: 5,
            attackPower: 5,
            div: '#ogre',
            avatar: "url('assets/images/OgreStanding.png')",
        },
        wizard: {
            name: 'wizard',
            maxHP: 200,
            counterAttackPower: 15,
            baseAttackPower: 5,
            attackPower: 5,
            div: '#wizard',
            avatar: "url('assets/images/WizardStanding.png')",
        },
        knight: {
            name: 'knight',
            maxHP: 200,
            counterAttackPower: 15,
            baseAttackPower: 5,
            attackPower: 5,
            div: '#knight',
            avatar: "url('assets/images/KnightStanding.png')",
        },

        //Shared methods

        initialDraw: function (activeEnemy) {
            $("#game-window").append(`<div id=${activeEnemy.name}>${activeEnemy.name}</div>`)
            $(activeEnemy.div).css({ width: "150px", height: "150px" })
            $(activeEnemy.div).css({ position: "absolute", left: "600px", bottom: activeEnemy.bottomLocation })
            $(activeEnemy.div).css("background-image", activeEnemy.avatar);
            $(activeEnemy.div).css({ display: "flex", "justify-content": "left", "padding-top": "120px" })
            $(activeEnemy.div).addClass('text-light font-weight-bold')
            fighters.updateHP(activeEnemy);
        },

        drawInsideDefenderArea: function (activeEnemy) {
            $("#defenderArea").append(`<div id=${activeEnemy.name}>${activeEnemy.name}</div>`)
            $(activeEnemy.div).css({ width: "150px", height: "150px" })
            $(activeEnemy.div).css({ position: "absolute", left: "75px", bottom: "75px" })
            $(activeEnemy.div).css("background-image", activeEnemy.avatar);
            $(activeEnemy.div).css({ display: "flex", "justify-content": "left", "padding-top": "120px", "z-index": "99" })
            $(activeEnemy.div).addClass('text-light font-weight-bold')
            fighters.updateHP(activeEnemy);
        },

        processAttack: function (activeEnemy) {
            fighters.takeDamage(activeEnemy);
            player.attackCounter += 1;
            player.updateAttackCounter();
            gameSession.checkIfOver()
        },

        processClick: function (activeEnemy) {
            fighters.defendingActivate(activeEnemy);
            HUD.showingCommandBox = true;
            HUD.drawCommandBox();
        },

        defendingActivate: function (activeEnemy) {
            $("#game-window").children(activeEnemy.div).remove();
            fighters.drawInsideDefenderArea(activeEnemy)
        },

        defendingDeactivate: function (activeEnemy) {
            $(activeEnemy.div).animate({ 'left': '600px' });
        },

        updateHP: function (activeEnemy) {
            let HPpercentage = activeEnemy.HP / activeEnemy.maxHP * 100 + "%"
            $(activeEnemy.div).html(`<span style="width: ${HPpercentage}" class="bg-danger text-center">${activeEnemy.HP}</span>`)
        },

        counterAttack: function (activeEnemy) {
            player.HP -= activeEnemy.counterAttackPower;
            player.updateHP()
        },

        animateDamageReception: function (activeEnemy, propToChange, zero, one) {
            setTimeout(function () {
                $(activeEnemy.div).css(propToChange, zero)
            }, 000);
            $(activeEnemy.div).css(propToChange, one)
            setTimeout(function () {
                $(activeEnemy.div).css(propToChange, zero)
            }, 100);
            setTimeout(function () {
                $(activeEnemy.div).css(propToChange, one)
            }, 200);
            setTimeout(function () {
                $(activeEnemy.div).css(propToChange, zero)
            }, 300);
            setTimeout(function () {
                $(activeEnemy.div).css(propToChange, one)
            }, 400);
            setTimeout(function () {
                $(activeEnemy.div).css(propToChange, zero)
            }, 500);
            setTimeout(function () {
                $(activeEnemy.div).css(propToChange, one)
            }, 600);
            setTimeout(function () {
                $(activeEnemy.div).css(propToChange, zero)
            }, 700);
            setTimeout(function () {
                $(activeEnemy.div).css(propToChange, one)
            }, 800);
        },

        takeDamage: function (activeEnemy) {
            fighters.animateDamageReception(activeEnemy, "background-image", '', activeEnemy.avatar);
            activeEnemy.HP -= player.attackPower;
            if (activeEnemy.HP <= 0) {
                $("#game-window").children('#commands').remove();
                HUD.showingCommandBox = false;
                $(activeEnemy.div).fadeOut()
                player.fightersDefeated += 1;
                activeEnemy.isDefending = false;
                enemyEnGarde = null
            } else {
                fighters.updateHP(activeEnemy);
                fighters.counterAttack(activeEnemy);
            }
            player.attackPower += player.baseAttackPower
            player.updateAttackPower();
        }
    };

    //********************************** GAME SESSION *********************************************

    let gameSession = {
        isOver: false,

        checkIfOver: function () {
            if (player.fightersDefeated >= 3) {
                gameSession.isOver = true
                $("#game-window").empty()
                audio.reset();
                audio.fanfare.play();
                HUD.drawAlertBox(`You have defeated all fighters!`)
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

    };

    //********************************** START SCREEN *********************************************

    let startScreen = {

        //Display available options,
        presentWarriorForSelection: function () {
            $("#game-window").append("<div id='warrior'>Warrior</div>")
            $("#warrior").css({ width: "160px", height: "300px" })
            $("#warrior").css({ position: "absolute", left: "20px", bottom: "165px", "text-align": "center" })

            $("#warrior").css({ border: "2px solid white" })
            $("#warrior").addClass('text-light font-weight-bold')
            $("#warrior").append("<img src='assets/images/WarriorStand.png'>")

            $("#warrior").append("<p>HP: 110</p>")
            $("#warrior").append("<p>Attack Power: 5</p>")

        },

        presentWizardForSelection: function () {
            $("#game-window").append("<div id='wizard'>Wizard</div>")
            $("#wizard").css({ width: "160px", height: "300px" })
            $("#wizard").css({ position: "absolute", left: "420px", bottom: "165px", "text-align": "center" })

            $("#wizard").css({ border: "2px solid white" })
            $("#wizard").addClass('text-light font-weight-bold')
            $("#wizard").append("<img src='assets/images/WizardStand.png'>")

            $("#wizard").append("<p>HP: 90</p>")
            $("#wizard").append("<p>Attack Power: 8</p>")
        },

        presentOgreForSelection: function () {
            $("#game-window").append("<div id='ogre'>Ogre</div>")
            $("#ogre").css({ width: "160px", height: "300px" })
            $("#ogre").css({ position: "absolute", left: "220px", bottom: "165px", "text-align": "center" })

            $("#ogre").css({ border: "2px solid white" })
            $("#ogre").addClass('text-light font-weight-bold')
            $("#ogre").append("<img src='assets/images/OgreStand.png'>")

            $("#ogre").append("<p>HP: 105</p>")
            $("#ogre").append("<p>Attack Power: 7</p>")

        },
        presentKnightForSelection: function () {
            $("#game-window").append("<div id='knight'>Knight</div>")
            $("#knight").css({ width: "160px", height: "300px" })
            $("#knight").css({ position: "absolute", left: "620px", bottom: "165px", "text-align": "center" })

            $("#knight").css({ border: "2px solid white" })
            $("#knight").addClass('text-light font-weight-bold')
            $("#knight").append("<img src='assets/images/KnightStand.png'>")

            $("#knight").append("<p>HP: 100</p>")
            $("#knight").append("<p>Attack Power: 6</p>")
        },

        //Set specs for Warrior
        chooseWarrior: function () {
            audio.startSound.play()
            player.maxHP = 110,
                player.HP = 110,
                player.baseAttackPower = 5,
                player.attackPower = 5,
                player.avatar = 'assets/images/WarriorStand.png'
        },

        //Set specs for Wizard
        chooseWizard: function () {
            audio.startSound.play()
            player.maxHP = 90,
                player.HP = 90,
                player.baseAttackPower = 8,
                player.attackPower = 8,
                player.avatar = 'assets/images/WizardStand.png'
        },

        //Set specs for Ogre
        chooseOgre: function () {
            audio.startSound.play()
            player.maxHP = 105,
                player.HP = 105,
                player.baseAttackPower = 7,
                player.attackPower = 7,
                player.avatar = 'assets/images/OgreStand.png'
        },

        //Set specs for Knight
        chooseKnight: function () {
            audio.startSound.play()
            player.maxHP = 100,
                player.HP = 100,
                player.baseAttackPower = 6,
                player.attackPower = 6,
                player.avatar = 'assets/images/KnightStand.png'
        },

        //Show to user
        draw: function () {
            audio.reset();
            $("#game-window").append("<h4 id='chooseCharacterText' class='mt-5 text-light'>Choose your character.</h4>")
            $("#chooseCharacterText").css({ "text-align": "center", left: "430px", bottom: "235px" })
            this.presentWarriorForSelection();
            this.presentWizardForSelection();
            this.presentOgreForSelection();
            this.presentKnightForSelection();
            $("#game-window").css("background-image", `url('')`);
        }

    };

    //********************************** BATTLE SCREEN *********************************************

    let battleScreen = {
        draw: function () {
            audio.reset();
            player.initialDraw();
            fighters.initialDraw(fighters.dino)
            fighters.initialDraw(fighters.kraken)
            fighters.initialDraw(fighters.croc)
            $("#game-window").css("background-image", `url('assets/images/dungeon.png')`);
            $("#game-window").css("background-size", `100% 100%`);
            audio.battleTheme.play();
            setTimeout(function () {
                HUD.drawAlertBox(`You are under attack!`)
            }, 500);
            setTimeout(function () {
                $("#game-window").children('#alertBox').remove();
            }, 2000);
            this.createDefenderArea();
        },

        createDefenderArea: function () {
            $("#game-window").append(`<div id="defenderArea"></div>`)
            $("#defenderArea").css({ position: "absolute", left: "150px"})
            $("#defenderArea").css({ bottom: "150px", width: "300px", height: "300px", "background-image": "url('assets/images/center.png')", "background-size": "300px, 300px"})
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
            this.selection.volume = 0.1;
        }
    };

    //EVENT LISTENERS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(document).on("click", function () {
        audio.selection.play()
        console.log(enemyEnGarde)
    });


    //Character Selection

    $(document).on("click", "#warrior", function () {
        startScreen.chooseWarrior();
        $("#wizard").fadeOut();
        $("#knight").fadeOut();
        $("#ogre").fadeOut();
        setTimeout(function () {
            $("#game-window").empty();
            battleScreen.draw();
        }, 1500);

    });

    $(document).on("click", "#wizard", function () {
        startScreen.chooseWizard();
        $("#warrior").fadeOut();
        $("#knight").fadeOut();
        $("#ogre").fadeOut();
        setTimeout(function () {
            $("#game-window").empty();
            battleScreen.draw();
        }, 1500);
    });

    $(document).on("click", "#ogre", function () {
        startScreen.chooseOgre();
        $("#warrior").fadeOut();
        $("#wizard").fadeOut();
        $("#knight").fadeOut();
        setTimeout(function () {
            $("#game-window").empty();
            battleScreen.draw();
        }, 1500);
    });

    $(document).on("click", "#knight", function () {
        startScreen.chooseKnight();
        $("#wizard").fadeOut();
        $("#warrior").fadeOut();
        $("#ogre").fadeOut();
        setTimeout(function () {
            $("#game-window").empty();
            battleScreen.draw();
        }, 1500);
    });

    //

    $(document).on("click", "#kraken", function () {
        if (HUD.showingCommandBox === false && (enemyEnGarde === null || enemyEnGarde === kraken)) {
            enemyEnGarde = fighters.kraken
            fighters.processClick(enemyEnGarde);
        }
    });

    $(document).on("click", "#dino", function () {
        if (HUD.showingCommandBox === false && (enemyEnGarde === null || enemyEnGarde === dino)) {
            enemyEnGarde = fighters.dino
            fighters.processClick(enemyEnGarde);
        }
    });

    $(document).on("click", "#croc", function () {
        if (HUD.showingCommandBox === false && (enemyEnGarde === null || enemyEnGarde === croc)) {
            enemyEnGarde = fighters.croc
            fighters.processClick(enemyEnGarde);
        }
    });

    $(document).on("click", "#attackButton", function () {
        let preAttackPower = player.attackPower
        let preAttackHP = player.HP
        fighters.processAttack(enemyEnGarde);
        let postAttackHP = player.HP
        HUD.drawAlertBox(`You did ${preAttackPower} damage, and you took ${preAttackHP - postAttackHP} in counter-damage!`)
        setTimeout(function () {
            $("#game-window").children('#alertBox').remove();
        }, 1500);
        gameSession.checkIfOver();
    });

    $(document).on("click", "#confirmRetry", function () {
        location.reload()
    });

    $(document).on("click", "#confirmExit", function () {
        window.close()
    });

    //RUN PROGRAM////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    startScreen.draw();

    //CLOSING SYNTAX////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});