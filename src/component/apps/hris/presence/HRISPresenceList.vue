<template>

  <div>
    <b-row class="pricing-card">
      <b-col
        offset-sm-2
        sm="10"
        md="12"
        offset-lg="2"
        lg="10"
        class="mx-auto"
      >
        <b-row>
          <b-col md="12">
            <div class="demo-spacing-0 mb-2">
              <b-alert
                :variant="alert.variant"
                :show="alert.show">
                <div class="alert-body ">
                  <span v-html="alert.message" /> 
                </div>
              </b-alert>
            </div>
            <b-card>
              <b-card-text>SYNC DATA ABSEN</b-card-text>
              <b-row class="mb-2">
                <b-col cols="12" md="6">
                  <b-form-group
                    label="Tanggal & Jam Mulai"
                    label-for="v-start-date">
                    <flat-pickr
                      class="form-control"
                      v-model="form.startDate"
                      read-only
                      :config="{ 
                        minDate: lastData.startData,
                        enableTime: true,
                        enableSeconds:true,
                        altFormat: 'd M Y H:i:S',
                        altInput: true,
                        dateFormat: 'Y-m-d H:i:S',
                        locale: Indonesian }"/>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    label="Tanggal & Jam Akhir"
                    label-for="v-end-date">
                    <flat-pickr
                      class="form-control"
                      v-model="form.endDate"
                      :config="{ 
                        minDate: lastData.endData,
                        enableTime: true,
                        enableSeconds:true,
                        altFormat: 'd M Y H:i:S',
                        altInput: true,
                        dateFormat: 'Y-m-d H:i:S',
                        locale: Indonesian }"/>
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-button
                    type="button"
                    @click="handleSync"
                    variant="primary"
                    class="mr-1">
                    <feather-icon
                      icon="RefreshCwIcon"
                      class="mr-50"
                    />
                    <span class="align-middle">Sync</span>
                  </b-button>
                </b-col>
              </b-row>
              <hr class="mb-2">
              <b-card-text>GENERATE .txt FILE</b-card-text>
              <b-row>
                <b-col cols="12" md="6">
                  <b-form-group
                    label="Tanggal & Jam Mulai"
                    label-for="v-start-date">
                    <flat-pickr
                      class="form-control"
                      v-model="formGenereate.startDate"
                      read-only
                      :config="{ 
                        minDate: lastData.startData,
                        enableTime: true,
                        enableSeconds:true,
                        altFormat: 'd M Y H:i:S',
                        altInput: true,
                        dateFormat: 'Y-m-d H:i:S',
                        locale: Indonesian }"/>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group
                    label="Tanggal & Jam Akhir"
                    label-for="v-end-date">
                    <flat-pickr
                      class="form-control"
                      v-model="formGenereate.endDate"
                      :config="{ 
                        minDate: lastData.endData,
                        enableTime: true,
                        enableSeconds:true,
                        altFormat: 'd M Y H:i:S',
                        altInput: true,
                        dateFormat: 'Y-m-d H:i:S',
                        locale: Indonesian }"/>
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-button
                    type="button"
                    variant="primary"
                    @click="handleGetGenerate"
                    class="mr-1">
                    <feather-icon
                      icon="DownloadIcon"
                      class="mr-50"/>
                    <span class="align-middle">Txt File</span>
                  </b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>

</template>

<script>
import { 
  BAlert,
  BRow, BCol,
  BCard, BCardText,
  BFormGroup, BFormInput, BForm,
  BButton,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import { Indonesian } from 'flatpickr/dist/l10n/id'
import http2 from '@/customs/axios/http2'

export default {
  components: {
    BAlert,
    BRow, BCol,
    BCard, BCardText,
    BFormGroup, BFormInput, BForm,
    BButton,
    flatPickr,
  },
  data(){
    return{
      lastData: {
        startData: null,
        endData: null,
      },
      form: {
        startDate: '',
        endDate: ''
      },
      formGenereate: {
        startDate: '',
        endDate: ''
      },
      dataAbsensi: [],
      alert: {
        show: true,
        variant: 'primary',
        message: '<b-icon icon="stopwatch" font-scale="1.5" animation="fade" variant="primary" class="mr-1"> Sedang Memuat...</b-icon>'
      },
      generateData: [],
      Indonesian,
    }
  },
  methods: {
    async fetchData(){
      await called.$emit('showloading', {show: true, text: 'Sedang memproses...'})
      this.alert = { show: false, variant: '', message: '' }
      await http2
      .get('hr/attendace/sync-data')
      .then((data) => {
        this.dataAbsensi = data.data
        if(this.dataAbsensi.length === 0){
          this.alert = {
            show: true,
            variant: 'danger',
            message: '<strong>Data tidak ditemukan!</strong>'
          }
          this.lastData = {
          startData: '2023-01-01 00:00:00',
          endData: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        }else{
          this.alert = {
            show: true,
            variant: 'primary',
            message: `
              <ul>
                <li>Data Terakhir: <strong>${this.$moment(this.dataAbsensi[0].scan_date).format('DD-MMM-YYYY, HH:mm:ss')}</strong></li>
                <li>Sync Terakhir pada: <strong>${this.$moment(this.dataAbsensi[0].created_at).format('DD-MMM-YYYY, HH:mm')}</strong></li>
                <li>Total Data: <strong>${this.dataAbsensi.length}</strong></li>
              </ul>`
          }
          this.lastData = {
            startData: this.dataAbsensi[this.dataAbsensi.length -1].scan_date,
            endData: this.dataAbsensi[0].scan_date,
          }
        }
        called.$emit('hideloading')
      })
      .catch((e) => { 
        called.$emit('hideloading')
        this.alert = {
          show: true,
          variant: 'danger',
          message: '<strong>Error</strong>'
        }
        console.error(e)
      })
    },
    handleSync(){
      let dataAlert = {
        show: this.alert.show,
        variant: this.alert.variant,
        message: this.alert.message,
      };
      called.$emit('showloading', {show: true, text: 'Sedang memproses...'});
      this.alert = { show: false, variant: '', message: '' };
      http2
      .post('hr/attendace/sync', null, { params: this.form })
      .then((data) => { 
        this.fetchData();
        this.alert = {
          show: show,
          variant: 'primary',
          message: '<b-icon icon="stopwatch" font-scale="1.5" animation="fade" variant="primary" class="mr-1"> Sedang Memuat...</b-icon>'
        };
        called.$emit('hideloading');
      })
      .catch((e) => { 
        called.$emit('hideloading');
        this.alert = {
          show: true,
          variant: 'danger',
          message: `${e.response.data.message} (${e.response.status})`
        };
        setInterval(() => {
          this.alert = {
            show: dataAlert.show,
            variant: dataAlert.variant,
            message: dataAlert.message
          }
        }, 3000)
      })
    },
    handleGetGenerate(){
      called.$emit('showloading', {show: true, text: 'Sedang memproses...'});
      let dataAlert = {
        show: this.alert.show,
        variant: this.alert.variant,
        message: this.alert.message,
      };
      this.alert = { show: false, variant: '', message: '' };
      http2.post('hr/attendace/generate-data', null, { params: {startdate: this.formGenereate.startDate, enddate: this.formGenereate.endDate} })
      .then((data) => {
        this.generateData = data.data
        if(this.generateData.length > 0){
          let filename = this.formGenereate.startDate.replace(/-|\s|:/g,"")+'-'+this.formGenereate.endDate.replace(/-|\s|:/g,"")+'.txt';
          this.handleToTxtFile(this.generateData, filename)
          called.$emit('hideloading');
          location.reload
        }else{
          this.alert = {
            show: true,
            variant: 'danger',
            message: '<strong>Data tidak ditemukan!</strong>'
          }
          called.$emit('hideloading');
        }
      })
      .catch((e) => {
        called.$emit('hideloading');
        this.alert = {
          show: true,
          variant: 'danger',
          message: `${e.response.data.message} (${e.response.status})`
        };
        setInterval(() => {
          this.alert = {
            show: dataAlert.show,
            variant: dataAlert.variant,
            message: dataAlert.message
          }
        }, 3000)
      })
    },
    handleToTxtFile(arr, filename){
      var content = "";
      for (let i=0; i<arr.length; i++){
        content += arr[i].pin;
        content += ",";
        content += arr[i].name;
        content += ",";
        content += this.$moment(arr[i].scan_date).format('DD/MM/YYYY HH:mm');
        content += ",";
        content += "\n";
      }
      var uri = "data:application/octet-stream," + encodeURIComponent(content);
      var link = document.createElement('a')
      if(typeof link.download === 'string'){
        document.body.appendChild(link)
        link.download = filename
        link.href = uri
        link.click()
        document.body.removeChild(link)
      }else{
        location.replace(uri)
      }
    }
  },
  mounted(){
    this.fetchData()
  }
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>