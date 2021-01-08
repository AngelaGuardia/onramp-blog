import axios from "axios";
import * as M from "materialize-css";
import Vue from "vue";

// tslint:disable-next-line no-unused-expression
new Vue( {
    computed: {
        hazPosts(): boolean {
            return this.isLoading === false && this.posts.length > 0;
        },
        noPosts(): boolean {
            return this.isLoading === false && this.posts.length === 0;
        }
    },
    data() {
        return {
            content: "",
            isLoading: true,
            selectedPost: "",
            selectedPostId: 0,
            title: "",
            updatedAt: "",
        };
    },
    el: "#app",
    methods: {
        addPost() {
            const post = {
                content: this.content,
                title: this.title,
            };
            axios
                .post( "/api/posts", post )
                .then( () => {
                    this.$refs.title.focus();
                    this.content = "";
                    this.updatedAt = "";
                    this.loadPosts();
                } )
                .catch( ( err: any ) => {
                    // tslint:disable-next-line:no-console
                    console.log( err );
                } );
        },
        confirmDeletePost( id: string ) {
            const post = this.posts.find( ( g ) => g.id === id );
            this.selectedPost = `${ post.title } ${ post.content }`;
            this.selectedPostId = post.id;
            const dc = this.$refs.deleteConfirm;
            const modal = M.Modal.init( dc );
            modal.open();
        },
        deletePost( id: string ) {
            axios
                .delete( `/api/posts/${ id }` )
                .then( this.loadPosts )
                .catch( ( err: any ) => {
                    // tslint:disable-next-line:no-console
                    console.log( err );
                } );
        },
        loadPosts() {
            axios
                .get( "/api/posts" )
                .then( ( res: any ) => {
                    this.isLoading = false;
                    this.posts = res.data;
                } )
                .catch( ( err: any ) => {
                    // tslint:disable-next-line:no-console
                    console.log( err );
                } );
        }
    },
    mounted() {
        return this.loadPosts();
    }
} );