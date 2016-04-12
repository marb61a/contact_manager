var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var EditForm = React.createClass({
    render : function(){
        return(
            <div className="well">
                <h3>Edit Contacts</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
						<input type="text" ref="name" onChange={this.handleChange.bind(this, 'name')} value={this.props.contactToEdit.name} className="form-control" placeholder="Add Name..." />
					</div>	
					<div className="form-group">
						<input type="text" ref="phone" onChange={this.handleChange.bind(this, 'phone')} value={this.props.contactToEdit.phone} className="form-control" placeholder="Add Phone..." />
					</div>	
					<div className="form-group">
						<input type="text" ref="email" className="form-control" onChange={this.handleChange.bind(this, 'email')} value={this.props.contactToEdit.email} placeholder="Add Email..." />
					</div>	
					<button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
});

module.exports = EditForm;