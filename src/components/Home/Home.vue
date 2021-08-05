<template>
  <div class="container text-center mt-5">
    <search-form></search-form>
    <el-button
      type="text"
      @click="addUser()"
      class="add-user"
      aria-label="Add New User"
      role="button"
      >Add New User</el-button
    >

    <el-dialog
      title="Add/Edit User"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <manage-user-form
        :user.sync="editUserData"
        :closeDialog="closeDialog"
      ></manage-user-form>
    </el-dialog>
    <table class="table table-sm table-hover">
      <RecycleScroller
        page-mode
        class="scroller"
        :items="users"
        :item-size="40"
        key-field="_id"
        container-tag="table"
    content-tag="tbody"
      >
        <template #before>
          <div class="thead-vue" slot="before-content">
              <div hidden scope="col">#</div>
              <div scope="col">Name</div>
              <div scope="col">Email</div>
              <div scope="col">Action</div>
          </div>
        </template>
        <template v-slot="{ item }" class="virtual-row">
            <div hidden>{{ item._id }}</div>
            <div>{{ item.name }}</div>
            <div>{{ item.email }}</div>
            <div>
              <button
                type="button"
                class="btn action-button btn-secondary btn-sm"
                @click.stop="viewUser(item._id)"
                role="button"
                :aria-label="getArialLabel('View', item)"
              >
                View
              </button>
              <button
                type="button"
                class="btn action-button btn-primary btn-sm"
                @click="editUserDetails(item)"
              >
                Edit
              </button>
              <button
                type="button"
                class="btn action-button btn-danger btn-sm"
                @click.stop="deleteUser(item._id)"
              >
                Remove
              </button>
            </div>

          <div v-if="users && users.length == 0">
            <div colspan="100">No info...</div>
          </div>
        </template>
      </RecycleScroller>
    </table>
  </div>
</template>

<script>
//import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import { mapState, mapActions } from "vuex";
import SearchForm from "./SearchForm.vue";
import ManageUserForm from "./ManageUserForm.vue";

export default {
  namespaced: true,
  components: {
    SearchForm,
    ManageUserForm,
  },
  data() {
    return {
      selected: "",
      activeName: "assigned",
      dialogVisible: false,
      editUserData: {},
      form: {
        id: "",
        url: "",
        external_id: "",
        name: "",
        alias: "",
        active: false,
        verified: false,
        shared: false,
        locale: "",
        timezone: "",
        email: "",
        phone: "",
        signature: "",
        organization_id: "",
        role: "",
        tags: [],
        suspended: false,
      },
    };
  },
  computed: {
    ...mapState("User", [
      "users",
      "assignedTickets",
      "submitedTickets",
      "selectedUser",
    ]),
  },
  methods: {
    ...mapActions("User", [
      "getUsers",
      "setSelectedUser",
      "getAllUsers",
      "removeUser",
      "createUser",
      "editUser",
    ]),
    getArialLabel(prefix, user) {
      return `${prefix} ${user.name}`;
    },
    deleteUser(userId) {
      this.$confirm(
        "This will permanently delete the User. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.removeUser({ userId: userId });
          this.$message({
            type: "success",
            message: "Delete completed",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    viewUser(userId) {
      this.$router.push({ path: `/user-detail/${userId}` });
    },
    addUser() {
      this.editUserData = {
        _id: "",
        url: "",
        external_id: "",
        name: "",
        alias: "",
        active: false,
        verified: false,
        shared: false,
        locale: "",
        timezone: "",
        email: "",
        phone: "",
        signature: "",
        organization_id: "",
        role: "",
        tags: [],
        suspended: false,
      };
      this.dialogVisible = true;
    },
    handleClose(done) {
      done();
    },
    resetForm() {
      this.form = {
        id: "",
        url: "",
        external_id: "",
        name: "",
        alias: "",
        active: false,
        verified: false,
        shared: false,
        locale: "",
        timezone: "",
        email: "",
        phone: "",
        signature: "",
        organization_id: "",
        role: "admin",
        suspended: false,
      };
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    editUserDetails(user) {
      this.editUserData = { ...user };
      this.dialogVisible = true;
    },
  },
  created() {},
};
</script>

<style>
.vue-recycle-scroller__item-view {
  display: flex;
  justify-content: space-between;
}
.action-button {
  margin-right: 16px;
}

.thead-vue {
  display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 26px;
}

.add-user {
  float: right;
}
.demo {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

input {
  width: 260px;
  padding: 0.5rem;
}

ul {
  width: 100%;
  color: rgba(30, 39, 46, 1);
  list-style: none;
  margin: 0;
  padding: 0.5rem 0 0.5rem 0;
}
li {
  margin: 0 0 0 0;
  border-radius: 5px;
  padding: 0.75rem 0 0.75rem 0.75rem;
  display: flex;
  align-items: center;
}
li:hover {
  cursor: pointer;
}

.autosuggest-container {
  display: flex;
  justify-content: center;
  width: 280px;
}

#autosuggest {
  width: 100%;
  display: block;
}
.autosuggest__results-item--highlighted {
  background-color: rgba(51, 217, 178, 0.2);
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f3f0ed2b;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

#autosuggest__input {
  outline: none;
  position: relative;
  display: block;
  font-family: monospace;
  font-size: 20px;
  border: 1px solid #616161;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

#autosuggest__input.autosuggest__input-open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.autosuggest__results-container {
  position: relative;
  width: 100%;
}

.autosuggest__results {
  font-weight: 300;
  margin: 0;
  position: absolute;
  z-index: 10000001;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background: white;
  padding: 0px;
  overflow: scroll;
  max-height: 200px;
}

.autosuggest__results ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.autosuggest__results .autosuggest__results_item {
  cursor: pointer;
  padding: 15px;
}

#autosuggest ul:nth-child(1) > .autosuggest__results_title {
  border-top: none;
}

.autosuggest__results .autosuggest__results_title {
  color: gray;
  font-size: 11px;
  margin-left: 0;
  padding: 15px 13px 5px;
  border-top: 1px solid lightgray;
}

.autosuggest__results .autosuggest__results_item:active,
.autosuggest__results .autosuggest__results_item:hover,
.autosuggest__results .autosuggest__results_item:focus,
.autosuggest__results
  .autosuggest__results_item.autosuggest__results_item-highlighted {
  background-color: #ddd;
}
</style>
