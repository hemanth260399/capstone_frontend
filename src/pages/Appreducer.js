let staffdetails = localStorage.getItem('useremail');
let availablestaff = Boolean(staffdetails)
export let initialstate = {
    autentication: availablestaff,
    staffdetails: availablestaff ? JSON.parse(staffdetails) : null,
    editcustomer: {}
}
export let appreducer = (state = initialstate, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, authentication: true, staffdetails: action.payload }
        case "LOGOUT":
            return { ...state, authentication: false, staffdetails: null }
        case "EDIT_CUSTOMER":
            return { ...state, editcustomer: action.payload }
        default:
            return state
    }
}