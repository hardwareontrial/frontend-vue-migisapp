<template>
  <div class="sidebar-wrapper d-flex justify-content-between flex-column flex-grow-1">
    <div class="p-2">
      <b-dropdown
        text="Buat Reservasi"
        aria-controls="sidebar-add-new-event"
        variant="primary"
        block
        right>
        <b-dropdown-item>
          Reservasi Ruangan
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import {
  BButton, BDropdown, BDropdownItem,
} from 'bootstrap-vue';

export default {
  components: {
    BButton, BDropdown, BDropdownItem,
  }
}
</script>

<style>

</style>