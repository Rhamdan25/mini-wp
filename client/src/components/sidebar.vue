<template>
  <nav id="sidebar">
            <div class="sidebar-header">
            <h3>
                Hello, {{username}}
            </h3>
            </div>
    
            <ul class="list-unstyled components">
                <p>Reader</p>
                <li>
                    <a href="#">Dashboard</a>
                </li>
                <li>
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Articles</a>
                    <ul class="collapse list-unstyled" id="pageSubmenu">
                        <li>
                            <a v-on:click.prevent="getUserArticles" href="#">Your Articles</a>
                        </li>
                        <li>
                            <a v-on:click.prevent="getFavouriteArticles" href="#">Favourites</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a v-on:click.prevent="getAllArticles" href="#">Browse</a>
                </li>
            </ul>
        </nav>
</template>

<script>
export default {
    props: ['currentUser'],
    data() {
        return {
            username: ""
        };
    },
    methods:{
        getUserArticles(){
            this.$emit('getUserArticles')
        },
        getAllArticles(){
            this.$emit('getAllArticles')
        },
        getFavouriteArticles(){
            this.$emit('getFavouriteArticles')
        }
    },
    mounted(){
        this.username = this.currentUser.username
    }
};
</script>

<style scoped>
</style>