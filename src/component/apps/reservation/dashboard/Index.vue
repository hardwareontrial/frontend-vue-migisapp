<template>
  <b-row>
    <b-col
      lg="3"
      sm="6">
      <statistic-card-horizontal
        :to="{ name: 'apps-reservation-room' }"
        icon="HomeIcon"
        statistic="Ruangan"
        statistic-title="Modul Pesan Ruangan">
      </statistic-card-horizontal>
    </b-col>
    <b-col
      lg="3"
      sm="6">
      <statistic-card-horizontal
        :to="{ name: 'apps-reservation-dashboard-admin' }"
        icon="SettingsIcon"
        statistic="Administrasi"
        color="danger"
        statistic-title="Modul Admin"/>
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue';
import StatisticCardHorizontal from '@/component/utils/StatisticCardHorizontal.vue';

export default {
  name: "ReservationDashboard.vue",
  components: {
    BRow, BCol,
    StatisticCardHorizontal,
  }
}
</script>

<style scoped>

</style>
