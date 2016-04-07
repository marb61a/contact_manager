var React = require("react");
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var AppForm = React.createClass({
    render : function(){
        
    },
    
    handleSubmit : function(e){
        e.preventDefault();
        var contact = {
            name: this.refs.name.value.trim(),
			phone: this.refs.phone.value.trim(),
			email: this.refs.email.value.trim()
        };
        
        AppActions.saveContact(contact);
    }
});

module.exports = AppForm;