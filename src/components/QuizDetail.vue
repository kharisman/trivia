<template>
  <div class="card card-body mt-4">
    <h3>{{ data.name }}</h3>
    <hr />
    <div v-if="finsih.length===data.c &&  data.result"> 
  
    <Modal
      v-show="isModalVisible" :data="done"  
      :result="data.result"
      :sub='data.name'
      title="Login dengan akun sosial media kamu melihat hasil test dan bisa share ke sosial media"
      @close="closeModal"
    />
    </div>  
    
    <div class="row" v-if="data.quest "  >
			<div class="col-sm-12" v-for="{ id, description, A, B, C, D, E, sort } in data.quest" :key="id" >
				<h4 class=""> {{description}}   </h4>
				<div class="frb-group">
          <div class="frb frb-default">
						<input type="radio" :id="'A'+sort" :name="sort" value="A" v-model="selected[sort]"  >
						<label :for="'A'+sort" >
							<span class="frb-description">&nbsp; {{A}} </span>
						</label>
					</div>
          <div class="frb frb-default">
						<input type="radio"  :id="'B'+sort" :name="sort" value="B" v-model="selected[sort]" >
						<label :for="'B'+sort">
							<span class="frb-description">&nbsp; {{B}}</span>
						</label>
					</div>
          <div class="frb frb-default">
						<input type="radio" :id="'C'+sort" :name="sort" value="C" v-model="selected[sort]" >
						<label :for="'C'+sort">
							<span class="frb-description"> &nbsp;{{C}}</span>
						</label>
					</div>
          <div class="frb frb-default">
						<input type="radio" :id="'D'+sort" :name="sort" value="D" v-model="selected[sort]" >
						<label :for="'D'+sort">
							<span class="frb-description"> &nbsp;{{D}}</span>
						</label>
					</div>
          <div class="frb frb-default">
						<input type="radio" :id="'E'+sort" :name="sort" value="E" v-model="selected[sort]" >
						<label :for="'E'+sort">
							<span class="frb-description"> &nbsp;{{E}}</span>
						</label>
					</div>
				</div>
			</div>	
		</div>
    <div v-else> Belum ada Pertanyaan </div>
  </div>
</template>
<script>

import Modal from '@/components/Modal.vue';
import { reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getQuiz, getQuestion, getResult} from '@/firebase'

export default {
  components: {
      Modal,
  },
  data() {
    return {
      selected: [],
      isModalVisible: false,
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },     
     
  },
  computed: {
    finsih(){
      if (this.selected.length >= this.data.c){
        this.showModal()
      }
      return this.selected.filter(val=>val) ;
    },
    done(){
      const arr = this.finsih;
      const result = arr.reduce((acc, curr) => (acc[curr] = (acc[curr] || 0) + 1, acc), {});
      return result;
    }
  },
  setup() {
    const route = useRoute()
    const quizId = computed(() => route.params.id)
    const data = reactive({})
    onMounted(async () => {
      const quiz = await getQuiz(quizId.value)
      const question = await getQuestion(quizId.value)
      const result = await getResult(quizId.value)
      data.name = quiz.name
      data.description = quiz.description
      if ( question.length) {data.quest = question }else{  data.quest = null }
      data.c = question.length
      data.result = result[0]
    })
    return { data }
  }
}
</script>
