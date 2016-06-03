var React = require("react");
var ReactDOM = require("react-dom");

var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;

var createBrowserHistory = require("history/lib/createBrowserHistory");

var students = {
  student1: {
    name: "John Doe",
    image: "student.jpg",
    email: "johndoe@asdfdas.com",
    phone_number: "234-234-2344",
    failed_startup: "Dolar sit",
    beer: "Amstel Light"
  },
  student2: {
    name: "Jane Doe",
    image: "student2.jpeg",
    email: "JANEDOE3@aol.com",
    phone_number: "555-234-2344",
    failed_startup: "Cow.app",
    beer: "Budweiser (America)"
  }
};

var Students = React.createClass({
  getInitialState: function(){
    return {
      students: {}
    }
  },
  componentDidMount: function(){
    // this.setState({
    //   students: students
    // });

    var url = 'http://localhost:3002/';
    var resource = 'students';
    var xhr = new XMLHttpRequest();
    var self = this;
    xhr.open("GET", url + resource, true);

    xhr.onload = function(e){
      var results = JSON.parse(xhr.responseText).results
      results = results.map(function(el){
        el.image = url + "/images/" + el.image;
        return el;
      });

      self.setState({
        students: results
      });
    };

    xhr.send();
  },
  renderStudent: function(key){
    return <Student key={key} index={key} details={this.state.students[key]} />
  },
  render: function(){
    return(
      <div className="main-container">
        <h1>Shortstack Students Directory</h1>
        <div className="students-container">
          {Object.keys(this.state.students).map(this.renderStudent)}
        </div>
      </div>
    )
  }
});

var Student = React.createClass({
  render: function(){
    var data = this.props.details;

    return(
      <div className="student-container">
        <img src={data.image} alt="student" />
        <div className="title">{data.name}</div>
        <div className="info">
          <p><span className="label">Email:</span> {data.email}</p>
          <p><span className="label">Phone:</span> {data.phone_number}</p>
          <p><span className="label">Failed Startup:</span> {data.failed_startup}</p>
          <p><span className="label">Favorite Beer:</span> {data.beer}</p>
        </div>
      </div>
    )
  }
});

var NotFound = React.createClass({
  render: function(){
    return(
      <p>404</p>
    )
  }
});

var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Students}/>
    <Route path="/:id" component={Student}/>
    <Route path="*" component={NotFound}/>
  </Router>
);

ReactDOM.render(routes, document.querySelector("#main"));
