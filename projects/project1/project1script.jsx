//Chatbot class
class ChatBot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Hello ' + this.state.value + '!');
    event.preventDefault();
  }
  
  render() {
    return (
      <div>
        <h1>A React Chatbot (Work in Progress)</h1>
        <p>Built by Nirjhar</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

//Render chatbot into project1.html
ReactDOM.render(<ChatBot />, document.getElementById('project1'));