<template>
  <div class="page">
    <Table :tableData="students" :page='$route.name' />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Table from 'components/Table'

export default {
  components: {
    Table,
  },
  computed: {
    ...mapGetters(['students']),
  },
}
</script>
