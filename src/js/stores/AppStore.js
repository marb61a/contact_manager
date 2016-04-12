var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var appAPI = require('../utils/appAPI.js');

var CHANGE_EVENT = 'change';

var _contacts = [];

var AppStore = assign({}, EventEmitter.prototype, {
    getContacts: function(){
		return _contacts;
	},
	
	saveContact: function(contact){
		_contacts.push(contact);
	},
	
	setContacts: function(contacts){
		_contacts = contacts;
	},
	
	removeContact : function(contactId){
	    var index = contacts.findIndex(x => x.id === contactId);
	    _contacts.splice(index, 1);
	},
	
	setContactToEdit : function(contact){
	    _contact_to_edit = contact;
	},
	
	getContactToEdit : function(){
	    return _contact_to_edit;
	},
	
	updateContact : function(contact){
	    for(i = 0; i < contacts.length; i++){
	        if(_contacts[i].id == contact.id){
	            _contacts.splice(i, 1);
				_contacts.push(contact);
	        }
	    }
	},
	
    emitChange : function(){
        this.emit(CHANGE_EVENT);  
    },
    
    addChangeListener : function(callback){
        this.on('change', callback);
    },
    
    removeChangeListener: function(callback){
		this.removeListener('change', callback);
	}
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.actionType) {
        case AppConstants.SAVE_CONTACT:
            console.log('Saving Contact...');
            // Store save
            AppStore.saveContact(action.contact);
            // Save to API
			appAPI.saveContact(action.contact);
            // Emit Change
            AppStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.RECEIVE_CONTACTS:
            console.log('Receiving Contacts...');
			// Store Save
			AppStore.setContacts(action.contacts);
			//Emit Change
			AppStore.emit(CHANGE_EVENT);
			break;
        
    }
    
    return true;
});

module.exports = AppStore;