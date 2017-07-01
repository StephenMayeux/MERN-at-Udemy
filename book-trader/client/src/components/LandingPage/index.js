import React from 'react'

const LandingPage = (props) => {
  return (
    <div>
      <div className="jumbotron">
        <div className="container">
          <h1>Free Your Mind for Free</h1>
          <p>Show your friends what books you have and make a request to borrow one of theirs. Read a variety of books while sharing</p>
          <h3>Create an Account</h3>
          <div className="row">
            <div className="col-xs-6">
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Email" />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary btn-lg">Sign Up &raquo;</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2>Profile</h2>
            <p>Search for books and add them to your digital library. Your friends will see this and may ask to borrow your books.</p>
          </div>
          <div className="col-md-4">
            <h2>Read</h2>
            <p>Borrow your friends books and read for free. Better than the library!</p>
         </div>
          <div className="col-md-4">
            <h2>Fun</h2>
            <p>Reading books is what smart people do for fun. It is a free activity, and it makes your brain smarter and stuff. </p>
          </div>
        </div>
        <hr />
        <footer>
          <p>&copy; 2017 Book Trader, Inc.</p>
        </footer>
      </div>
    </div>
  )
}

export default LandingPage
