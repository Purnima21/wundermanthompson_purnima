import mockUser from "../../service/mockUser.json";
import mockOrg from "../../service/mockOrg.json";
import mockTicket from "../../service/mockTicket.json";

export function getUsers({ commit }, { key, value, userId }) {
  let data = [];
  if (userId) {
    data = [mockUser.find((user) => user._id == userId)];
  } else {
    data = mockUser.filter(
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
  console.log(rootState)
  if (rootState.User.users.length == 0) {
    const data = mockUser;
    commit("setUsers", data.reverse());
  } else if (reset) {
    const data = mockUser;
    commit("setUsers", data.reverse());
  }
}

export function getTicket({ commit }, { userId }) {
  const assignedTickets = [];
  const submitedTicket = [];
  mockTicket.forEach((ticket) => {
    if (ticket.assignee_id === userId) {
      assignedTickets.push(ticket);
    }
    if (ticket.submitter_id === userId) {
      submitedTicket.push(ticket);
    }
  });
  commit("setAssignedTickets", assignedTickets);
  commit("setSubmitedTickets", submitedTicket);
}

export function getAllOrganization({ commit }) {
  commit("setAllOrg", mockOrg);
}

export function getOrganization({ commit }, { orgId }) {
  const data = mockOrg.find((org) => org._id == orgId);
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
    selectedUser = mockUser.find((user) => user._id == selectedUserId);
  }
  dispatch(
    "User/getOrganization",
    { orgId: selectedUser.organization_id },
    { root: true }
  );
  dispatch("User/getTicket", { userId: selectedUser._id }, { root: true });
  commit("setSelectedUserData", selectedUser);
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
  console.log(rootState.User.users[0]);
  const id =
    rootState.User.users && rootState.User.users[0]
      ? +rootState.User.users[0]._id + 1
      : 1;
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

export function getAllOrg({ commit, rootState }) {
  if (rootState.User.users.length == 0) {
    const data = mockUser;
    commit("setUsers", data.reverse());
  }
}
