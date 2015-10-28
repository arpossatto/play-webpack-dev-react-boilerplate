const React = require('react');

module.exports = React.createClass({
	
	getInitialState(){
		return {
			mensagem: ''
		};
	},

	changeMessage(){
		this.setState({mensagem: 'Eu alterei a mensagem!'});
	},

	hideAlert(){
		this.setState({mensagem: ''});
	},

	render(){
	
		var alert, content;

		if (this.state.mensagem) {
			alert = (
				<div className='alert alert-danger'>
				  {this.state.mensagem}
				  <button onClick={this.hideAlert} className="close" aria-label="Close">
				    <span aria-hidden="true">&times;</span>
				  </button>
				</div>
		    );
		}

		content = (
			<div className="jumbotron">
			  <h1>Play Framework - ReactJS - Webpack with Hot Reload</h1>
			  <p>Este aplicativo é uma estrutura básica para desenvolvimento utilizando ReactJS para FrontEnd e Play Framework para BackEnd.</p>
			  <button className='btn btn-info btn-lg' onClick={this.changeMessage}>
			  	<span className='glyphicon glyphicon-star' /> Exibir alerta!!!
			  </button>
			  <p></p>				  
			</div>
		);

		return (
			<div className="container">
				{alert}
				{content}
			</div>
		);
	}
});
