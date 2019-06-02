
//WAIT FOR DOCUMENT READY
$(document).ready(function () {

    //GLOBAL VARIABLES////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let chosenHero = null;
    let defendingEnemy = null;
    let defenderAreaOccupied = false;
    let backgrounds = ['assets/images/temple1.png', 'assets/images/temple2.png', 'assets/images/temple3.png'];
    let bgIndex = 0;
    let winCount = 0;
    let gameOver = false;

    //OBJECTS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

    var fighters = {

        warrior: {
            name: 'warrior',
            maxHP: 205,
            HP: 205,
            counterAttackPower: 20,
            baseAttackPower: 17,
            attackPower: 17,
            div: '#warrior',
            avatar: "url('assets/images/WarriorStand.png')",
            isDefending: false,
        },
        ogre: {
            name: 'ogre',
            maxHP: 180,
            HP: 180,
            counterAttackPower: 45,
            baseAttackPower: 16,
            attackPower: 16,
            div: '#ogre',
            avatar: "url('assets/images/OgreStand.png')",
            isDefending: false,
        },
        wizard: {
            name: 'wizard',
            maxHP: 210,
            HP: 210,
            counterAttackPower: 37,
            baseAttackPower: 15,
            attackPower: 15,
            div: '#wizard',
            avatar: "url('assets/images/WizardStand.png')",
            isDefending: false,
        },
        knight: {
            name: 'knight',
            maxHP: 210,
            HP: 210,
            counterAttackPower: 30,
            baseAttackPower: 14,
            attackPower: 14,
            div: '#knight',
            avatar: "url('assets/images/KnightStand.png')",
            isDefending: false,
        },

        //Shared methods
        drawEnemy: function (sprite, leftPx) {
            $("#game-window").append(`<div id=${sprite.name}>${sprite.name}</div>`);
            $(sprite.div).css({ width: "150px", height: "150px" })
            $(sprite.div).css({ position: "absolute", left: leftPx, bottom: "240px" })
            $(sprite.div).css("background-image", sprite.avatar);
            $(sprite.div).css({ display: "flex", "justify-content": "left", "padding-top": "120px" })
            $(sprite.div).addClass('text-light font-weight-bold')
            fighters.updateHP(sprite);
        },
        updateHP: function (sprite) {
            let HPpercentage = sprite.HP / sprite.maxHP * 100 + "%"
            $(sprite.div).html(`<span id="${sprite.name}HPbar" style="width: ${HPpercentage}" class="bg-danger text-center">${sprite.HP}</span>`)
            if (sprite === chosenHero) {
                $(`#${sprite.name}HPbar`).css({ transform: "scaleX(-1)" })
            }
        },
        moveToHeroArea: function (sprite) {
            chosenHero = sprite;
            $("#game-window").children(sprite.div).remove();
            $("#heroArea").append(`<div id=${sprite.name}></div>`);
            $(sprite.div).css({ width: "150px", height: "150px" })
            $(sprite.div).css({ position: "absolute", transform: "scaleX(-1)" })
            $(sprite.div).css("background-image", sprite.avatar);
            $(sprite.div).css({ display: "flex", "justify-content": "left", "padding-top": "120px" })
            $(sprite.div).addClass('text-light font-weight-bold')
            fighters.updateHP(sprite);
            audio.battleTheme.play()
        },
        moveToDefenderArea: function (sprite) {
            HUD.clearAnnouncement();
            HUD.addAnnouncement("FIGHT!!!")
            setTimeout(function(){ HUD.clearAnnouncement() }, 1000);
            defenderAreaOccupied = true;
            sprite.isDefending = true;
            $("#game-window").children(sprite.div).remove();
            $("#defenderArea").append(`<div id=${sprite.name}></div>`);
            $(sprite.div).css({ width: "150px", height: "150px" })
            $(sprite.div).css({ position: "relative", left: "0px", bottom: "0px" })
            $(sprite.div).css("background-image", sprite.avatar);
            $(sprite.div).css({ display: "flex", "justify-content": "left", "padding-top": "120px" })
            $(sprite.div).addClass('text-light font-weight-bold')
            fighters.updateHP(sprite);
        },
        processAttack: function (selection) {
            if (selection.isDefending === true && gameOver === false) {
                selection.HP -= chosenHero.attackPower;
                HUD.clearDamageLabels()
                HUD.showEnemyDamage(chosenHero.attackPower)
                fighters.updateHP(selection);
                if (selection.HP <= 0) {
                    winCount += 1;
                    $("#defenderArea").children(selection.div).remove();
                    defenderAreaOccupied = false;
                    defendingEnemy = null;
                    HUD.hideAttackButton();
                    if (winCount >= 3) {
                        audio.reset();
                        audio.fanfare.play();
                        setTimeout(function(){ HUD.addAnnouncement("You are victorious!") }, 1000);
                        setTimeout(function(){ HUD.showPlayAgainBox() }, 2000);
                        gameOver = true;
                    } else {
                        HUD.addAnnouncement("Select another opponent!")
                    }
                } else {
                    chosenHero.HP -= selection.counterAttackPower;
                    HUD.showHeroDamage(selection.counterAttackPower)
                }
                setTimeout(function(){ HUD.clearDamageLabels() }, 1000);
                chosenHero.attackPower += chosenHero.baseAttackPower;
                fighters.updateHP(chosenHero)
                if (chosenHero.HP <= 0) {
                    gameOver = true;
                    audio.reset();
                    audio.gameOver.play();
                    $("#game-window").children("#heroArea").remove();
                    $("#game-window").children("#attackButton").remove();
                    setTimeout(function(){ HUD.addAnnouncement("You have been defeated!") }, 1000);
                    setTimeout(function(){ HUD.showPlayAgainBox() }, 2000);
                }
            } else if (defenderAreaOccupied === false && selection !== chosenHero) {
                this.moveToDefenderArea(selection)
                defendingEnemy = selection;
                HUD.drawAttackButton();
            }
        }

    };

    var HUD = {
        applyBG: function() {
            bgIndex +=1
            if (bgIndex >= 3) {
                bgIndex = 0;
            }
            $("#game-window").css("background-image", `url(${backgrounds[bgIndex]})`);
            $("#game-window").css("background-size", `100% 100%`);
        },
        drawHeroArea: function () {
            $("#game-window").append(`<div id=heroArea></div>`);
            $("#heroArea").css({ width: "150px", height: "150px" })
            $("#heroArea").css({ position: "absolute", left: "410px", bottom: "80px"})
        },
        drawDefenderArea: function () {
            $("#game-window").append(`<div id=defenderArea></div>`);
            $("#defenderArea").css({ width: "150px", height: "150px" })
            $("#defenderArea").css({ position: "absolute", left: "240px", bottom: "80px"})
        },
        drawAttackButton: function () {
            $("#game-window").append(`<button id=attackButton>Attack</button>`);
            $("#attackButton").css({ width: "150px", height: "40px" })
            $("#attackButton").css({ position: "absolute", left: "325px", bottom: "20px"})
        },
        hideAttackButton: function() {
            $("#game-window").children("#attackButton").remove();
        },
        addAnnouncement: function(message) {
            $("#game-window").append(`<h3 id='announcement' style='text-align: center; color: white'>${message}</h3>`);
        },
        clearAnnouncement: function() {
            $("#game-window").children("#announcement").remove();
        },
        showPlayAgainBox: function() {
            $("#game-window").append('<div id="playAgain"><button>Play Again</button></div>')
        },
        showEnemyDamage: function(arg) {
            $("#defenderArea").append(`<div id="enemyDamage">-${arg} HP!</div>`)
            $("#enemyDamage").css({ width: "130px", height: "40px" })
            $("#enemyDamage").css({ position: "absolute", left: "-110px", bottom: "75px", color: "red", "font-weight": "bold"})
        },
        showHeroDamage: function(arg) {
            $("#heroArea").append(`<div id="heroDamage">-${arg} HP!</div>`)
            $("#heroDamage").css({ width: "130px", height: "40px" })
            $("#heroDamage").css({ position: "absolute", left: "130px", bottom: "75px", color: "red", "font-weight": "bold"})
        },
        clearDamageLabels: function() {
            $("#defenderArea").children("#enemyDamage").remove();
            $("#heroArea").children("#heroDamage").remove();
        }
    };

    //Define the enemies, then draw them
    let enemies = [fighters.warrior, fighters.ogre, fighters.wizard, fighters.knight];
    let leftIncrement = 70;
    for (i = 0; i < enemies.length; i++) {
        if (enemies[i] !== chosenHero) {
            fighters.drawEnemy(enemies[i], leftIncrement)
            console.log(leftIncrement)
            leftIncrement += 170
        }
    };

    //Start
    audio.selection.volume = 0.1
    HUD.addAnnouncement("Choose your character!")
    HUD.applyBG();
    HUD.drawDefenderArea()
    HUD.drawHeroArea()
    setInterval(function(){ HUD.applyBG() }, 1000);

    //Event listeners

    $(document).on("click", "#playAgain", function () {
        location.reload()
    });

    $(document).on("click", "#knight", function () {
        if (chosenHero === null) {
            fighters.moveToHeroArea(fighters.knight)
            HUD.clearAnnouncement();
            HUD.addAnnouncement("Select an opponent!")
        } else {
            fighters.processAttack(fighters.knight)
        }
    });

    $(document).on("click", "#ogre", function () {
        if (chosenHero === null) {
            fighters.moveToHeroArea(fighters.ogre)
            HUD.clearAnnouncement();
            HUD.addAnnouncement("Select an opponent!")
        } else {
            fighters.processAttack(fighters.ogre)
        }    
    });

    $(document).on("click", "#warrior", function () {
        if (chosenHero === null) {
            fighters.moveToHeroArea(fighters.warrior)
            HUD.clearAnnouncement();
            HUD.addAnnouncement("Select an opponent!")
        } else {
            fighters.processAttack(fighters.warrior)
        }    
    });

    $(document).on("click", "#wizard", function () {
        if (chosenHero === null) {
            fighters.moveToHeroArea(fighters.wizard)
            HUD.clearAnnouncement();
            HUD.addAnnouncement("Select an opponent!")
        } else {
            fighters.processAttack(fighters.wizard)
        }    
    });

    $(document).on("click", "#attackButton", function () {
        if (defendingEnemy !== null) {
            fighters.processAttack(defendingEnemy);
        }
    });

    $(document).on("click", function () {
        console.log('chosen hero is ' + chosenHero)
        console.log('defending enemy is ' + defendingEnemy)
        audio.selection.play()
    });

});
