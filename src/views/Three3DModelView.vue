<template>
  <div class="Three">
    <Three msg="testing"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Three from '@/components/Three3DModel.vue'

export default {
  name: 'HomeView',
  components: {
    Three
  }
}
</script>
