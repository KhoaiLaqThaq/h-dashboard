<template>
  <component :is="view"></component>
</template>
<script>
import { ref } from 'vue'
import Foo from '~~/components/others/Foo.vue'
import Bar from '~~/components/others/Bar.vue'

export default {
  components: {
    Foo, Bar
  },
  data() {
    return {
      view: 'Foo'
    }
  }
}

</script>
<style lang="scss" scoped>
    
</style>