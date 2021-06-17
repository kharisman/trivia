<template>
  <a href="#" class="btn btn-danger" @click="google">
    Login with Google
  </a>
  <a href="#" class="btn btn-info" @click="facebook">
    Login with facebook
  </a>
</template>
<script>
import { watch, defineComponent } from 'vue'
import { user, google, facebook } from '@/firebase'
import router from '@/router'
export default defineComponent({
  props: {
    loginReturnUrl: { type: String, default: '/' }
  },
  setup(props) {
    watch(
      () => user.value,
      newUser => {
        if (newUser) {
          router.push(props.loginReturnUrl)
        }
      }
    )
    return {
      google,
      facebook
    }
  }
})
</script>
