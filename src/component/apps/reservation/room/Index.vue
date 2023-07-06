<template>
  <div class="d-flex justify-content-center">
    <div class="left">
      <day-pilot-navigator id="nav" ref="navigator" :config="navigatorConfig" />
    </div>
    <div class="">
      <day-pilot-calendar id="dp" ref="calendar" :config="calendarConfig" />
    </div>

    <reservation-room-form
      :show.sync="showReservationRoom"
      :data.sync="reservationRoomData"
    />

  </div>
</template>

<script>
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from '@daypilot/daypilot-lite-vue';
import ReservationRoomForm from './Form.vue'

export default {
  name: 'ReservationRoomIndex.vue',
  components: {
    DayPilotCalendar, DayPilotNavigator, ReservationRoomForm,
  },
  data(){
    DayPilot.Locale.register(
      new DayPilot.Locale('id-id', {
        dayNames: ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'],
        dayNamesShort: ['Min','Sen','Sel','Rab','Kam','Jum','Sab'],
        monthNames: ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
        monthNamesShort: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','November','Des'],
        timeFormat: 'Clock24Hours',
        timePattern: 'H:mm',
      })
    )
    return{
      eventMoveAllow: 'Disabled',
      eventResizeAllow: 'Disabled',
      // timeRangeAllow: 'Disabled',
      calendarConfig: {
        startDate: new Date(),
        viewType: 'Resources',
        timeRangeSelectedHandling: 'Enabled',
        businessBeginsHour: 7,
        businessEndsHour: 17,
        showNonBusiness: false,
        columns: [],
        events: [],
        eventMoveHandling: this.eventMoveAllow,
        eventResizeHandling: this.eventResizeAllow,
        // timeRangeHandling: this.timeRangeAllow,
        onTimeRangeSelected: (args) => {
          console.log(args)
          var ctrl = args.control;
          ctrl.clearSelection();
          this.showReservationRoom = !this.showReservationRoom
          this.reservationRoomData = {
            resource_id: args.resource,
            startDate: args.start,
            endDate: args.end,
          }
        },
        onEventMove: (args) => {
          console.log('Move', args)
        },
        onEventClick: 'Disabled',
        contextMenu: new DayPilot.Menu({
          items: [
            { text: 'Edit', onclick(args){ console.log('Showing edit...') } },
            { text: 'Detail', onclick(args){ console.log('Showing detail...', args) } },
            { text: 'Hapus', onclick(args){
                console.log('Showing hapus...');
                //
              }
            },
          ],
          onShow: function(args){
            var e = args.source;
            if(e.data.creator_id === 1){
              args.menu.items[0].hidden = false
              args.menu.items[2].hidden = false
            }else{
              args.menu.items[0].hidden = true
              args.menu.items[2].hidden = true
            }
          }
        }),
      },
      navigatorConfig: {
        startDate: new Date(),
        showMonths: 2,
        selectMode: 'Day',
        locale: 'id-id',
        events: [],
        onTimeRangeSelected: (args) => {
          this.calendarConfig.startDate = args.day
        },
      },
      showReservationRoom: false,
      reservationRoomData: {},
    }
  },
  methods: {
    loadResources(){
      const columns = [
        {id: 1, name: 'Ruangan 1'},
        {id: 2, name: 'Ruangan 2'},
        {id: 3, name: 'Ruangan 3'},
      ];
      // this.$refs.calendar.control.update({columns})
      this.calendarConfig.columns = columns;
    },
    loadEvents(){
      const dataEvents = [
        {
          id: 1,
          start: '2023-07-04 10:00:00',
          end: '2023-07-04 11:00:00',
          resource: 2,
          text: 'Event 1',
          barColor: '#6aa84f',
          creator_id: 1,
        },
      ];
      this.calendarConfig.events = dataEvents;
      this.navigatorConfig.events = dataEvents;
    },
  },
  computed: {
  },
  mounted(){
    this.loadResources()
    this.loadEvents()
    // console.log(this.$refs.navigator.control)
  }
}
</script>

<style scoped>
.left {
  margin-right: 10px;
}
.navigator_default_busy.navigator_default_cell {
  border-radius: 15px;
  background-color: #57baf3;
  color: white;
}
.navigator_default_select .navigator_default_cell_box {
  background-color: red;
  opacity: 0.1;
}
.navigator_default_todaybox {
  border: 0.5px solid red;
}
</style>
