
const TRY_AGAIN_MESSAGE = "Try again";
const PICKED_RIGHT_MESSAGE = "You picked right";

Vue.component('Square', {

    props: {
        colourItem : String,
        
    },
    methods : {
        onColour : function() {
            this.$emit("onColourClick", this.colourItem);

        }
    },
    template: `
        <div class="square" :style="{backgroundColor:colourItem}" @click="onColour()"></div> 
    `
});

Vue.component('Container', {

    template: `
        <div id="container"> 
            <slot/>
        </div> 
    `
});


Vue.component('Navigator', {
    
    props : {
        messageValue : "",
        startGame : ""
    },
    data : function() {
        return {
            activeButton : "hard",
        };
    },
    methods : {
        onReset : function() {
            this.$emit("onResetClick");
        },
        onEasy : function() {
            this.$emit("onEasyClick");
            this.activeButton = "easy";
        },
        onHard : function() {
            this.$emit("onHardClick");
            this.activeButton = "hard";
        },

    },
    template: `
        <div id="navigator">
        <button @click="onReset()">{{startGame}}</button>
        <span id="message">{{messageValue}}</span>
        <button id="easy" @click="onEasy" :class="{selected:(activeButton==='easy')}">easy</button>
        <button id="hard" @click="onHard" :class="{selected:(activeButton==='hard')}">hard</button>
        </div>   
    `,
});

Vue.component('Header', {

    props: {
        title : String,
        colour : String
    },
    template: `
        <div id="header" :style="{backgroundColor:colour}">

            <h1>The Great 
            <br>
                <span id="colourDisplay">{{title}}</span>
            <br> 
            Guessing Game</h1>
            
        </div>`
}); 

Vue.component('App', {
    
    data: function() {
        return {
            colourCount : 6,
            colours : [],
            pickedColour : null, 
            isHard : true,
            message : "",
            headerColour : "",
            gameButton : "new colors"
        }
    },
    mounted : function() {
        this.reset();
    },
    methods : {
        pickColour : function() {
            var quantity;
            if (this.isHard) {
                quantity = 6;
            } else {
                quantity = 3;
            }
            return Math.floor(Math.random() * quantity );
        },
        createNewColours : function(numbers) { 
            var arr = [];
            for (var i = 0; i < numbers; i++) {
                arr.push(this.createRandomStringColour());
            }
            return arr;
        },
        createRandomStringColour: function() {
            var newColour = "rgb(" + this.randomInt() + ", " + this.randomInt() + ", " +
            this.randomInt() + ")" ;
            return newColour;
        },
        randomInt : function() {
            return Math.floor(Math.random() * 256);
        },
        reset : function() {
            this.colours = this.createNewColours(this.colourCount);
            this.pickedColour = this.colours[this.pickColour()];
            this.headerColour = "steelblue";
            this.message = "";  
        },
        modeGameEasy : function() {
            this.isHard = false;
            this.colourCount = 3;
            this.reset();
        },
        modeGameHard : function() {
            this.isHard = true;
            this.colourCount = 6;
            this.reset();
        },
        setAllColoursTo : function(colour) {
            
            var colourArray = [];

            for (var index = 0; index < this.colours.length; index++ ) {
                colourArray.push(colour);
            }
            this.colours = colourArray; 
        },
        checkColour : function(colour) {
           
            if (colour === this.pickedColour) {
                this.message = PICKED_RIGHT_MESSAGE;
                this.gameButton = "play again";
                this.setAllColoursTo(colour);
                this.headerColour = this.pickedColour;
                return;
            } 
            
            this.setBackgroundColorToSquare(colour);
            this.message = TRY_AGAIN_MESSAGE;
            
        },
        setBackgroundColorToSquare : function(colour) {
            var index = 0;
            var ok = false;

            while (ok === false && index < this.colours.length ) {
                if (colour === this.colours[index]) {
                    Vue.set(this.colours, index, "#232323");
                    ok = true;
                } else {
                    index++;
                }
            }
        }
        
    },

    template: `
        <div>
            <Header :title="pickedColour" :colour="headerColour"/>
            <Navigator :startGame="gameButton" :messageValue="message" @onResetClick="reset()" @onEasyClick="modeGameEasy()" @onHardClick="modeGameHard()">
            </Navigator>
            <Container> 
                <Square @onColourClick="checkColour" :colourItem="colour" v-for="(colour, index) in colours" :key="index" /> 
            </Container>
        </div>
    `    
});

new Vue ({
    el: '#app',  
});