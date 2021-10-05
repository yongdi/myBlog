<template>
    <div class="note-box">
        <h2>{{m}}</h2>
<!--      <h2>{{note_message.note_message}}</h2>-->

        <br>
        <textarea class="note-input" rows="10" cols="40" v-model="m" v-on:blur="leaveMessage(m)" />
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    name: 'note-box',
    data() {
        return {
            m: '空'
        };
    },
    mounted() {
        // this.m = this.note_message.note_message
    },
    computed: {
        ...mapGetters(['note_message'])
    },
    methods: {
        ...mapActions([
            'leaveMessage',
            'getMessage',
        ]),
    },
    created() {
        // 自动触发一个get来改变mutation
        this.$store.dispatch('getMessage')
    },
    // 必须用一个watcher才能观察到mutation的变化
    watch: {
        note_message: function(n, o) {
            this.m = n.note_message;
        },
    },
};
</script>

<style lang="stylus" scoped>
.note-box
  position relative
  padding-top 180px
  padding-left 50px
  min-height 180px
  margin-bottom 120px
.note-input
  border-style: groove
</style>
