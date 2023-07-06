<template>
  <form-modal
    :show="show"
    :size="formModalProps.size"
    :title="formModalProps.title"
    :hidefooter="formModalProps.hideFooter">
    <template v-slot:modalbody>
      {{data}}
    </template>
    <template v-slot:modalfooter>
      <b-button
        size="sm"
        class="mr-1"
        variant="outline-primary">
        Tambah
      </b-button>
      <b-button
        @click="closeModal"
        size="sm"
        variant="danger">
        Batal
      </b-button>
    </template>
  </form-modal>
</template>

<script>
import FormModal from '@/component/utils/Modal.vue'
import { BButton } from 'bootstrap-vue'

export default {
  name: 'ReservationRoomForm',
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
    data: {
      type: Object,
      required: true,
    }
  },
  components: {
    FormModal, BButton,
  },
  data(){
    return{
      formModalProps: {
        show: false,
        size: 'md',
        title: 'title',
        hideFooter: false,
      },
    }
  },
  methods: {
    closeModal(){
      this.$emit('update:data', {})
      this.$emit('update:show', !this.show)
    }
  }
}
</script>

<style scoped>

</style>
