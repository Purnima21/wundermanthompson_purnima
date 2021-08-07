
export function setUsers (state, data) {
  state.users = data;
}

export function setSelectedUserData (state, data) {
  state.selectedUser = data
}

export function setAssignedTickets (state, data) {
  state.assignedTickets = data
}

export function setSubmitedTickets (state, data) {
  state.submitedTickets = data
}

export function setOrg (state, data) {
  state.selectedUserOrg = data
}

export function setAllOrg (state, data) {
  state.organization = data
}

export function setAllTickets (state, data) {
  state.tickets = data
}