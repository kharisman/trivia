<template>
  <div class="row">
    <div
      class="col-sm-3 mb-4"
      v-for="{ id, name, description } in quizzes"
      :key="id"
    >
      <div class="card">
        <img
          src="https://via.placeholder.com/300/f54278/FFFFFF ?Text=Qualitiva.id"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">{{ name }}</h5>
          <p class="card-text">
            {{ description }}
          </p>

          <router-link :to="`/trivia/${id}`">
            <a class="btn btn-primary">Ikuti</a>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLoadQuiz } from '@/firebase'

export default {
  setup() {
    const quizzes = useLoadQuiz()
    return { quizzes }
  }
}
</script>
