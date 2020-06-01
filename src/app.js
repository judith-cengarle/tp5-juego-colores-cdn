
Vue.component('Square', {

    template: `
        <div class="square"></div> 
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

    template: `
        <div id="navigator">
            <button id="reset"> New colors</button>
            <span id="message"> </span>
            <button id="easy">easy</button>
            <button id="hard" class="selected">hard</button>
        </div>   
    `

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
            squares : [
                1,
                2,
                3,
                4,
                5,
                6
            ],
            colourCount : 6,
            colours : [],
            pickedColour : null, //temporal value
            isHard : true
        }
    },
    mounted : function() {
        this.colours = this.createNewColours(this.colourCount);
        this.pickedColour = this.colours[this.pickColour()];

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
        }

        // restart : function() {

        // }

    },

    template: `
        <div>
            <Header :title="pickedColour"/>
            <Navigator/>
            <Container> <Square v-for="square in squares"/> </Container>
            
        </div>
    `
    
});


new Vue ({
    el: '#app',  
});