<template>
  <div id="table">
    <div class="header-buttons">
      <el-button type="primary"
               icon="el-icon-plus"
               circle
               @click="openModal()"
               class="button--add-item">
      </el-button>
      <h1>{{ $route.meta.title }}</h1>
      <el-input placeholder="Search" v-model="searchWord" class="search" clearable @clear="handleClearSearch()">
        <el-button slot="append" icon="el-icon-search" @click="handleFilter()"></el-button>
      </el-input>
    </div>

  <el-table
    :data="pagedTable"
    style="width: 100%"
    @sort-change="to_sort">
    <el-table-column v-for="(block, key) in pagedTable[0]"
      :key="key"
      :label="key"
      :prop="key"
      :sort-orders="['ascending', 'descending']"
      sortable="custom">
      <template slot-scope="scope">
        <template v-if="key === 'status'&& rowEdit !== scope.$index">
          <span v-if="scope.row.status === true" class="success">
            Active
          </span>
          <span v-else class="danger">
            Inactive
          </span>
        </template>
        <template v-else-if="key === 'status'&& rowEdit === scope.$index">
          <el-switch
            v-model="pagedTable[scope.$index][key]"
            active-text="Active"
            inactive-text="inactive">
          </el-switch>
        </template>
        <template v-else-if="rowEdit !== scope.$index">
          {{scope.row[key]}}
        </template>
        <template v-else>
          <el-input placeholder="Please input" v-model="pagedTable[scope.$index][key]"></el-input>
        </template>
      </template>
    </el-table-column>
    <el-table-column
      label="Action"
      width="150px">
      <template slot-scope="scope">
        <el-button v-if="rowEdit !== scope.$index"
          type="primary"
          icon="el-icon-edit"
          circle
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">
        </el-button>
        <el-button v-if="rowEdit === scope.$index"
          type="success"
          icon="el-icon-check"
          circle
          size="mini"
          @click="handleSave(scope.$index, scope.row)">
        </el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          circle
          @click="handleDelete(scope.$index, scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-if="mutableData.length > pageSize || pageSize === 15"
        background
        @size-change="handleSizeChange"
        :current-page.sync="currentPage"
        :page-sizes="[3, 5, 15]"
        :page-size="pageSize"
        layout="prev, pager, next, sizes"
        :total="mutableData.length">
  </el-pagination>

  <modal :show="modalShow"
         name="modalShow"
         className="">
    <div slot="title">
      Add {{ $route.meta.title }}
    </div>
    <div slot="body">
      <addItemForm />
    </div>
  </modal>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import addItemForm from 'components/addItemForm';
  export default {
    props: {
        tableData: '',
        page: ''
    },
    data() {
      return {
         mutableData: this.tableData,
        rowEdit: '',
        currentPage: 1,
        searchWord: '',
      }
    },
    components: {
      addItemForm
    },
    computed:{
      ...mapGetters(['pageSize']),
      ...mapGetters(['modalShow']),
      pagedTable:function() {
        return this.mutableData.filter((row, index) => {
          let start = (this.currentPage-1)*this.pageSize;
          let end = this.currentPage*this.pageSize;
          if(index >= start && index < end) return true;
        });
      }
    },
    methods: {
      to_sort(row) {
        this.sort(row.prop, row.order);
      },
      sort(index, order){
        function sorting(a, b){
          let modifier = 1;
          if(order === 'descending') modifier = -1;
          if(index !== 'status') {
            if(a[index].toLowerCase() < b[index].toLowerCase()) return -1 * modifier;
            if(a[index].toLowerCase() > b[index].toLowerCase()) return 1 * modifier;
          } else if (index === 'status') {
            if(a[index] < b[index]) return -1 * modifier;
            if(a[index] > b[index]) return 1 * modifier;
          }
          return 0;
        }
        this.mutableData.sort(sorting);
      },
      openModal() {
        this.$store.dispatch('modalAction')
      },
      handleSizeChange(val) {
        this.$store.dispatch('getPageSize', val)
      },
      handleEdit(index, row) {
        this.rowEdit = index;
      },
      handleSave(index, row) {
        this.rowEdit = '';
        var payload = { index: index, row: row}
        this.$store.dispatch('editItem', payload)
      },
      handleDelete(index) {
        var payload = { index: index, page: this.page}
        this.$store.dispatch('removeItem', payload)
      },
      handleFilter() {
        this.mutableData =  this.mutableData.filter(c => {
          if (c.name) {
            return c.name.toLowerCase().indexOf(this.searchWord) > -1
          } else {
            return c.title.toLowerCase().indexOf(this.searchWord) > -1
          }
        })
      },
      handleClearSearch() {
        this.mutableData =  this.tableData
        this.searchWord = ''
      }
    }
  }
</script>

<style lang="scss">
.el-table table {
  thead {
    th {
      background-color: #575761;
      color: #fff;
      text-transform: uppercase;
    }
  }
}
.el-pagination {
  text-align: center;
  margin: 20px 0;
}
.el-pagination__sizes {
  float: right;
}
.header-buttons {
  margin: 20px 0;
  overflow: hidden;
  position: relative;
  h1 {
    position: absolute;
    left: 0;
    right: 0;
    z-index: -1;
  }
  .search {
    width: 300px;
    float: right;
  }
  .button--add-item {
    float: left;
  }
}
</style>
