
Vue.component('Container', {

    template: `
        <div id="container"> 
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
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
            
        }
    },
    template: `
        <div>
            <Header/>
            <Navigator/>
            <Container/>
        </div>
    `
    
});


new Vue ({
    el: '#app',  
});