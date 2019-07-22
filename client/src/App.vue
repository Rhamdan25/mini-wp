<template>

    <div>
        <navbar
            :currentUser = 'currentUser'
            :isEditing = 'isEditing'
            :isWriting = 'isWriting'
            @signinBtn = 'signinBtn'
            @signupBtn = 'signupBtn'
            @write = 'write'
            @publish = 'publish'
            @submitEdit = 'submitingEdit'
            @cancelWrite = 'cancelWrite'
            @cancelEdit = 'cancelEdit'
        ></navbar>

        <sidebar
            v-if="currentUser"
            :currentUser= 'currentUser'
            @getUserArticles = 'getUserArticles'
            @getAllArticles = 'getAllArticles'
            @getFavouriteArticles = 'getFavouriteArticles'
        ></sidebar>
        
        <signin
            v-if ="signinForm"
            @login = 'login'
            @signupBtn = 'signupBtn'
        ></signin>

        <signup
            v-if="signupForm"
            @submitSignup = 'signup'
            @signinBtn = 'signinBtn'
        ></signup>

        <contents
            v-if="contentField"
            @edit = "edit"
            :mainContent="mainContent"
            :isWriting="isWriting"
            :isEditing="isEditing"
            :currentUser="currentUser"
            :postArticle = "postArticle"
            :submitEdit = "submitEdit"
            :filterByUser = "filterByUser"
            :filterFavourite = "filterFavourite"
        ></contents>

    </div>

</template>

<script>

import navbar from './components/navbar'
import sidebar from './components/sidebar'

import signin from './components/signinForm'
import signup from './components/signupForm'

import contents from './components/content'


export default {
  data() {
    return {
      currentUser: null ,

      isEditing : false,
      isWriting : false,

      signinForm : true,
      signupForm : false,

      contentField : false,
      mainContent : true,
      postArticle: false,
      submitEdit: false,

      filterByUser: false,
      filterFavourite : false
    };
  },
  components:{
      navbar,
      sidebar,
      signin,
      signup,
      contents
  },
  methods:{
    //   navbar
        signinBtn(){
            this.signinForm = true, this.signupForm = false, this.contentField = false
        },
        signupBtn(){
            this.signupForm = true, this.signinForm = false, this.contentField = false
        },
        write(){
            this.isWriting = true
            this.mainContent = false
            this.isEditing = false  
        },
        edit(){
            this.isEditing = true
            this.mainContent = false
        },
        publish(){
            this.postArticle = true
            this.isWriting = false 
            this.mainContent= true
        },
        submitingEdit(){
            this.submitEdit = true
            this.isEditing = false
            this.mainContent = true
        },
        cancelWrite(){
            this.isWriting = false 
            this.mainContent= true
        },
        cancelEdit(){
            this.isEditing = false
            this.mainContent = true
        },
    //sidebar
        getUserArticles(){
            this.filterByUser = true
        },
        getAllArticles(){
            this.filterByUser = false
        },
        getFavouriteArticles(){
            this.filterFavourite = true
        },
    //forms
        login(email, password){
            axios({
                method: "POST",
                url: `http://localhost:3000/users/login`,
                data:{
                    email: email,
                    password: password
                }
            })
            .then(({data})=>{
                localStorage.setItem(`token`, data.token)
                this.currentUser = {
                    _id : data._id,
                    username  :data.username
                }
                this.signinForm = false
                this.contentField = true
            })
        },
        signup(username, email, password){
            axios({
                method: 'POST',
                url: `http://localhost:3000/users/register`,                
                data: {
                    username,
                    email,
                    password
                }
            })
            .then(data => {
                console.log('SUKSES REGISTER')
                this.signupForm = false
                this.signinForm = true
            })
            .catch(error => {
                console.log(error)
            })
        }
  },
};
</script>

<style scoped>
</style>