<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            {{title}}
            <button
              type="button"
              class="close right"
              @click="$emit('close')" >
                X
            </button>
          </slot>
        </header>
        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot >  
            <div class="card">
              <div class="card-header">
                <b>{{sub}}</b>
              </div>
              <div class="card-body">
                
                  <div class="row" v-if="userName">
                    <div class="col-md-6">
                      <p>Nama : <br/>{{userName}}</p>
                      <p>Email : <br/>{{email}}</p>
                    </div>
                    <div class="col-md-6">
                      Hasil Quiz : 
                      <ul class="list-group" style="width:100% ;margin-top:10px;">
                        <li class="list-group-item " style="width:100% ;" v-if="result.A"> {{result.A}}  
                          <div class="progress">
                            <div class="progress-bar" role="progressbar" :style='"width:"+  data.A/total* 100 +"%;"' :aria-valuenow='data.A/total* 100' aria-valuemin="0" aria-valuemax="100"> <span v-if="data.A/total* 100"> {{data.A/total* 100}}% </span><span v-else> 0% </span> </div>
                          </div>
                        </li>
                        <li class="list-group-item" v-if="result.B">{{result.B}}
                            <div class="progress">
                              <div class="progress-bar" role="progressbar" :style='"width:"+  data.B/total* 100 +"%;"' :aria-valuenow='data.B/total* 100' aria-valuemin="0" aria-valuemax="100"> <span v-if="data.B/total* 100"> {{data.B/total* 100}}% </span><span v-else> 0% </span> </div>
                            </div>
                        </li>
                        <li class="list-group-item" v-if="result.C">{{result.C}}
                            <div class="progress">
                              <div class="progress-bar" role="progressbar" :style='"width:"+  data.C/total* 100 +"%;"' :aria-valuenow='data.C/total* 100' aria-valuemin="0" aria-valuemax="100"> <span v-if="data.C/total* 100"> {{data.C/total* 100}}% </span><span v-else> 0% </span> </div>
                            </div>
                        </li>
                        <li class="list-group-item" v-if="result.D">{{result.D}}
                            <div class="progress">
                              <div class="progress-bar" role="progressbar" :style='"width:"+  data.D/total* 100 +"%;"' :aria-valuenow='data.D/total* 100' aria-valuemin="0" aria-valuemax="100"> <span v-if="data.D/total* 100"> {{data.D/total* 100}}% </span><span v-else> 0% </span> </div>
                            </div>
                        </li>
                        <li class="list-group-item" v-if="result.E">{{result.E}}
                              <div class="progress">
                              <div class="progress-bar" role="progressbar" :style='"width:"+  data.E/total* 100 +"%;"' :aria-valuenow='data.E/total* 100' aria-valuemin="0" aria-valuemax="100"> <span v-if="data.E/total* 100"> {{data.E/total* 100}}% </span><span v-else> 0% </span> </div>
                              </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div v-else>
                    Silahkan <router-link :to="`/login`"><a href="#">login</a></router-link> Terlebih dahulu
                  </div>
              </div>
            </div>
            
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal',
    props: ['title','sub','data','result'],
    data() {
    return {
      sort: [],
      userName :'',
      email :'',
    }
  },
    computed: {
        views (){
          return this.result;
        },
        total () {
            var total = 0;
            if (this.result.A)total++
            if (this.result.B)total++
            if (this.result.C)total++
            if (this.result.D)total++
            if (this.result.E)total++
            return total;
        }
    },
    created: function() {
      this.userName = localStorage.getItem("userName")
      this.email = localStorage.getItem("email")
    }
};
</script>

<style>

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(133, 226, 100, 0.427);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: #eeeeee;
    width: 95%;
    height: auto;
    box-shadow: 2px 2px 20px 1px;
    margin: 20px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }
  
  .modal-header{
    padding: 15px;
    display: flex;
  }
  
  .modal-header {
    border-bottom: 1px solid #eeeeee;
    font-size: 20px;
    color: #4AAE9B;
    justify-content: center;
  }
  .modal-body {
    padding: 20px 10px;
  }
  .close {
    border: none;
    font-size: 30px;
    margin-left: 100px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }
</style>