<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <router-link :to="`/`">
        <a class="navbar-brand">QUALTIVA</a>
      </router-link>
      <form class="d-flex ">
        <input
          class="form-control me-2 d-none"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <div v-if="message == false">
          <router-link :to="`/login`">
            <button class="btn btn-outline-success" type="submit">Login</button>
          </router-link>
        </div>
        <div v-else>
          <button @click="logout" class="btn btn-outline-success">
            Logout
          </button>
        </div>
      </form>
    </div>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { logout } from '@/firebase'
export default defineComponent({
  data() {
    return {
      message: false
    }
  },
  props: {
    loginReturnUrl: { type: String, default: '/' }
  },
  setup() {
    return {
      logout
    }
  },
  created: function() {
    if (localStorage.getItem('userName')) {
      this.message = true
    }
  }
})
</script>
