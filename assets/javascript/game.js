
//WAIT FOR DOCUMENT READY
$(document).ready(function () {

    //GLOBAL VARIABLES////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //OBJECTS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var fighters = {

        warrior: {
            name: 'warrior',
            maxHP: 200,
            HP: 200,
            counterAttackPower: 15,
            baseAttackPower: 5,
            attackPower: 5,
            div: '#warrior',
            avatar: "url('assets/images/WarriorStand.png')",
        },
        ogre: {
            name: 'ogre',
            maxHP: 200,
            HP: 200,
            counterAttackPower: 15,
            baseAttackPower: 5,
            attackPower: 5,
            div: '#ogre',
            avatar: "url('assets/images/OgreStand.png')",
        },
        wizard: {
            name: 'wizard',
            maxHP: 200,
            HP: 200,
            counterAttackPower: 15,
            baseAttackPower: 5,
            attackPower: 5,
            div: '#wizard',
            avatar: "url('assets/images/WizardStand.png')",
        },
        knight: {
            name: 'knight',
            maxHP: 200,
            HP:200,
            counterAttackPower: 15,
            baseAttackPower: 5,
            attackPower: 5,
            div: '#knight',
            avatar: "url('assets/images/KnightStand.png')",
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

    };

    //
    let chosenHero = fighters.wizard

    //Define the enemies, then draw them
    let enemies = [fighters.warrior, fighters.ogre, fighters.wizard, fighters.knight];
    let bottomIncrement = 30;
    for (i=0; i < enemies.length; i++) {
        if (enemies[i] !== chosenHero) {
            fighters.drawEnemy(enemies[i], bottomIncrement)
            console.log(bottomIncrement)
            bottomIncrement += 140
        }
    }

    //Draw hero
    fighters.drawHero(chosenHero);

});