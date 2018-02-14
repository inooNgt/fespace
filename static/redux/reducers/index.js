export default function index(state = {}, action) {
	console.log('reducer called -state ', state , '-action ', action);
  
	switch (action.type) {
	  case 'CHANGE_LOCATION':
		return {
		  ...state,
		  location: action.location
		}
	  default:
		return state
	}
  }