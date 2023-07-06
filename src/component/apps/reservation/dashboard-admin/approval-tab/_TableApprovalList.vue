<template>
  <datatable
    :fields="fields"
    :items="items"
    :meta="meta"
    :isbusy="busy"
    @per_page="handlePerPage"
    @pagination="handlePagination"
    @search="handleSearch"
    @sort="handleSort">
  </datatable>
</template>

<script>
import Datatable from '@/component/utils/Datatable.vue'

export default {
  name: "_TableApprovalList.vue",
  components: {
    Datatable,
  },
  data: function () {
    return {
      fields: [
        { key: 'number_rsv', label: 'No. Reservasi', sortable: false, thStyle: { width: "20%" }, thClass: 'text-left' },
        { key: 'type_rsv', label: 'Jenis Reservasi', sortable: false, thStyle: { width: "20%" }, thClass: 'text-left' },
        { key: 'creator_id', label: 'Creator', sortable: false, thStyle: { width: "20%" }, thClass: 'text-left' },
        { key: 'startDate_rsv', label: 'Tanggal Reservasi', sortable: false, thStyle: { width: "20%" }, thClass: 'text-left' },
        { key: 'opt', label: 'Opsi', sortable: false, thStyle: { width: "20%" }, thClass: 'text-left' },
      ],
      items: [],
      meta: {},
      current_page: 1,
      per_page: 10,
      search: '',
      sortBy: 'created_at',
      sortByDesc: false,
      busy: false,
    }
  },
  methods: {
    handlePerPage(){},
    handlePagination(){},
    handleSearch(){},
    handleSort(){},
  },
}
</script>

<style scoped>

</style>
