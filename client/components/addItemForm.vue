<template>
  <div id="addItemForm">
    <div slot="body">
      <template v-if="$route.name === 'courses'">
        <el-form label-position="right" label-width="100px">
          <el-form-item label="Name">
            <el-input v-model="courseTitle"></el-input>
          </el-form-item>
          <el-form-item label="code">
            <el-input v-model="courseCode"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('courseForm')">Add</el-button>
          </el-form-item>
        </el-form>
      </template>
          <template v-if="$route.name === 'users'">
            <el-form label-position="right" label-width="100px">
              <el-form-item label="Name">
                <el-input v-model="studentName"></el-input>
              </el-form-item>
              <el-form-item label="E-mail">
                <el-input v-model="studentEmail"></el-input>
              </el-form-item>
              <el-form-item label="Status">
                <el-switch
                  v-model="studentStatus"
                  active-text="Active"
                  inactive-text="inactive">
                </el-switch>
              </el-form-item>
              <el-form-item>
                <el-button  type="primary" @click="submitForm('userForm')">Add</el-button>
              </el-form-item>
            </el-form>
          </template>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      studentName: '',
      studentEmail: '',
      studentStatus: false,
      courseTitle: '',
      courseCode: '',
    }
  },
  computed: {
  },
  methods: {
    submitForm(form) {
      if (form === 'userForm') {
        var student = {
          name: this.studentName,
          email: this.studentEmail,
          status: this.studentStatus
        }
         this.$store.dispatch('addStudent', student)
      } else if (form === 'courseForm') {
        var course = {
          title: this.courseTitle,
          code: this.courseCode,
        }
        this.$store.dispatch('addCourse', course)
      }
      this.$store.dispatch('modalAction')
    },
  }
}
</script>
