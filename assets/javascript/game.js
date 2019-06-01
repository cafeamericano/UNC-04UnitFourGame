
//WAIT FOR DOCUMENT READY
$(document).ready(function () {

    //GLOBAL VARIABLES////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let defenderAreaOccupied = false;

    //OBJECTS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var fighters = {

        warrior: {
            name: 'warrior',
            maxHP: 200,
            HP: 200,
            counterAttackPower: 10,
            baseAttackPower: 10,
            attackPower: 10,
            div: '#warrior',
            avatar: "url('assets/images/WarriorStand.png')",
            isDefending: false,
        },
        ogre: {
            name: 'ogre',
            maxHP: 190,
            HP: 190,
            counterAttackPower: 12,
            baseAttackPower: 12,
            attackPower: 12,
            div: '#ogre',
            avatar: "url('assets/images/OgreStand.png')",
            isDefending: false,
        },
        wizard: {
            name: 'wizard',
            maxHP: 180,
            HP: 180,
            counterAttackPower: 14,
            baseAttackPower: 14,
            attackPower: 14,
            div: '#wizard',
            avatar: "url('assets/images/WizardStand.png')",
            isDefending: false,
        },
        knight: {
            name: 'knight',
            maxHP: 210,
            HP:210,
            counterAttackPower: 11,
            baseAttackPower: 11,
            attackPower: 11,
            div: '#knight',
            avatar: "url('assets/images/KnightStand.png')",
            isDefending: false,
        },

        //Shared methods
        drawHero: function (sprite) {
            $("#game-window").append(`<div id=${sprite.name}></div>`);
            $(sprite.div).css({ width: "150px", height: "150px" })
            $(sprite.div).css({ position: "absolute", left: "550px", bottom: "235px", transform: "scaleX(-1)" })
            $(sprite.div).css("background-image", sprite.avatar);
            $(sprite.div).css({ display: "flex", "justify-content": "left", "padding-top": "120px" })
            $(sprite.div).addClass('text-light font-weight-bold')
            fighters.updateHP(sprite);
        },
        drawEnemy: function (sprite, bottomPx) {
            $("#game-window").append(`<div id=${sprite.name}>${sprite.name}</div>`);
            $(sprite.div).css({ width: "150px", height: "150px" })
            $(sprite.div).css({ position: "absolute", left: "50px", bottom: bottomPx +"px" })
            $(sprite.div).css("background-image", sprite.avatar);
            $(sprite.div).css({ display: "flex", "justify-content": "left", "padding-top": "120px" })
            $(sprite.div).addClass('text-light font-weight-bold')
            fighters.updateHP(sprite);
        },
        updateHP: function (sprite) {
            let HPpercentage = sprite.HP / sprite.maxHP * 100 + "%"
            $(sprite.div).html(`<span id="${sprite.name}HPbar" style="width: ${HPpercentage}" class="bg-danger text-center">${sprite.HP}</span>`)
            if (sprite === chosenHero) {
                $(`#${sprite.name}HPbar`).css({transform: "scaleX(-1)" })
            }
        },
        moveToDefenderArea: function(sprite) {
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
        processAttack: function(selection) {
            if (selection.isDefending === true) {
                selection.HP -= chosenHero.attackPower;
                fighters.updateHP(selection);
                if(selection.HP <= 0) {
                    $("#defenderArea").children(selection.div).remove();
                    defenderAreaOccupied = false;
                }
                chosenHero.attackPower += chosenHero.baseAttackPower;
                chosenHero.HP -= selection.counterAttackPower;
                fighters.updateHP(chosenHero)
            } else if (defenderAreaOccupied === false) {
                this.moveToDefenderArea(selection)
            }
        }

    };

    var HUD = {
        drawDefenderArea: function(){
            $("#game-window").append(`<div id=defenderArea></div>`);
            $("#defenderArea").css({ width: "150px", height: "150px" })
            $("#defenderArea").css({ position: "absolute", left: "350px", bottom: "235px", border: "2px solid red" })
        }
    };

    //Define the chosen hero
    let chosenHero = fighters.wizard

    //Define the enemies, then draw them
    let enemies = [fighters.warrior, fighters.ogre, fighters.wizard, fighters.knight];
    let bottomIncrement = 30;
    for (i=0; i < enemies.length; i++) {
        if (enemies[i] !== chosenHero) {
            fighters.drawEnemy(enemies[i], bottomIncrement)
            console.log(bottomIncrement)
            bottomIncrement += 150
        }
    };

    //Draw hero
    fighters.drawHero(chosenHero);

    HUD.drawDefenderArea()

    //Event listeners
    $(document).on("click", "#knight", function () {
        fighters.processAttack(fighters.knight)
    });

    $(document).on("click", "#ogre", function () {
        fighters.processAttack(fighters.ogre)
    });

    $(document).on("click", "#warrior", function () {
        fighters.processAttack(fighters.warrior)
    });

    $(document).on("click", "#wizard", function () {
        fighters.processAttack(fighters.wizard)
    });

});