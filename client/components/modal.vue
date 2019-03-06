<template lang="html">
    <el-dialog v-if="show"
        :visible="show"
        width="30%"
        center
        @close="modalClose(name)"
        :class="className">
        <span slot="title" class="dialog-title">
            <slot name="title" class="dialog-title">
            </slot>
        </span>
        <slot name="body">
              default body
        </slot>
    </el-dialog>
</template>

<script>
export default {
    props: {
        show:'',
        name:'',
        className:''
    },
    methods: {
        modalClose(name) {
          this.$store.dispatch('modalAction')
        },
    }
}
</script>
