<template>
  <nav class="navbar bg-dark fixed-top" >
            <div class="navigate">
                <a  class="navbar-brand" href="#">mini WordPress</a>  
            </div>
            <div v-if="currentUser" class="user-navigate">
                <button v-show="isEditing" v-on:click="cancelEdit" type="submit" class="btn btn-light"><i class="fas fa-ban">Cancel</i></button>
                <button v-show="isWriting" v-on:click="cancelWrite" type="submit" class="btn btn-light"><i class="fas fa-ban">Cancel</i></button>
                <button v-show="isEditing" v-on:click="submitEdit" type="submit" class="btn btn-danger"><i class="fas fa-newspaper" >Publish Revision</i></button>
                <button v-show="isWriting" v-on:click="publish" type="submit" class="btn btn-danger"><i class="fas fa-newspaper" >Publish</i></button>
                <button v-show="!isWriting" v-on:click="write" id="writeBtn" type="button" class="btn btn-light"><i class="fas fa-pen-alt"> write</i></button>
                <button type="button" class="btn btn-dark"><i class="far fa-user-circle"></i></button>
                <button type="button" class="btn btn-dark">
                <i class="fas fa-bell"></i>
                </button>
            </div>
            <div v-if="!currentUser" class="user-navigate">
                    <button v-on:click="signinBtn" type="submit" class="btn btn-info"><i class="fas fa-sign-in-alt"> Sign In</i></button>
                    <button v-on:click="signupBtn" type="submit" class="btn btn-light"><i class="fas fa-user-plus"> Sign Up</i></button>
            </div>    
        </nav>
</template>

<script>
export default {
    props:['currentUser', 'isEditing', 'isWriting'],
    data() {
        return {

        };
    },
    methods:{
        signinBtn(){
            this.$emit('signinBtn')
        },
        signupBtn(){
            this.$emit('signupBtn')
        },
        write(){
            this.$emit('write')
        },
        publish(){
            this.$emit('publish')
        },
        submitEdit(){
            this.$emit('submitEdit')
        },
        cancelWrite(){
            this.$emit('cancelWrite')
        },
        cancelEdit(){
            this.$emit('cancelEdit')
        }
    }
};
</script>

<style scoped>
</style>