
Vue.component('Header', {

    template: `
        <div id="header">

            <h1>The Great 
            <br>
            <span id="colorDisplay">RGB</span>
            <br> 
            Guessing Game</h1>
            
        </div>
    `
}); 

Vue.component('App', {
    
    data: function() {
        return {
            
        }
    },
    template: `
        <div>
            <Header/>
          
        </div>
    `
    
});


new Vue ({

    el: '#app',  
    data: {
        message: ""
    }


});