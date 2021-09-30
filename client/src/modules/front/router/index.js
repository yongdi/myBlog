import Vue from 'vue';
import VueRouter from 'vue-router';
import Note from '../components/common/Note';
// import List from '../components/List.vue'
// import Article from '../components/Article.vue'

Vue.use(VueRouter);

const List = resolve => require(['../components/List.vue'], resolve);
const Article = resolve => require(['../components/Article.vue'], resolve);
const NoteC = resolve => require(['../components/common/Note.vue'], resolve);

export function createRouter() {
    const router = new VueRouter({
        mode: 'history',
        scrollBehavior: (to, from, savedPosition) => {
            if (savedPosition) {
                return savedPosition;
            } else {
                return { x: 0, y: 0 };
            }
        },
        routes: [
            { path: '/', component: List },
            { path: '/article/:id', component: Article, meta: { scrollToTop: true } },
            { path: '/page/:page', component: List },
            { path: '/notettt/', component: NoteC },
            { path: '*', redirect: '/' },
        ],
    });
    if (typeof window !== 'undefined') {
        router.afterEach((to, from) => {
            if (document && !(/\/article\//g.test(to.path))) {
                document.querySelector('title').innerText = 'laowei\'s Blog';
            }
        });
    }
    return router;
}
