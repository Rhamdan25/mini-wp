<template>
    <div class="col col-sm-10 mid">
        <form enctype="multipart/form-data" >
            <div class="form-group">
                <label  for="Title">Title</label>
                <input v-model="editTitle" class="form-control" type="text">
            </div>
            <div class="form-group">
                    <input type="file" name="avatar" />
                </div>
            <div class="form-group">
                <label  for="content">Article</label>
                <textarea v-model="editContent" class="form-control" rows="30"></textarea>
            </div>            
        </form>
    </div>  

</template>

<script>
export default {
    props: ['article', 'submitEdit'],
    data() {
        return {
            editTitle: "",
            editContent: ""
        };
    },
    methods:{
        submit(){
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
            })
            .catch(err =>{
                console.log(err)
            })
        }
    },
    watch:{
        submitEdit: function(newVal, oldVal){
            if(newVal == true){
                this.submit()
            }
        },
        article: function(newVal,oldVal){
            this.editTitle = newVal.title,
            this.editContent = newVal.content
        }
    },
    mounted(){
        
    }
};
</script>

<style scoped>
</style>

                    