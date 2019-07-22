const baseUrl= "http://localhost:3000"

let app = new Vue({
    el: '#app',
    data: {
        currentAccount: null,
        articles:[],
        search: "",
        signin: true,
        signup: false,
        contentField: false,
        isWriting: false,
        isEditting: false,
        editTitle: "",
        editContent: "",
        editId : null
    },
    methods:{
        login(){
            const email = document.getElementById('loginEmail').value
            const password = document.getElementById('loginPassword').value
            axios({
                method: "POST",
                url: `${baseUrl}/users/login`,
                data:{
                    email: email,
                    password: password
                }
            })
            .then(({data})=>{
                localStorage.setItem(`id`, data._id)
                localStorage.setItem(`token`, data.token)
                localStorage.setItem(`username`, data.username)
                this.currentAccount = data
                this.getAllArticles()
                this.signin = false
                this.contentField = true
            })
        },
        submitSignup(){
            const username = document.getElementById('signupName').value
            const email = document.getElementById('signupEmail').value
            const password = document.getElementById('signupPassword').value
            axios({
                method: 'POST',
                url: `${baseUrl}/users/register`,                
                data: {
                    username,
                    email,
                    password
                }
            })
            .then(data => {
                console.log('SUKSES REGISTER')
                this.signup = false
                this.signin = true
            })
            .catch(error => {
                console.log(error)
            })
        },
        logout(){
            this.currentAccount = null
        },
        getAllArticles(){
            axios({
                method: "GET",
                url: `${baseUrl}/articles`
            })
            .then(({data}) =>{
                this.articles = data
            })
            .catch(err=>{
                console.log(err)
            })
        },
        getUserArticle(){
            const currentUserId = localStorage.getItem("id")
            console.log(currentUserId,"<current user id" )
            this.articles = this.articles.filter(article=>{
                console.log(article.author._id, "<id user dari article")
                return article.author._id.includes(currentUserId)
            })
        },
        getArticleDetails(){

        },  
        write(){
            this.isWriting = true,
            this.contentField = false
        },
        postArticle(){
            const title = document.getElementById('postTitle').value
            const content = document.getElementById('postContent').value
            const author = localStorage.getItem('id')
            axios({
                url:`${baseUrl}/articles/create`,
                method: 'POST',
                data: {
                    title: title,
                    content: content,
                    author: author
                }
            })
            .then(({data})=>{
                console.log("posted", data)
                this.getAllArticles()
                this.contentField = true
                this.isWriting = false
            })
            .catch(err=>{
                console.log(err)
            })
        },
        editArticle(article){
            this.isEditting = true
            this.contentField =false
            this.editTitle = article.title
            this.editContent = article.content
            this.editId = article._id           
        },
        submitEditArticle(){
            axios({
                method: "PUT",
                url: `${baseUrl}/articles/${this.editId}`,
                data:{
                    title : this.editTitle,
                    content : this.editContent
                }
            })
            .then(({data})=>{
                console.log("data editted")
                this.editTitle = ""
                this.editContent = ""
                this.isEditting = false,
                this.getAllArticles()
                this.contentField = true  
            })
            .catch(err =>{
                console.log(err)
            })
        },
        deleteArticle(id){
            axios({
                method: "DELETE",
                url: `${baseUrl}/articles/${id}`
            })
            .then(data=>{
                console.log("Deleted an item")
                this.getAllArticles()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        dashboard(){
            this.getAllArticles()
            this.contentField = true
            this.isEditting = false
            this.isWriting = false
        }
    

    },
    computed: {
        filteredList() {
          return this.articles.filter(article => {
            return article.title.toLowerCase().includes(this.search.toLowerCase())
          })
        }
    }
})

// function onSignIn(googleUser) {
//     const idToken= googleUser.getAuthResponse().id_token
//     $.ajax({
//         url: `${baseUrl}/users/glogin`,
//         type: 'POST',
//         data: {
//            idToken
//         }
//     })
//     .done(function(data){
//         localStorage.setItem('token', data.token)
//         localStorage.setItem('name', data.username)
//         isLogin()
//     })
//     .fail(function(err){
//         console.log(err)
//     })
// }
// function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//       console.log('User signed out.');
//     }); 
//     localStorage.removeItem("token")
//     localStorage.removeItem("name")
//     $('#signinForm').show()

// }