
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

    template: `
        <div id="header">

            <h1>The Great 
            <br>
            <span id="colorDisplay">RGB</span>
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
            ]
        }
    },
    template: `
        <div>
            <Header/>
            <Navigator/>
            <Container> <Square v-for="square in squares"/> </Container>
            
        </div>
    `
    
});


new Vue ({
    el: '#app',  
});