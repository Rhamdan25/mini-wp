<template>
    <div  class="row mid d-flex flex-row-reverse">
        <div v-if="mainContent" class="form-group col col-sm-8">
            <div class="row mid contents">
                <input v-model="search" type="text" class="form-control col-sm-10" placeholder="Search Article ">
                <button class= "btn"><i class="fas fa-search"></i></button>
                <div class="article-list col col-sm-10" >
                    <ul class="list-group list-group-flush" >
                        <li  v-for="article in filteredList" :key="article._id" class="list-group-item">
                            <div class="row">
                                <div class= "col col-sm-9">
                                    <h4 class="article-title">{{article.title}}</h4>
                                    <h6 v-show="currentUser._id == article.author._id">by <span style="color:blue">{{article.author.username}} (You)</span></h6> 
                                    <h6 v-show="currentUser._id !== article.author._id">by <span style="color:green">{{article.author.username}}</span></h6>                                                    
                                </div>
                                <div v-show="currentUser._id == article.author._id" class="actions ml-auto col col-sm-3" >
                                    <button v-on:click="editArticle(article)" class= "btn"><i class="fas fa-pen-square"></i></button>
                                    <button v-on:click="deleteArticle(article._id)" class= "btn"><i class="fas fa-trash-alt"></i></button>                                    
                                </div>
                                <button v-on:click="addToFavourite(article._id)" class= "btn"> add to Favourite</button>  
                                <div class="col col-sm-9 article-content">
                                    <p>{{article.content}}</p>
                                </div>                                                    
                            </div>                                            
                        </li>
                    </ul>
                </div>
            
            </div>
        </div>
                      
        
        <articleForm
            v-show="isWriting"
            :postArticle = "postArticle"
            :currentUser = "currentUser"
        ></articleForm>

        <editForm
            v-show="isEditing"
            :article = "article"
            :submitEdit = "submitEdit"
        ></editForm>
    </div> 
</template>

<script>
import articleForm from './articleForm'
import editForm from './editForm'

export default {
    props: [
        'currentUser', 
        'writeForm', 
        'editForm', 
        'mainContent', 
        'isWriting', 
        'isEditing', 
        'postArticle', 
        'submitEdit', 
        'filterByUser',
        'filterFavourite'
    ],
    components: {
        articleForm,
        editForm
    },
    data() {
        return {
        search: "",
        articles :[],
        article: null,
        };
    },
    methods:{
        getAllArticles(){
            axios({
                method: "GET",
                url: `http://localhost:3000/articles`
            })
            .then(({data}) =>{
                this.articles = data
            })
            .catch(err=>{
                console.log(err)
            })
        },
        editArticle(article){
            this.article = article
            this.$emit('edit')
        },
        deleteArticle(articleId){
            axios({
                method: "DELETE",
                url: `http://localhost:3000/articles/${articleId}`
            })
            .then(data=>{
                console.log("Deleted an item")
                this.getAllArticles()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        addToFavourite(articleId){
            axios({
                method: "PUT",
                url: `http://localhost:3000/articles/fav/${articleId}`,
                data:{
                    userId : this.currentUser._id
                }
            })
            .then(data=>{
                console.log("addedToFavourite")
                this.getAllArticles()
            })
            .catch(err=>{
                console.log(err)
            })   
        },
        getUserArticles(){
            this.articles = this.articles.filter(article=>{
                return article.author._id.includes(this.currentUser._id)
            })
        },
        getFavouriteArticles(){
            const userId = this.currentUser._id
            
            this.articles = this.articles.filter(article=>{
                return article.favouritedBy.some(f=>{
                    return f.userId.includes(userId)
                })
            })
        }

    },
    mounted(){
        this.getAllArticles()
    },
    computed: {
        filteredList() {
            return this.articles.filter(article => {
            return article.title.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    watch:{
        filterByUser: function(newVal, oldVal){
            if(newVal == true){
                this.getUserArticles()
            } else {
                this.getAllArticles()
            }
        },
        filterFavourite: function(newVal, oldVal){
            if(newVal == true){
                this.getFavouriteArticles()
            } else {
                this.getAllArticles()
            }
        },
        mainContent: function(newVal, oldVal){
            if(newVal ==true){
                this.getAllArticles
            }
        }
    }
};
</script>

<style scoped>
</style>

