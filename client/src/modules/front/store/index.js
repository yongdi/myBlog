import Vue from 'vue';
import Vuex from 'vuex';
import articleApi from 'api/article.js';
import tagApi from 'api/tag.js';
import marked from 'lib/marked.js';
// import Axios from 'axios';
// var cache = require('memory-cache');

Vue.use(Vuex);

export function createStore() {
    // const mcache = new cache.Cache();
    return new Vuex.Store({
        state: {
            currentPost: {
                content: '',
                id: '',
                useful: 0,
            },
            currentPostCompile: '',
            posts: [],
            allPage: 0,
            curPage: 0,
            tags: [],
            selectTags: [],
            sideBoxOpen: false,
            searchWord: '',
            note_message: '',
        },

        actions: {
            leaveMessage({commit, state}, msg) {
                commit('UPDATE_NOTE', {msg: msg});
		alert('set ' + msg);    
                //return new Promise((resolve, reject) => {
                  //  resolve();
                //});
            },
            search({commit, state}, sTitle) {
                // alert(sTitle);
                // return this.$store.dispatch('searchPublishArticles', title);
                // window.location = '/searchPublishArticles/title=' + title;
                return articleApi.searchPublishArticles(sTitle).then(res => {
                    commit('GET_ALL_POSTS', {posts: res.data.articleArr, allPage: res.data.allPage});
                    return new Promise((resolve, reject) => {
                        resolve(res);
                    });
                });
            },
            zan({commit, state}, id) {
                alert('谢谢支持🙏');
                articleApi.zan(id).then(res => {
                    return new Promise((resolve, reject) => {
                        resolve(res);
                    });
                });
            },
            getAllPosts({commit, state}, {tag = '', page = 1, limit = 5} = {}) {
                return articleApi.getAllPublishArticles(tag, page, limit).then(res => {
                    commit('GET_ALL_POSTS', {posts: res.data.articleArr, allPage: res.data.allPage, curPage: page});
                    return new Promise((resolve, reject) => {
                        resolve(res);
                    });
                });
            },
            getAllTags({commit, state}) {
                return tagApi.getAllTags().then(res => {
                    commit('GET_ALL_TAGS', res.data.tagArr);
                    return new Promise((resolve, reject) => {
                        resolve(res);
                    });
                });
            },
            getPost({commit, state}, id) {
                let article = state.posts.find((post) => post.id === id);
                if (!article && state.currentPost.id === id) {
                    article = state.currentPost;
                }
                if (article && article.content) {
                    commit('GET_POST', article);
                    return new Promise((resolve, reject) => {
                        resolve(article);
                    });
                } else {
                    return articleApi.getArticle(id).then(res => {
                        commit('GET_POST', res.data.article);
                        return new Promise((resolve, reject) => {
                            resolve(res);
                        });
                    }).catch((err) => {
                        // console.log(err)
                    });
                }
            },
        },

        mutations: {
            UPDATE_NOTE: (state, msg) => {
                state.note_message = msg;
            },
            GET_ALL_POSTS: (state, {posts, allPage, curPage}) => {
                if (isNaN(+allPage)) {
                    allPage = 0;
                }
                if (isNaN(+curPage)) {
                    curPage = 0;
                }
                state.posts = posts;
                state.allPage = +allPage;
                state.curPage = +curPage;
            },
            GET_ALL_TAGS: (state, tags) => {
                state.tags = tags;
            },
            SET_SELECT_TAGS: (state, tags) => {
                state.selectTags = tags;
            },
            TOGGLE_SELECT_TAGS: (state, {id, name}) => {
                if (typeof state.selectTags.find(function (e) {
                    return e.id === id;
                }) === 'undefined') {
                    state.selectTags.push({
                        id,
                        name,
                    });
                } else {
                    state.selectTags = state.selectTags.filter((e) => {
                        return e.id !== id;
                    });
                }
            },
            TOGGLE_SIDEBOX: (state) => {
                state.sideBoxOpen = !state.sideBoxOpen;
            },
            CLOSE_SIDEBOX: (state) => {
                state.sideBoxOpen = false;
            },
            GET_POST: (state, article) => {
                state.currentPost = article;
                state.currentPostCompile = marked(state.currentPost.content);
            },
            DO_SEARCH: (state, word) => {
                // alert('DO_SEARCH' + word);
                state.searchWord = word;
            },
            SET_ALL_POSTS: (state, {posts, allPage, curPage}) => {
                if (isNaN(+allPage)) {
                    allPage = 0;
                }
                if (isNaN(+curPage)) {
                    curPage = 0;
                }
                state.posts = posts;
                state.allPage = +allPage;
                state.curPage = +curPage;
            },
        },
        getters: {
            posts: state => state.posts,
            tags: state => state.tags,
            curPage: state => state.curPage,
            allPage: state => state.allPage,
            selectTags: state => state.selectTags,
            searchTags: state => {
                return state.selectTags.map((item) => item.id);
            },
            sideBoxOpen: state => state.sideBoxOpen,
            currentPost: state => state.currentPost,
            currentPostCompile: state => state.currentPostCompile,
            searchWord: state => state.searchWord,
            note_message: state => state.note_message,
        },
    });
}
