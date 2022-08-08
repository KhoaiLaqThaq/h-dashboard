<template>
    <div class="container-fluid d-flex pt-2" :id="colorTheme">
        <div class="col-2">
            <TheSidebar />
        </div>
        <div class="col-10 content">
            <TheTopbar />
            <div class="row pb-4">
                <NuxtPage />
            </div>
            <!-- <TheFooter /> -->
        </div>
    </div>
</template> 

<script>
import TheFooter from '~~/components/TheFooter.vue'
import TheTopbar from '~~/components/TheTopbar.vue'
import TheSidebar from '~~/components/TheSidebar.vue'

export default {
    components: [
        TheTopbar,
        TheSidebar,
        TheFooter
    ],
    data() {
        return {
            colorTheme: 'primary_theme'
        }
    }
}
</script>
<style lang="">
    
</style>