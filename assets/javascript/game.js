//WAIT FOR DOCUMENT READY
$(document).ready(function () {


    //Draw player HP bar
    $("#game-window").append("<div id='playerHP'></div>")
    
    $("#playerHP").css({ border: "2px solid white", width: "300px", height: "30px", color: "white" })
    $("#playerHP").css({ position: "absolute", left: "10px", bottom: "460px" })

    //Draw player HP bar
    $("#game-window").append("<div id='enemyHP'>Hey</div>")
    $("#enemyHP").css({ border: "2px solid white", width: "300px", height: "30px", color: "white" })
    $("#enemyHP").css({ position: "absolute", left: "480px", bottom: "460px" })


    //Draw player
    $("#game-window").append("<div id='player'>Character</div>")
    $("#player").css({ border: "2px solid white", width: "150px", height: "150px" })
    $("#player").css({ position: "absolute", left: "50px", bottom: "200px" })

    //Draw enemy
    $("#game-window").append("<div id='enemy'>Enemy</div>")
    $("#enemy").css({ border: "2px solid white", width: "150px", height: "150px" })
    $("#enemy").css({ position: "absolute", left: "600px", bottom: "200px" })

    var player = {
        HP: 100,

        attack: function () {
            enemy.HP -= 10;
            enemy.updateHP();
            enemy.counterAttack();
        },

        updateHP: function () {
            $("#playerHP").html(`${this.HP}`)
        }
    }

    var enemy = {
        HP: 50,

        updateHP: function () {
            $("#enemyHP").html(`${this.HP}`)
        },

        counterAttack: function () {
            player.HP -= 10;
            player.updateHP()
        }

    }


    //RUN
    $("#playerHP").text("100")
    $("#enemyHP").text("50")

    $("#enemy").click(function () {
        player.attack()
    });

    //CLOSING SYNTAX
});