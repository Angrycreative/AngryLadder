var LadderTable = React.createClass({
  getInitialState: function() {
    return {
      games: []
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get(this.props.source, function (result) {
      	var games = result.data;
  		this.setState({
    	    games: games
		});

    }.bind(this));

  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  // render: function() {
  // 	var results = this.state.games;
  // 	console.log(results);
  //   return (
  //     <ol>
  //       {results.map(function(result) {
  //         return <li key={result.id}>{result.player1.name} {result.score1} – {result.score2} {result.player2.name}</li>;
  //       })}
  //     </ol>
  //   );
  // }
  render: function() {
  	var results = this.state.games;
  	if( results.length > 0 ) {
	    return (
	    	<table>
		    	<thead>
		    		<tr>
			    		<th>
			    			Rubrik
			    		</th>
			    	</tr>
		    	</thead>
		    	<tbody>
			      	{results.map(function(result) {
			          	return <tr data-id={result.id}>
				          	<td data-id="{result.id}">
				          		{result.players[0].name} - {result.players[1].name} :

								{result.sets.map(function(set) {
									return <span>{set.scores[0]+" - "+set.scores[1]+", "}</span>
								})}
			          		</td>
			          	</tr>;
			        })}
		        </tbody>
		     </table>
	    );
	  	console.log('success');
	} else {
		return <table><tbody><tr data-id="hej"><td>error</td></tr></tbody></table>;
	}
  }
});

ReactDOM.render(
  <LadderTable source="http://api.angryladder.elmered.com/v1/games" />,
  document.getElementById('table-ladder')
);