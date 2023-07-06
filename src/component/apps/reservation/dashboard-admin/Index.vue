<template>
  <component :is="(loading) ? 'div' : 'b-card'">
    <b-tabs pill>
      <b-tab active>
        <template #title>
          <feather-icon
            icon="CheckCircleIcon"
            size="16"
            class="mr-0 mr-sm-50"/>
          <span class="d-none d-sm-inline">Persetujuan</span>
        </template>
        <reservation-approval-tab class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <feather-icon
            icon="CalendarIcon"
            size="16"
            class="mr-0 mr-sm-50"/>
          <span class="d-none d-sm-inline">Data Reservasi</span>
        </template>
        <reservation-all-data-tab class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <feather-icon
            icon="ListIcon"
            size="16"
            class="mr-0 mr-sm-50"/>
          <span class="d-none d-sm-inline">Lain-Lain</span>
        </template>
        <miscellaneous-tab class="mt-2 pt-75" />
      </b-tab>
    </b-tabs>
  </component>
</template>

<script>
import {BCard, BTab, BTabs,} from 'bootstrap-vue'
import ReservationApprovalTab from '@/component/apps/reservation/dashboard-admin/approval-tab/ApprovalTab.vue'
import ReservationAllDataTab from '@/component/apps/reservation/dashboard-admin/reservation-data-tab/ReservationData.vue'
import MiscellaneousTab from "@/component/apps/reservation/dashboard-admin/misc/Miscellaneous";

export default {
  name: "ReservationDashboardAdmin.vue",
  components: {
    BCard, BTab, BTabs,
    ReservationApprovalTab, ReservationAllDataTab, MiscellaneousTab,
  },
  data: function (){
    return{
      loading: false,
    }
  }
}
</script>

<style scoped>

</style>
