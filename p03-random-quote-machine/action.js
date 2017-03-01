
//set initial values Quote & Author
//

/*===== VARIABLES =====*/

const API_URL = 'http://localhost:1337/api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=parseQuote';


// const API_URL = 'http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en'


/*===== HELPERS =====*/

//generating random color, http://stackoverflow.com/a/1484514
const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/*===== COMPONENTS =====*/

const Title = () => {
  return (
    <div className="container-fluid text-center top">
      <p id="page-title">Enligten Me!</p>
    </div>
  );
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quoteText: 'You can avoid reality, but you cannot avoid the consequences of avoiding reality.',
      quoteAuthor: 'Ayn Rand',
      quoteLink: ''
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  render() {
    return (
      <div className="container-fluid bottom">
        <div className="row quote text-center quote">
          <div className="col-sm-12">
            <i className="fa fa-quote-left"></i>
            <span id="quote">{this.state.quoteText}</span>
            <i className="fa fa-quote-right"></i>
          </div>
        </div>

        <div className="row author text-right author">
          <div className="col-sm-6 col-sm-offset-6">
            <p id="author">- {this.state.quoteAuthor}</p>
          </div>
        </div>

        <div className="row buttons">
          <div className="col-sm-2 col-sm-offset-0 text-left">
            <a href="https://twitter.com/share" target="_blank"><i className="fa fa-twitter-square"></i></a>
          </div>
          <div className="col-sm-4 col-sm-offset-6 text-right">
            <button onClick={this.handleButtonClick}>New Quote</button>
          </div>
        </div>
      </div>
    );
  }

  handleButtonClick(event) {

    //working with test data containing single escaped quote
    var re = /parseQuote\((.*)\)/;
    let response = 'parseQuote({"quoteText":"Be miserable. Or motivate yourself. Whatever has to be done, it\'s always your choice.", "quoteAuthor":"Wayne Dyer", "senderName":"", "senderLink":"", "quoteLink":"http://forismatic.com/en/76ce76f00b/"})';

    response.replace(/"/g, '\\"');
    let quoteData = JSON.parse(re.exec(response)[1]);
    let quoteText = quoteData.quoteText;
    let quoteAuthor = quoteData.quoteAuthor;
    let quoteLink = quoteData.quoteLink;

    console.log("QuoteData:\t", quoteData);
    console.log("QuoteText:\t", quoteText);
    console.log("QuoteAuthor:\t", quoteAuthor);
    console.log("QuoteLink:\t", quoteLink);

    //ERROR: but failing with api returned data containing single escaped quote
    // $.get(API_URL).done((response) => {
    //   var re = /parseQuote\((.*)\)/;
    //   response.replace(/"/g, '\\"');
    //   console.log("=> ", response, typeof response);
    //   let quoteData = JSON.parse(re.exec(response)[1]);
    //   let quoteText = quoteData.quoteText;
    //   let quoteAuthor = quoteData.quoteAuthor;
    //   let quoteLink = quoteData.quoteLink;
    //
    //   console.log("QuoteData:\t", quoteData);
    //   console.log("QuoteText:\t", quoteText);
    //   console.log("QuoteAuthor:\t", quoteAuthor);
    //   console.log("QuoteLink:\t", quoteLink);
    //
    //   this.setState({
    //     quoteText: quoteData.quoteText,
    //     quoteAuthor: quoteData.quoteAuthor,
    //     quoteLink: quoteData.quoteLink
    //   });
    // }.bind(this));
  }

}

const Footer = () => {
  return (
    <div className="container-fluid text-center foot">
      <span id="ref">by havefuncoding</span>
      <p id="attrib">quotes from <a href="http://forismatic.com/en/" target="_blank">forismatic</a></p>
    </div>
  );
}

const App = () => {
  return (
    <div>
      <Title />
      <QuoteBox />
      <Footer />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
