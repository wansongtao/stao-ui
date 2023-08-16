<script lang="ts" setup>
import { ref, watch } from 'vue';

defineOptions({
  name: 'SMap'
})

const $props = defineProps<{
  location?: {
    lng: number;
    lat: number;
  };
}>();

const $emits = defineEmits<{
  changeAddress: [address: string]
  changeLocation: [location: { lng: number; lat: number }]
}>();

const center = ref([113.324516, 23.106519]);
const geocoder = ref(null);
const init = () => {
  // @ts-ignore
  AMap.plugin('AMap.Geocoder', () => {
    // @ts-ignore
    geocoder.value = new AMap.Geocoder({
      radius: 1000
    });
  });
};

const position = ref<[number, number] | []>([]);
const address = ref('');
const changeLocation = (location: {lng: number, lat: number}) => {
  position.value = [location.lng, location.lat];
  center.value = [location.lng, location.lat];

  $emits('changeLocation', {
    lng: location.lng,
    lat: location.lat
  });

  if (!geocoder.value) {
    return;
  }
  // @ts-ignore
  geocoder.value.getAddress(location, (status, result) => {
    if (status === 'complete' && result.regeocode) {
      address.value = result.regeocode.formattedAddress;
      $emits('changeAddress', address.value);
    }
  });
};
const onMarkerLocation = (e: any) => {
  changeLocation(e.lnglat);
};
const onSelectLocation = (e: any) => {
  if (e.poi.location) {
    changeLocation(e.poi.location);
    return;
  }
};

watch(
  () => $props.location,
  (val) => {
    if (!val) {
      return;
    }

    position.value = [val.lng, val.lat];
    center.value = [val.lng, val.lat];
  }
);
</script>

<template>
  <div class="amap">
    <el-amap :center="center" :zoom="18" @init="init" @click="onMarkerLocation">
      <el-amap-control-geolocation />
      <el-amap-marker :position="position" v-if="position.length" />
      <el-amap-search-box
        placeholder="请输入关键字"
        @select="onSelectLocation"
        @choose="onSelectLocation" />
    </el-amap>
  </div>
</template>

<style lang="scss" scoped>
.amap {
  width: 100%;
  height: 100%;
}
</style>
