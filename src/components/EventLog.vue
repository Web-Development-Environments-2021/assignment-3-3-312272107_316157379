<template>
  <div>
    <span>Event Log</span>
    <b-table
      :items="eventLog"
      :fields="fields"
      small
      responsive="sm"
    >
    </b-table>
</template>
<script>
    export default {
        data() {
            return {
                fields: ['event_date_time','minute_in_game','even_type','description']
            }
        },
        props: {
            eventLog: {
                type: Array,
                required: true
            }
        }
}
    
</script>

<style lang="scss" scoped>

</style>