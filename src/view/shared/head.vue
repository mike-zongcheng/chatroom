<template>
  <div class="head">
    <div @click="returnLink">返回</div>
  </div>
</template>

<script>
export default {
  name: 'main',
  data () {
    return {

    }
  },
  methods:{
    returnLink(){
      window.history.go(-1);
    }
  }
}
</script>
