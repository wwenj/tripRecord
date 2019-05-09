<template>
    <div class="trip">
        <MapLocation></MapLocation>
    </div>
</template>
<script>
import MapLocation from 'components/MapLocation/index'
export default {
  name: 'trip',
  components: {
    MapLocation: MapLocation
  }
}
</script>

<style lang="scss" scoped>
.trip{
    width: 100%;
    height: 100%;
}
</style>
