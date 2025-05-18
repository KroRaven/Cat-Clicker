/* Char Class. Instance is a Character that the Player Creates. It can be understood 
               as a Game, or the Object containing the Game State */
class Char{
    constructor({name, charCat, 
                catsArray, gameStats, 
                misc
    }){
        this.userStats = {name: name}
        this.gameStats = {prey: gameStats.prey, herb: gameStats.herb, LvL: gameStats.LvL}
        this.charStats = {charCat: charCat}
        this.catsStats = {catsArray: catsArray}
        this.misc = misc
    }

    calcHunt(){
        const preyPerClick = 1 + this.catsStats.catsArray.reduce( (acc, cur) => acc + (cur.amount * cur.preyClick), 0);
        return preyPerClick
    }
    calcHerb(){
        const herbPerClick = 1 + this.catsStats.catsArray.reduce( (acc, cur) => acc + (cur.amount * cur.herbClick), 0);
        return herbPerClick
    }
    calcHuntHerbSec(){
        const preyPerSecond = 0 + this.catsStats.catsArray.reduce( (acc, cur) => acc + (cur.amount * cur.preySecond), 0);
        const herbPerSecond = 0 + this.catsStats.catsArray.reduce( (acc, cur) => acc + (cur.amount * cur.herbSecond), 0);
        return [preyPerSecond, herbPerSecond]
    }
}



/* CharCat Class. Instance is a Cat defined by its Element, which the Player chooses to be their 
                  Character*/
class CharCat{
    constructor({element="NaE", skillTree=[], }){
        this.element = element
        this.skillTree = skillTree
    }
}



/* Cat Class. Instances are the ingame idle Cats */
class Cat{
    constructor({name, amount=0, 
                preyCost=0, herbCost=0,
                preyClick=0, preySecond=0, herbClick=0, herbSecond=0,
                hitpoints=0, damage=0, element="NaE",
                skillTree=[]}){
        this.name = name
        this.amount = amount
        this.preyCost = preyCost
        this.herbCost = herbCost
        this.preyClick = preyClick
        this.preySecond = preySecond
        this.herbClick = herbClick
        this.herbSecond = herbSecond
        this.hitpoints = hitpoints
        this.damage = damage
        this.element = element
        this.skillTree = skillTree
    }

    buyCat(char){
        if (char.gameStats.prey >= this.preyCost){
            char.gameStats.prey -= this.preyCost
            this.amount += 1
            this.preyCost *= 1.2
        }
    }
}



/* Skill Class. Instance is a Skill which can be acquired. They form a skillTree (Array of Skills),
                of which skillTrees are part of the Cats- and CharCat Instances*/
class Skill{
    constructor({name="", 
                cost=0, minLvL=0, req=[], 
                active=false, effect=function(){} }){
        this.name = name         // Name of the Skill 
        this.cost = cost         // Minimum Prey Cost 
        this.minLvL = minLvL     // Minimum LvL required
        this.req = req           // Required skills, List of skills (which has to be active)
        this.active = active     // Boolean - already activated/bought or not
        this.effect = effect     // Function - Bonus Effect of the Skill
    }

    buySkill(char){
        // Every required Skill has to be activated, AND minLvL has to be required, AND
        //       Skill is NOT already activated/bought
        if ( (this.req.every( (skill, i, arr) => {skill.active}) || this.req == []) && 
             (char.gameStats.LvL >= this.minLvL) && 
             (!this.active) ){
            char.gameStats.prey -= this.cost;
            this.activate(char);
        }
    }
    activate(){
        this.active = true;
        this.effect();          // Activates the Effect. Function will here be called.
    }

}




//// How to create a Cat ////
// Think of an unique Name, Cats are DISTINGUISHED by their Name
// Create a new Cat, Name is passed as an constructor Argument
// Define Skills (recommended 4-7)
// Put the Skills in a skillTree (Array)
// Add the skillTree to the Cat
// Add the Cat to the catsArray !!!


//// How to create a CharCat ////
// Think of an unique Element, CharCats are DISTINGUISHED by their Element
// Create a new CharCat, Element is passed as an constructor Argument
// Define Skills 
// Put the Skills in a skillTree (Array)
// Add the skillTree to the CharCat
// Add the CharCat to the CharCatsArray !!!
