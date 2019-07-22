<template>
  <div class="col col-sm-10 mid">
        <form enctype="multipart/form-data" >
            <div class="form-group">
                <label  for="Title">Title</label>
                <input v-model="title" class="form-control" type="text">
            </div>
            <div class="form-group">
                    <input type="file" name="featured-image" />
                </div>
            <div class="form-group">
                <label for="content">Article</label>
                <textarea v-model="content" class="form-control" rows="30"> </textarea>
            </div>
            
        </form>
    </div>
</template>

<script>

export default {
    props:['postArticle', 'currentUser'],
    data() {
        return {
        title:"",
        content:""
        };
    },
    methods:{
        submit(){
            const title = this.title
            const content = this.content
            const author = this.currentUser._id
            axios({
                url:`http://localhost:3000/articles/create`,
                method: 'POST',
                data: {
                    title: title,
                    content: content,
                    author: author
                }
            })
            .then(({data})=>{
                console.log("posted")
            })
            .catch(err=>{
                console.log(err)
            })
        },
    },
    watch:{
        postArticle: function(newVal, oldVal){
            if(newVal == true){
                this.submit()
            }
        }
    }
};
</script>

<style scoped>
</style>    

                    