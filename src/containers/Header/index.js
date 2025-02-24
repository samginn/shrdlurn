import React, { PropTypes } from "react"
import { SLACK_OAUTH_URL, TUTORIAL_URL } from "constants/strings"
import { Link } from "react-router"
import { connect } from "react-redux"
import Actions from "actions/world"

import "./styles.css"

const Header = ({ query, signedIn, sessionId, email, dispatch }) => (
  <div className="Header">
    <div className="Header-logo">
      <span>Voxelurn</span>
      <span className="Header-sublogo">a Stanford NLP project</span>
    </div>
    <div className="Header-nav">
      <Link to={{ pathname: "/build", query: query }} activeClassName="active"><div>Build</div></Link>
      <Link to={{ pathname: "/community", query: query }} activeClassName="active" target="_blank"><div>Leaderboard</div></Link>
      <Link to={{ pathname: "/about", query: query }} activeClassName="active"><div>About</div></Link>
      <Link to={{ pathname: "/definitions", query: query }} activeClassName="active"><div>Definitions</div></Link>
      <a href={TUTORIAL_URL} target="_blank"><div>Tutorial</div></a>
      {signedIn &&
        <a onClick={() => dispatch(Actions.clear())}><div>Sign Out</div></a>
      }
      {signedIn ?
        <div>
          {email}
        </div>
        :
        <a className="Header-login" href={SLACK_OAUTH_URL}>
          <div>
            <img alt="Click to sign in with Slack" src="https://api.slack.com/img/sign_in_with_slack.png" />
          </div>
        </a>
      }
    </div>
  </div>
)

Header.propTypes = {
  /* URL parameters in order to persist the query (e.g ?turkid=AMT_123) across
   * route changes */
  query: PropTypes.object
}

const mapStateToProps = (state) => ({
  sessionId: state.user.sessionId,
  email: state.user.email,
  signedIn: state.user.signedIn
})

export default connect(mapStateToProps)(Header)
