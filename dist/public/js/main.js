"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const M = __importStar(require("materialize-css"));
const vue_1 = __importDefault(require("vue"));
// tslint:disable-next-line no-unused-expression
new vue_1.default({
    computed: {
        hazPosts() {
            return this.isLoading === false && this.posts.length > 0;
        },
        noPostss() {
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
            axios_1.default
                .post("/api/posts", post)
                .then(() => {
                this.$refs.title.focus();
                this.content = "";
                this.updatedAt = "";
                this.loadPosts();
            })
                .catch((err) => {
                // tslint:disable-next-line:no-console
                console.log(err);
            });
        },
        confirmDeletePost(id) {
            const post = this.posts.find((g) => g.id === id);
            this.selectedPost = `${post.title} ${post.content}`;
            this.selectedPostId = post.id;
            const dc = this.$refs.deleteConfirm;
            const modal = M.Modal.init(dc);
            modal.open();
        },
        deletePost(id) {
            axios_1.default
                .delete(`/api/posts/${id}`)
                .then(this.loadPosts)
                .catch((err) => {
                // tslint:disable-next-line:no-console
                console.log(err);
            });
        },
        loadPosts() {
            axios_1.default
                .get("/api/posts")
                .then((res) => {
                this.isLoading = false;
                this.posts = res.data;
            })
                .catch((err) => {
                // tslint:disable-next-line:no-console
                console.log(err);
            });
        }
    },
    mounted() {
        return this.loadPosts();
    }
});
//# sourceMappingURL=main.js.map