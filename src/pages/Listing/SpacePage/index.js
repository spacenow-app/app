import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import CancellationTab from './CancellationTab'
import PricingTab from './PricingTab'
import SpecificationTab from './SpecificationTab'
import TimeTab from './TimeTab'

const SpacePage = ({ match, ...props }) => {
  return (
    <>
      <div className="links">
        <Link to={`specification`} className="link">
          Spec
        </Link>
        <Link to={`pricing`} className="link">
          Pric
        </Link>
        <Link to={`time`} className="link">
          Time
        </Link>
        <Link to={`cancellation`} className="link">
          Cancela
        </Link>
      </div>
      <Switch>
        <Redirect exact from={match.path} to={`${match.path}/specification`} />
        <Route path={`${match.path}/specification`} component={SpecificationTab} />
        <Route exact path={`${match.path}/pricing`} component={PricingTab} />
        <Route path={`${match.path}/time`} component={TimeTab} />
        <Route path={`${match.path}/cancellation`} component={CancellationTab} />
        <Route component={() => <h1>not found</h1>} />
      </Switch>
    </>
  )
}

export default SpacePage
