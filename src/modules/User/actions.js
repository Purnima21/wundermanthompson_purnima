import { getUserData } from "../../service/userService";
import { getTicketData } from "../../service/ticketService";
import { getOrgData } from "../../service/orgService";

export function getUsers({ commit, rootState }, { key, value, userId }) {
  let data = [];
  if (userId) {
    data = [rootState.User.users.find((user) => user._id == userId)];
  } else {
    data = rootState.User.users.filter(
      (user) =>
        user[key] &&
        String(user[key])
          .toLowerCase()
          .indexOf(value.toLowerCase()) > -1
    );
  }
  commit("setUsers", data.reverse());
}

export function getAllUsers({ commit, rootState }, { reset }) {
  if (rootState.User.users.length == 0 || reset) {
    getUserData().then((users) => commit("setUsers", users.reverse()));
  }
}

function getSelectedUserTicket(tickets, userId, commit) {
  const assignedTickets = [];
  const submitedTicket = [];
  tickets.forEach((ticket) => {
    if (ticket.assignee_id === userId) {
      assignedTickets.push(ticket);
    }
    if (ticket.submitter_id === userId) {
      submitedTicket.push(ticket);
    }
  });
  commit("setAllTickets", tickets);
  commit("setAssignedTickets", assignedTickets);
  commit("setSubmitedTickets", submitedTicket);
}

export function getTicket({ commit, rootState }, { userId }) {
  console.log(rootState.User.tickets);
  if (rootState.User.tickets.length > 0) {
    getSelectedUserTicket(rootState.User.tickets, userId, commit);
  } else {

    getTicketData()
      .then((tickets) => {
        getSelectedUserTicket(tickets, userId, commit);
      });
  }
}

export function getAllOrganization({ commit }) {
  getOrgData()
    .then((orgs) => {
      commit("setAllOrg", orgs);
    });
}

export function getOrganization({ commit, rootState }, { orgId }) {
  const data = rootState.User.organization.find((org) => org._id == orgId);
  commit("setOrg", data);
}

export function setSelectedUser(
  { commit, dispatch, rootState },
  { selectedUserId }
) {
  let selectedUser = rootState.User.users.find(
    (user) => user._id == selectedUserId
  );
  if (!selectedUser) {
    getUserData()
    .then(users => {
      selectedUser = users.find(
        (user) => user._id == selectedUserId
      );
      dispatch(
        "User/getOrganization",
        { orgId: selectedUser.organization_id },
        { root: true }
      );
      dispatch("User/getTicket", { userId: selectedUser._id }, { root: true });
      commit("setSelectedUserData", selectedUser);
    })
  } else{
    dispatch(
      "User/getOrganization",
      { orgId: selectedUser.organization_id },
      { root: true }
    );
    dispatch("User/getTicket", { userId: selectedUser._id }, { root: true });
    commit("setSelectedUserData", selectedUser);
  }
  
}

export function showSelectedUser({ commit, dispatch, rootState }, { userId }) {
  const user = rootState.User.users.find((each) => each.id == userId);
  if (user) {
    commit("showSelectedUserData", user);
  } else {
    dispatch("User/getAllUsers", userId, { root: true });
  }
}

export function removeUser({ commit, rootState }, { userId }) {
  commit(
    "setUsers",
    rootState.User.users.filter((u) => u._id !== userId)
  );
}

export function createUser({ commit, rootState }, { data }) {
  console.log(data);
  const id = rootState.User.users.length ? rootState.User.users.length + 1 : 1;
  const user = {
    _id: id,
    url: data.url || "",
    external_id: data.external_id || "",
    name: data.name || "",
    alias: data.alias || "",
    created_at: data.created_at || "",
    active: data.active || "",
    verified: data.verified || "",
    shared: data.shared || "",
    locale: data.locale || "",
    timezone: data.timezone || "",
    last_login_at: data.last_login_at || "",
    email: data.email || "",
    phone: data.phone || "",
    signature: data.signature || "",
    organization_id: data.organization_id || "",
    tags: data.tags || "",
    suspended: data.suspended || "",
    role: data.role || "",
  };
  commit("setUsers", [user, ...rootState.User.users]);
  return true;
}

export function editUser({ commit, rootState }, { data, userId }) {
  const users = rootState.User.users.map((each) => {
    if (each._id != userId) {
      return each;
    } else {
      return {
        _id: userId,
        url: data.url || "",
        external_id: data.external_id || "",
        name: data.name || "",
        alias: data.alias || "",
        created_at: each.created_at,
        active: data.active || "",
        verified: data.verified || "",
        shared: data.shared || "",
        locale: data.locale || "",
        timezone: data.timezone || "",
        last_login_at: each.last_login_at,
        email: data.email || "",
        phone: data.phone || "",
        signature: data.signature || "",
        organization_id: data.organization_id || "",
        tags: data.tags || "",
        suspended: data.suspended || "",
        role: data.role || "",
      };
    }
  });
  commit("setUsers", users);
  return true;
}
