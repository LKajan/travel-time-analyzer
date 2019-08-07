<template>
  <div>
    <mapbox
      :access-token="accessToken"
      :map-options="mapOptions"
      @map-load="mapLoaded"
      @map-click="mapClicked"
    />
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl-vue'
import mapboxgl from 'mapbox-gl'

export default {
  name: 'Map',
  components: {
    Mapbox,
  },
  data: () => {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
      mapOptions: {
        style: 'mapbox://styles/mapbox/light-v9',
        center: [24, 60],
        zoom: 7,
        minZoom: 7,
        maxBounds: new mapboxgl.LngLatBounds(
          new mapboxgl.LngLat(24.483506, 60.050045),
          new mapboxgl.LngLat(25.263535, 60.319071)
        )
      }
    }
  },
  methods: {
    mapLoaded (map) {
    },
    mapClicked (map, e) {
      const marker = new mapboxgl.Marker({
        draggable: true
      })
        .setLngLat(e.lngLat)
        .addTo(map)
    }
  }
}
</script>

<style>
  #map {
    width: 100%;
    height: 100vh;
  }
</style>
