<template>
<div>
  
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="URL" name="URL" prop="url">
      <el-input v-model="form.url"></el-input>
    </el-form-item>
    <el-form-item label="External_id" prop="external_id" name="external_id">
      <el-input v-model="form.external_id"></el-input>
    </el-form-item>
    <el-form-item label="Name" prop="name" name="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Alias" name="alias">
      <el-input v-model="form.alias"></el-input>
    </el-form-item>
    <el-form-item label="Locale" name="locale">
      <el-input v-model="form.locale"></el-input>
    </el-form-item>
    <el-form-item label="Timezone" name="timezone">
      <el-input v-model="form.timezone"></el-input>
    </el-form-item>
    <el-form-item label="Email" prop="email" name="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="Phone" prop="phone" name="phone">
      <el-input type="number" v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="Signature" name="signature">
      <el-input v-model="form.signature"></el-input>
    </el-form-item>
    <el-form-item label="Active" name="active">
      <el-select v-model="form.active" placeholder="active">
        <el-option label="true" value="true"></el-option>
        <el-option label="false" value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Suspended" name="suspended">
      <el-select v-model="form.suspended" placeholder="suspended">
        <el-option label="true" value="true"></el-option>
        <el-option label="false" value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Verified" name="verified">
      <el-select v-model="form.verified" placeholder="verified">
        <el-option label="true" value="true"></el-option>
        <el-option label="false" value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Shared" name="shared">
      <el-select v-model="form.shared" placeholder="shared">
        <el-option label="true" value="true"></el-option>
        <el-option label="false" value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Role" name="role">
      <el-select v-model="form.role" placeholder="role">
        <el-option label="admin" value="admin"></el-option>
        <el-option label="agent" value="agent"></el-option>
        <el-option label="end-user" value="end-user"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Organization" name="Organization">
      <el-select
        @change="onSelectedOrg($event)"
        v-model="form.organization_id"
        placeholder="--select organization--"
      >
        <el-option
          :value="org._id" :label="org.name"
          v-for="(org, index) in organization"
          :key="index"
          >{{ org.name }}</el-option
        >
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        @click="onSubmit('form')"
        role="button"
        aria-label="Create User"
        >Create</el-button
      >
      <el-button @click="closeFormDialog('form')" aria-label="Cancel" role="button"
        >Cancel</el-button
      >
    </el-form-item>
  </el-form>
</div>
</template>

<script>
//import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import { mapState, mapActions } from "vuex";

export default {
  namespaced: true,
  name: "ManageUserForm",
  props: ["user", "onSave", "closeDialog"],
  watch: {
    user: {
      immediate: true,
      handler() {
        if (this.user && this.user._id) {
          this.form = {
            id: this.user && this.user._id ? this.user._id : "",
            url: this.user.url,
            external_id: this.user.external_id,
            name: this.user.name,
            alias: this.user.alias,
            active: this.user.active,
            verified: this.user.verified,
            shared: this.user.shared,
            locale: this.user.locale,
            timezone: this.user.timezone,
            email: this.user.email,
            phone: this.user.phone,
            signature: this.user.signature,
            organization_id: this.user.organization_id,
            role: this.user.role,
            suspended: this.user.suspended,
            tags: this.user.tags,
          };
        } else {
          this.resetForm();
        }
      },
    },
  },

  data() {
    return {
      selected: "",
      activeName: "assigned",
      dialogVisible: false,
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
        ...this.user,
      },
      rules: {
        url: [
          { required: true, message: 'Please input URL', trigger: 'blur' },
          { min: 3, message: 'Length should be greater than', trigger: 'blur' }
        ],
        external_id: [
          { required: true, message: 'Please input external_id', trigger: 'blur' },
        ],
        email: [
          { required: true, message: 'Please input email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
        ],
        phone: [
          { required: true, message: 'Please input phone number', trigger: 'blur' },
        ],
        name: [
          { required: true, message: 'Please input user name', trigger: 'blur' },
          { min: 4, message: 'Length should be greater than 3', trigger: 'blur' }
        ],
      },
    };
  },
  computed: {
    ...mapState("User", ["organization"]),
  },
  methods: {
    ...mapActions("User", ["createUser", "editUser", "getAllOrganization"]),
    handleClose(done) {
      this.resetForm();
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
    closeFormDialog(form){
        this.$refs[form].resetFields();
        this.closeDialog();
    },
    onSubmit(form) {
      const data = {
        url: this.form.url,
        external_id: this.form.external_id,
        name: this.form.name,
        alias: this.form.alias,
        created_at: this.form.created_at,
        active: this.form.active,
        verified: this.form.verified,
        shared: this.form.shared,
        locale: this.form.locale,
        timezone: this.form.timezone,
        last_login_at: this.form.last_login_at,
        email: this.form.email,
        phone: this.form.phone,
        signature: this.form.signature,
        organization_id: this.form.organization_id,
        tags: this.form.tags,
        suspended: this.form.suspended,
        role: this.form.role,
      };
      if (this.form.id) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.editUser({
            data,
            userId: this.form.id,
          });
          this.closeDialog();
          this.$refs[form].resetFields();
          this.$notify({
            title: 'Success',
            message: 'User Updated',
            type: 'success'
          }); 
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      } 
      else 
      {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.createUser({
              data,
            });
            this.closeDialog();
            this.$refs[form].resetFields();
            this.$notify({
              title: 'Success',
              message: 'User Added',
              type: 'success'
            });
          } else {
            this.$notify.error({
              title: 'Error',
              message: 'There is an error'
            });
            return false;
          }
        });
      }
      // this.resetForm();
    },
    editUserDetails(user) {
      this.form = {
        id: user._id,
        url: user.url,
        external_id: user.external_id,
        name: user.name,
        alias: user.alias,
        active: user.active,
        verified: user.verified,
        shared: user.shared,
        locale: user.locale,
        timezone: user.timezone,
        email: user.email,
        phone: user.phone,
        signature: user.signature,
        organization_id: user.organization_id,
        role: user.role,
        suspended: user.suspended,
        tags: user.tags,
      };
      this.dialogVisible = true;
    },
  },
  created() {
    this.getAllOrganization();
  },
};
</script>
