<template>
<!--  <div class="app-calendar overflow-hidden border">-->
<!--    <div class="row no-gutters">-->
<!--      <div class="col position-relative">-->
        <full-calendar
          ref="refCalendar"
          :options="calendarOptions"
          class="full-calendar"
          style="height: 100vh;"/>
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->

<!--  <div class="app-calendar overflow-hidden border" style="height: 100vh;">-->
<!--    <div class="row no-gutters">-->

<!--      &lt;!&ndash; <div-->
<!--        class="col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column">-->
<!--        <calendar-sidebar />-->
<!--      </div>-->
<!--       &ndash;&gt;-->
<!--      &lt;!&ndash; Calendar &ndash;&gt;-->
<!--      <div class="col position-relative">-->
<!--        <div class="card shadow-none border-0 mb-0 rounded-0">-->
<!--          <div class="card-body pb-0">-->
<!--            <full-calendar-->
<!--              ref="refCalendar"-->
<!--              :options="calendarOptions"-->
<!--              class="full-calendar">-->
<!--              <template v-slot:eventContent='arg'>-->
<!--                <b>{{ arg.event.extendedProps.description }}</b><br />-->
<!--                <span>{{ arg.event.title }}</span>-->
<!--              </template>-->
<!--            </full-calendar>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--    </div>-->
<!--  </div>-->
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import CalendarSidebar from './CalendarSidebar.vue';
import idLocale from '@fullcalendar/core/locales/id';

export default {
  components: {
    FullCalendar, CalendarSidebar,
  },
  data(){
    let calendarsColor = {1: 'primary', 2: 'success', 3: 'warning'}
    let arrayEvents = [
      {
        id: 1,
        title: 'Event_1',
        start: '2023-06-23 09:00:00',
        end: '2023-06-23 11:00:00',
        extendedProps: {
          room_id: 1,
          room: 'Room 1',
          description: 'Test Room 1'
        },
      },
      {
        id: 2,
        title: 'Event_2',
        start: '2023-06-23 08:00:00',
        end: '2023-06-23 09:00:00',
        extendedProps: {
          room_id: 2,
          room: 'Room 2',
          description: 'Test Room 2'
        },
      },
      {
        id: 3,
        title: 'Event_3',
        start: '2023-06-23 07:00:00',
        end: '2023-06-23 20:00:00',
        extendedProps: {
          room_id: 3,
          room: 'Room 3',
          description: 'Test Room 3',
        },
      }
    ]
    return{
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        initialView: 'timeGridDay',
        headerToolbar: {
          left: 'prev,next',
          // right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
          center: 'title',
          right: 'timeGridDay,listMonth',
        },
        validRange: {
          start: this.$moment().format('YYYY-MM-DD')
        },
        editable: false,
        rerenderDelay: 0,
        locale: idLocale,
        businessHours: {
          startTime: '07:00',
          endTime: '16:01',
        },
        allDaySlot: false,
        events: arrayEvents,
        slotMinTime: '07:00:00',
        slotMaxTime: '20:00:00',
        eventClassNames({ event: calendarEvent }) {
          // eslint-disable-next-line no-underscore-dangle
          const colorName = calendarsColor[calendarEvent._def.extendedProps.room_id]
            return [
              // Background Color
              `bg-light-${colorName}`,
            ]
        },
        eventClick({ event: clickedEvent }) {
          console.log(clickedEvent)
        },
        editable: true,
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@core/scss/vue/apps/calendar.scss";
  .fc-day-today {
    background: #FFF !important;
    border: none !important;
  }
</style>
