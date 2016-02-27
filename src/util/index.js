import { bindActionCreators } from 'redux'
import { connect as reduxConnect } from 'react-redux'
import * as actions from '../store/actions'

const stateToProps = (state) => ({...state})
const dispatchToProps = (dispatch) => bindActionCreators({...actions}, dispatch)

export * from './lang'
// export * from './system'

export function createReducer (initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type]
    return reducer ? reducer(state, action.payload, action.params) : state
  }
}

export function connect (target) {
  return reduxConnect(stateToProps, dispatchToProps)(target)
}
