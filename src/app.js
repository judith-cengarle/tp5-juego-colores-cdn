
Vue.component('Square', {

    props: {
        colourItem : String,
        
    },
    template: `
        <div class="square" :style="{backgroundColor:colourItem}"></div> 
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
    
    data : function() {
        return {
            activeButton : "hard"
        }
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
        <button @click="onReset()">new colors!</button>
        <span id="message"> </span>
        <button id="easy" @click="onEasy" :class="{selected:(activeButton==='easy')}">easy</button>
        <button id="hard" @click="onHard" :class="{selected:(activeButton==='hard')}">hard</button>
        </div>   
    `,
});

Vue.component('Header', {

    props: {
        title : String 
    },
    template: `
        <div id="header">

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
            isHard : true
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
        },
        modeGameEasy : function() {
            this.colourCount = 3;
            this.reset();
        },
        modeGameHard : function() {
            this.colourCount = 6;
            this.reset();
        }
    },

    template: `
        <div>
            <Header :title="pickedColour"/>
            <Navigator @onResetClick="reset()" @onEasyClick="modeGameEasy()" @onHardClick="modeGameHard()"></Navigator>
            <Container> 
                <Square :colourItem="colour"  v-for="colour in colours" /> 
            </Container>
        </div>
    `    
});

new Vue ({
    el: '#app',  
});